// Estado da aplicação
let isMenuOpen = false
let isSidebarOpen = true
let currentChatId = null
let chatHistory = []
let currentMessages = []
let currentTheme = localStorage.getItem("theme") || "light"

// Respostas específicas do Colégio Amorim
const responses = {
  "qual cidade fica o colégio amorim":
    "🏙️ <strong>São Paulo</strong><br><br>O Colégio Amorim está localizado na cidade de São Paulo, especificamente na unidade de Ermelino Matarazzo.",

  "qual bairro é a unidade que estamos falando":
    "📍 <strong>Ermelino Matarazzo</strong><br><br>A unidade do Colégio Amorim fica no bairro de Ermelino Matarazzo, que está localizado na zona leste de São Paulo.",

  "o colégio oferece ensino infantil":
    "👶 <strong>Sim, oferecemos Ensino Infantil!</strong><br><br>As crianças pequenas têm educação adequada à idade, com metodologia especializada para o desenvolvimento infantil.",

  "tem ensino fundamental":
    "📚 <strong>Sim, temos Ensino Fundamental completo!</strong><br><br>Atendemos do 1º ao 9º ano do ensino fundamental, oferecendo uma base sólida para o desenvolvimento acadêmico dos alunos.",

  "e ensino médio":
    "🎓 <strong>Sim, oferecemos Ensino Médio!</strong><br><br>Os alunos podem concluir o ensino médio na mesma escola, garantindo continuidade no processo educacional.",

  "o colégio tem quadra poliesportiva":
    "🏃‍♂️ <strong>Sim, temos quadra poliesportiva!</strong><br><br>Nossa quadra permite a prática de diversos esportes como futsal, basquete e vôlei, promovendo a atividade física e o esporte.",

  "oferece atividades extracurriculares":
    "🎨 <strong>Sim, oferecemos diversas atividades extracurriculares!</strong><br><br>Incluímos esportes, artes, teatro e música para complementar o aprendizado e desenvolver talentos dos alunos.",

  "tem biblioteca":
    "📖 <strong>Sim, temos biblioteca!</strong><br><br>Oferecemos um espaço dedicado para leitura e estudo dos alunos, com acervo diversificado para apoiar o aprendizado.",

  "aceita transporte escolar":
    "🚌 <strong>Sim, aceitamos transporte escolar!</strong><br><br>Facilitamos o acesso dos estudantes que moram longe, trabalhando com empresas de transporte escolar credenciadas.",

  "a escola tem laboratório de ciências":
    "🧪 <strong>Sim, temos laboratório de ciências!</strong><br><br>Os alunos podem fazer experiências práticas de química, física e biologia, enriquecendo o aprendizado teórico com a prática.",
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  setupMenuItems()
  loadChatHistory()
  startNewChat()

  // Aplicar tema salvo ou detectar preferência do sistema
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    applyTheme(savedTheme)
  } else {
    applyTheme(detectSystemTheme())
  }

  // Verificar se é mobile
  if (window.innerWidth <= 768) {
    isSidebarOpen = false
    document.getElementById("sidebar").classList.add("hidden")
    document.querySelector(".main-content").classList.add("sidebar-hidden")
  }

  // Listener para mudanças na preferência do sistema
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light")
      }
    })
  }
}

function setupEventListeners() {
  const userInput = document.getElementById("userInput")

  // Enter para enviar mensagem
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // Auto-resize do input
  userInput.addEventListener("input", function () {
    this.style.height = "auto"
    this.style.height = this.scrollHeight + "px"
  })
}

function setupMenuItems() {
  const menuItems = document.querySelectorAll(".menu-item")
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const question = this.getAttribute("data-question")
      sendSuggestion(question)
      toggleMenu()
    })
  })
}

// Funções do Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".main-content")

  isSidebarOpen = !isSidebarOpen

  if (isSidebarOpen) {
    sidebar.classList.remove("hidden")
    if (window.innerWidth > 768) {
      mainContent.classList.remove("sidebar-hidden")
    }
  } else {
    sidebar.classList.add("hidden")
    mainContent.classList.add("sidebar-hidden")
  }
}

function startNewChat() {
  currentChatId = generateChatId()
  currentMessages = []

  // Limpar mensagens do chat
  const chatMessages = document.getElementById("chatMessages")
  chatMessages.innerHTML = `
    <div class="welcome-message">
      <div class="bot-avatar">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div class="message-content">
        <h3>Bem-vindo ao ChatDonety! 🎓</h3>
        <p>Sou seu assistente virtual especializado no Colégio Amorim de Ermelino Matarazzo! Posso te ajudar com informações sobre nossa escola. Use o menu ou digite sua pergunta!</p>
      </div>
    </div>
  `

  // Remover seleção ativa do histórico
  document.querySelectorAll(".history-item").forEach((item) => {
    item.classList.remove("active")
  })
}

function generateChatId() {
  return "chat_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
}

function saveChatToHistory(title, messages) {
  const chat = {
    id: currentChatId,
    title: title,
    messages: [...messages],
    timestamp: Date.now(),
  }

  // Adicionar ao histórico
  chatHistory.unshift(chat)

  // Limitar histórico a 50 conversas
  if (chatHistory.length > 50) {
    chatHistory = chatHistory.slice(0, 50)
  }

  // Salvar no localStorage
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory))

  // Atualizar UI do histórico
  updateHistoryUI()
}

function loadChatHistory() {
  const saved = localStorage.getItem("chatHistory")
  if (saved) {
    chatHistory = JSON.parse(saved)
    updateHistoryUI()
  }
}

function updateHistoryUI() {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  const todayChats = document.getElementById("todayChats")
  const yesterdayChats = document.getElementById("yesterdayChats")
  const weekChats = document.getElementById("weekChats")

  // Limpar containers
  todayChats.innerHTML = ""
  yesterdayChats.innerHTML = ""
  weekChats.innerHTML = ""

  chatHistory.forEach((chat) => {
    const chatDate = new Date(chat.timestamp)
    const historyItem = createHistoryItem(chat)

    if (chatDate >= today) {
      todayChats.appendChild(historyItem)
    } else if (chatDate >= yesterday) {
      yesterdayChats.appendChild(historyItem)
    } else if (chatDate >= weekAgo) {
      weekChats.appendChild(historyItem)
    }
  })
}

function createHistoryItem(chat) {
  const item = document.createElement("div")
  item.className = "history-item"
  item.setAttribute("data-chat-id", chat.id)

  item.innerHTML = `
    <i class="fas fa-message"></i>
    <span class="history-item-text">${chat.title}</span>
    <button class="history-item-delete" onclick="deleteChatFromHistory('${chat.id}', event)">
      <i class="fas fa-trash"></i>
    </button>
  `

  item.addEventListener("click", () => loadChat(chat.id))

  return item
}

function loadChat(chatId) {
  const chat = chatHistory.find((c) => c.id === chatId)
  if (!chat) return

  currentChatId = chatId
  currentMessages = [...chat.messages]

  // Limpar e recarregar mensagens
  const chatMessages = document.getElementById("chatMessages")
  chatMessages.innerHTML = `
    <div class="welcome-message">
      <div class="bot-avatar">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div class="message-content">
        <h3>Bem-vindo ao ChatDonety! 🎓</h3>
        <p>Sou seu assistente virtual especializado no Colégio Amorim de Ermelino Matarazzo! Posso te ajudar com informações sobre nossa escola. Use o menu ou digite sua pergunta!</p>
      </div>
    </div>
  `

  // Recarregar mensagens
  currentMessages.forEach((msg) => {
    addMessageToUI(msg.text, msg.sender)
  })

  // Atualizar seleção no histórico
  document.querySelectorAll(".history-item").forEach((item) => {
    item.classList.remove("active")
  })
  document.querySelector(`[data-chat-id="${chatId}"]`)?.classList.add("active")
}

function deleteChatFromHistory(chatId, event) {
  event.stopPropagation()

  chatHistory = chatHistory.filter((chat) => chat.id !== chatId)
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory))
  updateHistoryUI()

  // Se o chat deletado era o atual, iniciar novo chat
  if (currentChatId === chatId) {
    startNewChat()
  }
}

function toggleMenu() {
  const menuPopup = document.getElementById("menuPopup")
  isMenuOpen = !isMenuOpen

  if (isMenuOpen) {
    menuPopup.style.display = "flex"
    setTimeout(() => {
      menuPopup.classList.add("active")
    }, 10)
    document.body.style.overflow = "hidden"
  } else {
    menuPopup.classList.remove("active")
    setTimeout(() => {
      menuPopup.style.display = "none"
      document.body.style.overflow = "auto"
    }, 300)
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  currentTheme = theme
  localStorage.setItem("theme", theme)

  // Atualizar ícone do botão
  updateThemeIcon()
}

function updateThemeIcon() {
  const themeButton = document.querySelector(".theme-toggle")
  const sunIcon = themeButton.querySelector(".sun-icon")
  const moonIcon = themeButton.querySelector(".moon-icon")

  if (currentTheme === "dark") {
    sunIcon.style.display = "none"
    moonIcon.style.display = "inline-block"
  } else {
    sunIcon.style.display = "inline-block"
    moonIcon.style.display = "none"
  }
}

function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light"
  applyTheme(newTheme)

  // Animação suave do ícone
  const themeButton = document.querySelector(".theme-toggle")
  themeButton.style.transform = "scale(0.8)"

  setTimeout(() => {
    themeButton.style.transform = "scale(1)"
  }, 150)

  // Feedback visual
  console.log(`Tema alterado para: ${newTheme === "light" ? "Claro" : "Escuro"}`)
}

function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }
  return "light"
}

function sendMessage() {
  const input = document.getElementById("userInput")
  const message = input.value.trim()

  if (message === "") return

  // Adicionar mensagem do usuário
  addMessage(message, "user")

  // Limpar input
  input.value = ""
  input.style.height = "auto"

  // Mostrar indicador de digitação
  showTypingIndicator()

  // Simular delay de resposta
  setTimeout(
    () => {
      hideTypingIndicator()
      const response = getResponse(message.toLowerCase())
      addMessage(response, "bot")

      // Salvar no histórico se for a primeira mensagem
      if (currentMessages.length === 2) {
        // user + bot
        const title = message.length > 30 ? message.substring(0, 30) + "..." : message
        saveChatToHistory(title, currentMessages)
      }
    },
    1000 + Math.random() * 1000,
  )
}

function sendSuggestion(question) {
  const input = document.getElementById("userInput")
  input.value = question
  sendMessage()
}

function addMessage(text, sender) {
  // Adicionar à lista de mensagens atuais
  currentMessages.push({ text, sender, timestamp: Date.now() })

  // Adicionar à UI
  addMessageToUI(text, sender)
}

function addMessageToUI(text, sender) {
  const chatMessages = document.getElementById("chatMessages")

  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}`

  const avatar = document.createElement("div")
  avatar.className = sender === "user" ? "user-avatar" : "bot-avatar"
  avatar.innerHTML = sender === "user" ? '<i class="fas fa-user"></i>' : '<i class="fas fa-graduation-cap"></i>'

  const bubble = document.createElement("div")
  bubble.className = "message-bubble"
  bubble.innerHTML = text.replace(/\n/g, "<br>")

  messageDiv.appendChild(avatar)
  messageDiv.appendChild(bubble)

  chatMessages.appendChild(messageDiv)

  // Scroll para a última mensagem
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function showTypingIndicator() {
  const indicator = document.getElementById("typingIndicator")
  const chatMessages = document.getElementById("chatMessages")

  chatMessages.appendChild(indicator)
  indicator.classList.add("active")
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function hideTypingIndicator() {
  const indicator = document.getElementById("typingIndicator")
  indicator.classList.remove("active")
}

function getResponse(question) {
  // Normalizar a pergunta removendo acentos e caracteres especiais
  const normalizedQuestion = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim()

  // Buscar resposta exata
  for (const [key, response] of Object.entries(responses)) {
    const normalizedKey = key
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")

    if (normalizedQuestion.includes(normalizedKey) || normalizedKey.includes(normalizedQuestion)) {
      return response
    }
  }

  // Buscar por palavras-chave específicas
  if (
    normalizedQuestion.includes("cidade") ||
    normalizedQuestion.includes("sao paulo") ||
    normalizedQuestion.includes("sp")
  ) {
    return responses["qual cidade fica o colégio amorim"]
  }

  if (
    normalizedQuestion.includes("bairro") ||
    normalizedQuestion.includes("ermelino") ||
    normalizedQuestion.includes("matarazzo")
  ) {
    return responses["qual bairro é a unidade que estamos falando"]
  }

  if (
    normalizedQuestion.includes("infantil") ||
    normalizedQuestion.includes("crianca") ||
    normalizedQuestion.includes("pequena")
  ) {
    return responses["o colégio oferece ensino infantil"]
  }

  if (normalizedQuestion.includes("fundamental")) {
    return responses["tem ensino fundamental"]
  }

  if (normalizedQuestion.includes("medio") || normalizedQuestion.includes("ensino medio")) {
    return responses["e ensino médio"]
  }

  if (
    normalizedQuestion.includes("quadra") ||
    normalizedQuestion.includes("esporte") ||
    normalizedQuestion.includes("poliesportiva")
  ) {
    return responses["o colégio tem quadra poliesportiva"]
  }

  if (normalizedQuestion.includes("extracurricular") || normalizedQuestion.includes("atividade")) {
    return responses["oferece atividades extracurriculares"]
  }

  if (normalizedQuestion.includes("biblioteca") || normalizedQuestion.includes("livro")) {
    return responses["tem biblioteca"]
  }

  if (
    normalizedQuestion.includes("transporte") ||
    normalizedQuestion.includes("onibus") ||
    normalizedQuestion.includes("van")
  ) {
    return responses["aceita transporte escolar"]
  }

  if (
    normalizedQuestion.includes("laboratorio") ||
    normalizedQuestion.includes("ciencia") ||
    normalizedQuestion.includes("experiencia")
  ) {
    return responses["a escola tem laboratório de ciências"]
  }

  // Resposta padrão
  const defaultResponses = [
    "🤔 Não encontrei essa informação específica sobre o Colégio Amorim.<br><br>💡 <strong>Posso ajudar com:</strong><br>• Localização da escola<br>• Níveis de ensino oferecidos<br>• Estrutura e atividades<br>• Serviços disponíveis<br><br>📋 <strong>Use o menu</strong> para ver as perguntas que posso responder!",
    "💭 Interessante! Não tenho essa informação no momento.<br><br>🎯 <strong>Pergunte sobre:</strong><br>• Onde fica o colégio<br>• Que séries atendemos<br>• Nossa estrutura<br>• Atividades oferecidas<br><br>📞 <strong>Para mais informações:</strong> Entre em contato diretamente com a escola!",
    "🎯 Ainda não tenho essa informação sobre o Colégio Amorim.<br><br>📚 <strong>Posso responder sobre:</strong><br>• Localização e bairro<br>• Ensino infantil, fundamental e médio<br>• Quadra, biblioteca e laboratório<br>• Transporte e atividades<br><br>💬 <strong>Reformule sua pergunta</strong> ou use o menu de sugestões!",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
  const menuPopup = document.getElementById("menuPopup")
  const menuButton = document.querySelector(".menu-button")

  if (isMenuOpen && !menuPopup.contains(e.target) && !menuButton.contains(e.target)) {
    toggleMenu()
  }
})

// Responsividade para sidebar
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    if (isSidebarOpen) {
      document.getElementById("sidebar").classList.add("show")
    }
  } else {
    document.getElementById("sidebar").classList.remove("show")
    if (isSidebarOpen) {
      document.getElementById("sidebar").classList.remove("hidden")
      document.querySelector(".main-content").classList.remove("sidebar-hidden")
    }
  }
})

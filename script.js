// Estado da aplicação
let isMenuOpen = false
const isLightTheme = true

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  setupMenuItems()
  addWelcomeMessage()
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

function toggleTheme() {
  // Funcionalidade para alternar tema (implementação futura)
  console.log("Toggle theme clicked - Tema claro ativo")
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

function addWelcomeMessage() {
  // A mensagem de boas-vindas já está no HTML
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
  const responses = {
    // INFORMAÇÕES ESPECÍFICAS DO COLÉGIO AMORIM
    "horários funcionamento":
      "🕐 <strong>Horários de Funcionamento - Colégio Amorim:</strong><br><br>📚 <strong>Ensino Regular:</strong><br>• Manhã: 7h00 às 12h00<br>• Tarde: 13h00 às 18h00<br><br>🌟 <strong>Ensino Integral:</strong><br>• Segunda a Sexta: 7h00 às 17h00<br><br>🏢 <strong>Secretaria:</strong><br>• Segunda a Sexta: 7h00 às 18h00<br>• Sábado: 8h00 às 12h00<br><br>📞 <strong>Atendimento:</strong> Sempre com hora marcada!",

    "matricular filho":
      "📝 <strong>Processo de Matrícula - Colégio Amorim:</strong><br><br>📋 <strong>Documentos necessários:</strong><br>• RG e CPF do responsável<br>• Certidão de nascimento do aluno<br>• Histórico escolar<br>• Declaração de transferência<br>• Comprovante de residência<br>• Cartão de vacinação<br><br>🗓️ <strong>Período de matrículas:</strong><br>• Novembro a Janeiro<br><br>📞 <strong>Agende sua visita:</strong> (11) 3456-7890",

    mensalidades:
      "💰 <strong>Valores - Colégio Amorim 2024:</strong><br><br>🎒 <strong>Ensino Fundamental I:</strong><br>• Matrícula: R$ 800,00<br>• Mensalidade: R$ 1.200,00<br><br>📚 <strong>Ensino Fundamental II:</strong><br>• Matrícula: R$ 900,00<br>• Mensalidade: R$ 1.400,00<br><br>🎓 <strong>Ensino Médio:</strong><br>• Matrícula: R$ 1.000,00<br>• Mensalidade: R$ 1.600,00<br><br>💳 <strong>Formas de pagamento:</strong> À vista, cartão ou boleto<br>🎁 <strong>Desconto:</strong> 10% para irmãos",

    "atividades extracurriculares":
      "⚽ <strong>Atividades Extracurriculares - Colégio Amorim:</strong><br><br>🏃‍♂️ <strong>Esportes:</strong><br>• Futebol e Futsal<br>• Basquete e Vôlei<br>• Natação<br>• Judô e Karatê<br><br>🎨 <strong>Arte e Cultura:</strong><br>• Teatro e Dança<br>• Música e Coral<br>• Artes Plásticas<br><br>🧠 <strong>Acadêmicas:</strong><br>• Robótica<br>• Xadrez<br>• Inglês avançado<br>• Reforço escolar<br><br>📅 <strong>Horários:</strong> Contraturno escolar",

    localizado:
      "📍 <strong>Localização - Colégio Amorim:</strong><br><br>🏫 <strong>Endereço:</strong><br>Rua das Flores, 123<br>Bairro Jardim Esperança<br>São Paulo - SP<br>CEP: 01234-567<br><br>🚌 <strong>Transporte:</strong><br>• Linhas de ônibus: 123, 456, 789<br>• Estação de metrô mais próxima: Vila Esperança (500m)<br><br>🚗 <strong>Estacionamento:</strong><br>• Gratuito para pais e responsáveis<br>• 50 vagas disponíveis<br><br>🗺️ <strong>Referências:</strong> Próximo ao Shopping Center Norte",

    diferenciais:
      "⭐ <strong>Diferenciais do Colégio Amorim:</strong><br><br>🎯 <strong>Metodologia:</strong><br>• Ensino personalizado<br>• Turmas reduzidas (máx. 25 alunos)<br>• Acompanhamento individual<br><br>💻 <strong>Tecnologia:</strong><br>• Laboratório de informática<br>• Lousa digital em todas as salas<br>• Plataforma digital de ensino<br><br>🌱 <strong>Valores:</strong><br>• Educação socioemocional<br>• Sustentabilidade<br>• Inclusão e diversidade<br><br>🏆 <strong>Resultados:</strong><br>• 95% de aprovação no ENEM<br>• Medalhas em olimpíadas acadêmicas",

    contato:
      "📞 <strong>Contatos - Colégio Amorim:</strong><br><br>☎️ <strong>Telefones:</strong><br>• Secretaria: (11) 3456-7890<br>• WhatsApp: (11) 99876-5432<br>• Coordenação: (11) 3456-7891<br><br>📧 <strong>E-mails:</strong><br>• secretaria@colegioamorim.edu.br<br>• coordenacao@colegioamorim.edu.br<br>• diretoria@colegioamorim.edu.br<br><br>🌐 <strong>Redes Sociais:</strong><br>• Instagram: @colegioamorim<br>• Facebook: Colégio Amorim Oficial<br><br>⏰ <strong>Horário de atendimento:</strong> 7h às 18h",

    "séries níveis":
      "📚 <strong>Séries e Níveis - Colégio Amorim:</strong><br><br>👶 <strong>Educação Infantil:</strong><br>• Maternal (2-3 anos)<br>• Jardim I (4 anos)<br>• Jardim II (5 anos)<br><br>📖 <strong>Ensino Fundamental:</strong><br>• Anos Iniciais (1º ao 5º ano)<br>• Anos Finais (6º ao 9º ano)<br><br>🎓 <strong>Ensino Médio:</strong><br>• 1º, 2º e 3º ano<br>• Preparação para ENEM e vestibulares<br><br>⭐ <strong>Modalidades:</strong><br>• Regular<br>• Integral<br>• Semi-integral",

    "ensino integral":
      "🌅 <strong>Ensino Integral - Colégio Amorim:</strong><br><br>⏰ <strong>Horário:</strong><br>• 7h00 às 17h00 (Segunda a Sexta)<br><br>🍽️ <strong>Refeições incluídas:</strong><br>• Lanche da manhã<br>• Almoço completo<br>• Lanche da tarde<br><br>📚 <strong>Atividades:</strong><br>• Aulas regulares pela manhã<br>• Almoço e descanso<br>• Atividades extracurriculares à tarde<br>• Apoio pedagógico<br>• Lição de casa orientada<br><br>💰 <strong>Valor adicional:</strong> R$ 400,00/mês<br><br>👨‍👩‍👧‍👦 <strong>Ideal para:</strong> Pais que trabalham período integral",

    // CAPACIDADES DO BOT
    fazer:
      "🎯 <strong>Eu posso ajudar você com informações sobre o Colégio Amorim:</strong><br><br>📚 <strong>Informações Acadêmicas:</strong><br>• Processo de matrícula<br>• Horários e funcionamento<br>• Séries e níveis de ensino<br>• Metodologia de ensino<br><br>💰 <strong>Valores e Pagamentos:</strong><br>• Mensalidades e taxas<br>• Formas de pagamento<br>• Descontos disponíveis<br><br>🏫 <strong>Estrutura:</strong><br>• Localização e endereço<br>• Atividades extracurriculares<br>• Diferenciais da escola<br><br>📞 <strong>Contato:</strong><br>• Telefones e e-mails<br>• Como agendar visitas<br><br>💬 <strong>Pergunte à vontade!</strong> 😊",

    capaz:
      "🎯 <strong>Eu posso ajudar você com informações sobre o Colégio Amorim:</strong><br><br>📚 <strong>Informações Acadêmicas:</strong><br>• Processo de matrícula<br>• Horários e funcionamento<br>• Séries e níveis de ensino<br>• Metodologia de ensino<br><br>💰 <strong>Valores e Pagamentos:</strong><br>• Mensalidades e taxas<br>• Formas de pagamento<br>• Descontos disponíveis<br><br>🏫 <strong>Estrutura:</strong><br>• Localização e endereço<br>• Atividades extracurriculares<br>• Diferenciais da escola<br><br>📞 <strong>Contato:</strong><br>• Telefones e e-mails<br>• Como agendar visitas<br><br>💬 <strong>Pergunte à vontade!</strong> 😊",
  }

  // Buscar resposta baseada em palavras-chave
  for (const [key, response] of Object.entries(responses)) {
    if (question.includes(key.replace(" ", "")) || key.split(" ").every((word) => question.includes(word))) {
      return response
    }
  }

  // Respostas específicas para palavras-chave gerais sobre o Colégio Amorim
  if (question.includes("amorim")) {
    return "🏫 <strong>Colégio Amorim - Excelência em Educação!</strong><br><br>📍 <strong>Sobre nós:</strong><br>• Mais de 30 anos de tradição<br>• Ensino de qualidade da Educação Infantil ao Ensino Médio<br>• Metodologia inovadora e personalizada<br><br>🌟 <strong>O que posso te ajudar:</strong><br>• Informações sobre matrícula<br>• Valores e mensalidades<br>• Atividades e horários<br>• Localização e contato<br><br>💬 <strong>Faça sua pergunta!</strong>"
  }

  if (question.includes("matrícula") || question.includes("matricula")) {
    return "📝 <strong>Matrícula no Colégio Amorim:</strong><br><br>📅 <strong>Período:</strong> Novembro a Janeiro<br><br>📋 <strong>Documentos:</strong><br>• RG e CPF do responsável<br>• Certidão de nascimento<br>• Histórico escolar<br>• Comprovante de residência<br><br>📞 <strong>Agende sua visita:</strong> (11) 3456-7890<br><br>💡 <strong>Dica:</strong> Visite nossa escola para conhecer nossa estrutura!"
  }

  if (question.includes("valor") || question.includes("preço") || question.includes("mensalidade")) {
    return "💰 <strong>Valores do Colégio Amorim:</strong><br><br>🎒 <strong>Fund. I:</strong> R$ 1.200,00/mês<br>📚 <strong>Fund. II:</strong> R$ 1.400,00/mês<br>🎓 <strong>Ensino Médio:</strong> R$ 1.600,00/mês<br><br>🎁 <strong>Descontos:</strong><br>• 10% para irmãos<br>• 5% pagamento à vista<br><br>📞 <strong>Mais informações:</strong> (11) 3456-7890"
  }

  if (question.includes("localização") || question.includes("endereço") || question.includes("onde fica")) {
    return "📍 <strong>Localização do Colégio Amorim:</strong><br><br>🏫 <strong>Endereço:</strong><br>Rua das Flores, 123<br>Jardim Esperança - São Paulo/SP<br>CEP: 01234-567<br><br>🚌 <strong>Transporte:</strong><br>• Ônibus: 123, 456, 789<br>• Metrô: Vila Esperança (500m)<br><br>🚗 <strong>Estacionamento gratuito</strong><br><br>🗺️ <strong>Referência:</strong> Próximo ao Shopping Center Norte"
  }

  if (question.includes("contato") || question.includes("telefone") || question.includes("whatsapp")) {
    return "📞 <strong>Contatos do Colégio Amorim:</strong><br><br>☎️ <strong>Telefones:</strong><br>• Secretaria: (11) 3456-7890<br>• WhatsApp: (11) 99876-5432<br><br>📧 <strong>E-mail:</strong><br>secretaria@colegioamorim.edu.br<br><br>🌐 <strong>Redes Sociais:</strong><br>• @colegioamorim<br><br>⏰ <strong>Atendimento:</strong> 7h às 18h"
  }

  // Respostas padrão mais amigáveis
  const defaultResponses = [
    "🤔 Hmm, não tenho essa informação específica sobre o Colégio Amorim.<br><br>💡 <strong>Posso ajudar com:</strong><br>• Processo de matrícula<br>• Horários e valores<br>• Atividades e localização<br><br>📞 <strong>Ou ligue:</strong> (11) 3456-7890",
    "💭 Interessante! Para informações mais específicas sobre o Colégio Amorim, recomendo entrar em contato diretamente.<br><br>📞 <strong>Telefone:</strong> (11) 3456-7890<br>📱 <strong>WhatsApp:</strong> (11) 99876-5432",
    "🎯 Não encontrei essa informação no meu banco de dados sobre o Colégio Amorim.<br><br>📋 <strong>Use o menu</strong> para ver as perguntas que posso responder!<br><br>📞 <strong>Contato direto:</strong> (11) 3456-7890",
    "✨ Ainda estou aprendendo sobre esse aspecto do Colégio Amorim.<br><br>🏫 <strong>Para informações detalhadas:</strong><br>📞 (11) 3456-7890<br>📧 secretaria@colegioamorim.edu.br<br><br>💬 <strong>Ou pergunte sobre:</strong> matrícula, horários, valores!",
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

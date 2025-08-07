// Estado da aplicação
let isMenuOpen = false;
let isDarkTheme = true;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupMenuItems();
    addWelcomeMessage();
}

function setupEventListeners() {
    const userInput = document.getElementById('userInput');
    
    // Enter para enviar mensagem
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize do input
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

function setupMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendSuggestion(question);
            toggleMenu();
        });
    });
}

function toggleMenu() {
    const menuPopup = document.getElementById('menuPopup');
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        menuPopup.style.display = 'flex';
        setTimeout(() => {
            menuPopup.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        menuPopup.classList.remove('active');
        setTimeout(() => {
            menuPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function toggleTheme() {
    // Funcionalidade para tema claro/escuro (pode ser implementada futuramente)
    console.log('Toggle theme clicked');
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    
    // Limpar input
    input.value = '';
    input.style.height = 'auto';
    
    // Mostrar indicador de digitação
    showTypingIndicator();
    
    // Simular delay de resposta
    setTimeout(() => {
        hideTypingIndicator();
        const response = getResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function sendSuggestion(question) {
    const input = document.getElementById('userInput');
    input.value = question;
    sendMessage();
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = sender === 'user' ? 'user-avatar' : 'bot-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>'); // Permite quebras de linha
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addWelcomeMessage() {
    // A mensagem de boas-vindas já está no HTML
}

function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.appendChild(indicator);
    indicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.classList.remove('active');
}

function getResponse(question) {
    const responses = {
        // ESCOLAS/COLÉGIOS
        'colégio são paulo': "🏫 <strong>Melhores colégios em São Paulo:</strong><br><br>🌟 <strong>Particulares:</strong><br>• Colégio Bandeirantes<br>• Colégio São Luís<br>• Colégio Dante Alighieri<br>• Colégio Rio Branco<br>• Colégio Santa Cruz<br><br>🏛️ <strong>Públicas de destaque:</strong><br>• ETEC (Escolas Técnicas)<br>• Colégio Pedro II<br>• IF-SP (Instituto Federal)<br><br>📍 Todas com excelente infraestrutura e ensino de qualidade!",
        
        'escola são paulo': "🏫 <strong>Melhores escolas em São Paulo:</strong><br><br>🌟 <strong>Particulares:</strong><br>• Colégio Bandeirantes<br>• Colégio São Luís<br>• Colégio Dante Alighieri<br>• Colégio Rio Branco<br>• Colégio Santa Cruz<br><br>🏛️ <strong>Públicas de destaque:</strong><br>• ETEC (Escolas Técnicas)<br>• Colégio Pedro II<br>• IF-SP (Instituto Federal)<br><br>📍 Todas com excelente infraestrutura e ensino de qualidade!",
        
        'colégio rio grande do sul': "🏫 <strong>Melhores colégios no Rio Grande do Sul:</strong><br><br>🌟 <strong>Particulares:</strong><br>• Colégio Anchieta (Porto Alegre)<br>• Colégio Farroupilha<br>• Colégio Marista Rosário<br>• Colégio João XXIII<br>• Colégio La Salle<br><br>🏛️ <strong>Públicas de destaque:</strong><br>• Colégio Militar de Porto Alegre<br>• IF-RS (Instituto Federal)<br>• Colégio de Aplicação UFRGS<br><br>📍 Tradição e excelência no ensino gaúcho!",
        
        'escola rio grande do sul': "🏫 <strong>Melhores escolas no Rio Grande do Sul:</strong><br><br>🌟 <strong>Particulares:</strong><br>• Colégio Anchieta (Porto Alegre)<br>• Colégio Farroupilha<br>• Colégio Marista Rosário<br>• Colégio João XXIII<br>• Colégio La Salle<br><br>🏛️ <strong>Públicas de destaque:</strong><br>• Colégio Militar de Porto Alegre<br>• IF-RS (Instituto Federal)<br>• Colégio de Aplicação UFRGS<br><br>📍 Tradição e excelência no ensino gaúcho!",
        
        'colégio minas gerais': "🏫 <strong>Melhores colégios em Minas Gerais:</strong><br><br>🌟 <strong>Particulares:</strong><br>• Colégio Santo Antônio (BH)<br>• Colégio Bernoulli<br>• Colégio Magnum<br>• Colégio Santa Dorotéia<br>• Colégio Loyola<br><br>🏛️ <strong>Públicas de destaque:</strong><br>• Colégio Técnico UFMG<br>• IF-MG (Instituto Federal)<br>• Colégio Militar de Belo Horizonte<br><br>📍 Qualidade mineira reconhecida nacionalmente!",
        
        'escola minas gerais': "🏫 <strong>Melhores escolas em Minas Gerais:</strong><br><br>🌟 <strong>Particulares:</strong><br>• Colégio Santo Antônio (BH)<br>• Colégio Bernoulli<br>• Colégio Magnum<br>• Colégio Santa Dorotéia<br>• Colégio Loyola<br><br>🏛️ <strong>Públicas de destaque:</strong><br>• Colégio Técnico UFMG<br>• IF-MG (Instituto Federal)<br>• Colégio Militar de Belo Horizonte<br><br>📍 Qualidade mineira reconhecida nacionalmente!",

        // SUPERMERCADOS
        'supermercado são paulo': "🛒 <strong>Melhores supermercados em São Paulo:</strong><br><br>💰 <strong>Preço e variedade:</strong><br>• Extra Hiper<br>• Carrefour<br>• Walmart (Big)<br>• Atacadão<br><br>🌟 <strong>Qualidade premium:</strong><br>• Pão de Açúcar<br>• St. Marche<br>• Empório Santa Maria<br>• Zona Sul<br><br>🏪 <strong>Regionais:</strong><br>• Sonda Supermercados<br>• Dia Supermercado<br><br>📍 Ótimas opções para todos os bolsos!",
        
        'supermercado rio grande do sul': "🛒 <strong>Melhores supermercados no Rio Grande do Sul:</strong><br><br>💰 <strong>Preço e variedade:</strong><br>• Zaffari<br>• Nacional<br>• Big (Walmart)<br>• Carrefour<br><br>🌟 <strong>Qualidade regional:</strong><br>• Bourbon<br>• Unisuper<br>• Super Muffato<br>• Imec<br><br>🏪 <strong>Atacado:</strong><br>• Makro<br>• Atacadão<br><br>📍 Tradição gaúcha no varejo!",
        
        'supermercado minas gerais': "🛒 <strong>Melhores supermercados em Minas Gerais:</strong><br><br>💰 <strong>Preço e variedade:</strong><br>• EPA Supermercados<br>• Carrefour<br>• Extra<br>• Atacadão<br><br>🌟 <strong>Qualidade regional:</strong><br>• Verdemar<br>• Super Nosso<br>• BH Supermercados<br>• Bahamas<br><br>🏪 <strong>Tradicionais:</strong><br>• Pão de Açúcar<br>• Big<br><br>📍 Qualidade mineira no atendimento!",

        // ORFANATOS/ADOÇÃO
        'orfanato são paulo': "👶 <strong>Instituições para adoção em São Paulo:</strong><br><br>🏠 <strong>Principais instituições:</strong><br>• Casa Lar Meimei<br>• Lar Sírio Pró-Infância<br>• Fundação Abrinq<br>• Casa de Zion<br>• Lar das Crianças<br><br>📋 <strong>Processo legal:</strong><br>• Cadastro Nacional de Adoção (CNA)<br>• Vara da Infância e Juventude<br>• Curso preparatório obrigatório<br><br>⚖️ <strong>IMPORTANTE:</strong> A adoção deve ser feita através dos canais oficiais da Justiça!<br><br>📞 <strong>Contato:</strong> Tribunal de Justiça de SP",
        
        'orfanato rio grande do sul': "👶 <strong>Instituições para adoção no Rio Grande do Sul:</strong><br><br>🏠 <strong>Principais instituições:</strong><br>• Casa Lar Menino Jesus<br>• Fundação Fé e Alegria<br>• Casa da Criança e do Adolescente<br>• Lar Escola Santa Rita<br>• Instituto Amigos de Lucas<br><br>📋 <strong>Processo legal:</strong><br>• Cadastro Nacional de Adoção (CNA)<br>• Vara da Infância e Juventude<br>• Curso preparatório obrigatório<br><br>⚖️ <strong>IMPORTANTE:</strong> A adoção deve ser feita através dos canais oficiais da Justiça!<br><br>📞 <strong>Contato:</strong> Tribunal de Justiça do RS",
        
        'orfanato minas gerais': "👶 <strong>Instituições para adoção em Minas Gerais:</strong><br><br>🏠 <strong>Principais instituições:</strong><br>• Casa do Caminho<br>• Lar Fabiano de Cristo<br>• Casa Lar Amor de Mãe<br>• Instituto Padre Machado<br>• Casa da Criança São Vicente<br><br>📋 <strong>Processo legal:</strong><br>• Cadastro Nacional de Adoção (CNA)<br>• Vara da Infância e Juventude<br>• Curso preparatório obrigatório<br><br>⚖️ <strong>IMPORTANTE:</strong> A adoção deve ser feita através dos canais oficiais da Justiça!<br><br>📞 <strong>Contato:</strong> Tribunal de Justiça de MG",

        // CAPACIDADES DO BOT
        'fazer': "🎯 <strong>Eu posso ajudar você com:</strong><br><br>🏫 <strong>Educação:</strong><br>• Melhores escolas por região<br>• Informações sobre colégios<br>• Dicas educacionais<br><br>🛒 <strong>Compras:</strong><br>• Melhores supermercados<br>• Dicas de economia<br>• Onde encontrar produtos<br><br>👶 <strong>Adoção:</strong><br>• Informações sobre o processo<br>• Instituições credenciadas<br>• Orientações legais<br><br>💬 <strong>E muito mais!</strong> Pergunte à vontade! 😊",
        
        'capaz': "🎯 <strong>Eu posso ajudar você com:</strong><br><br>🏫 <strong>Educação:</strong><br>• Melhores escolas por região<br>• Informações sobre colégios<br>• Dicas educacionais<br><br>🛒 <strong>Compras:</strong><br>• Melhores supermercados<br>• Dicas de economia<br>• Onde encontrar produtos<br><br>👶 <strong>Adoção:</strong><br>• Informações sobre o processo<br>• Instituições credenciadas<br>• Orientações legais<br><br>💬 <strong>E muito mais!</strong> Pergunte à vontade! 😊"
    };
    
    // Buscar resposta baseada em palavras-chave
    for (const [key, response] of Object.entries(responses)) {
        // Lógica para verificar se a pergunta do usuário contém a chave e a região
        const keyParts = key.split(' ');
        const mainKeyword = keyParts[0]; // Ex: 'colégio', 'supermercado', 'orfanato'
        const regionKeyword = keyParts.slice(1).join(' '); // Ex: 'são paulo', 'rio grande do sul'

        if (question.includes(mainKeyword) && question.includes(regionKeyword)) {
            return response;
        }
    }
    
    // Respostas específicas para palavras-chave gerais
    if (question.includes('escola') || question.includes('colégio')) {
        return "🏫 <strong>Sobre escolas:</strong><br><br>Posso te ajudar com informações sobre as melhores escolas em:<br>• São Paulo 🏙️<br>• Rio Grande do Sul 🌾<br>• Minas Gerais ⛰️<br><br>Especifique a região que você tem interesse!";
    }
    
    if (question.includes('supermercado') || question.includes('mercado')) {
        return "🛒 <strong>Sobre supermercados:</strong><br><br>Posso te ajudar com os melhores supermercados em:<br>• São Paulo 🏙️<br>• Rio Grande do Sul 🌾<br>• Minas Gerais ⛰️<br><br>Qual região você gostaria de saber?";
    }
    
    if (question.includes('orfanato') || question.includes('adoção') || question.includes('adotar')) {
        return "👶 <strong>Sobre adoção:</strong><br><br>Posso te ajudar com informações sobre adoção em:<br>• São Paulo 🏙️<br>• Rio Grande do Sul 🌾<br>• Minas Gerais ⛰️<br><br>⚖️ <strong>Lembre-se:</strong> A adoção deve sempre ser feita através dos canais oficiais da Justiça!<br><br>Qual região você tem interesse?";
    }
    
    // Respostas padrão mais amigáveis
    const defaultResponses = [
        "🤔 Hmm, não tenho certeza sobre isso. Pode reformular a pergunta?<br><br>💡 <strong>Posso ajudar com:</strong><br>• Escolas e colégios<br>• Supermercados<br>• Processo de adoção",
        "💭 Interessante! Pode me dar mais detalhes sobre o que você quer saber?<br><br>🎯 Especializo-me em informações sobre educação, compras e adoção.",
        "🎯 Não entendi completamente. Tente usar o menu para ver as perguntas que posso responder!<br><br>📋 Ou pergunte sobre escolas, supermercados ou adoção.",
        "✨ Desculpe, ainda estou aprendendo sobre esse assunto.<br><br>🏫 Que tal perguntar sobre escolas, supermercados ou processo de adoção?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
    const menuPopup = document.getElementById('menuPopup');
    const menuButton = document.querySelector('.menu-button');
    
    if (isMenuOpen && !menuPopup.contains(e.target) && !menuButton.contains(e.target)) {
        toggleMenu();
    }
});

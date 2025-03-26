const contactsList = document.querySelector('.contacts-list');
const emptyState = document.querySelector('.empty-state');
const activeChat = document.querySelector('.active-chat');
const messagesContainer = document.querySelector('.messages-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const activeContactName = document.getElementById('active-contact-name');
const activeContactAvatar = document.getElementById('active-contact-avatar');
const activeContactStatus = document.getElementById('active-contact-status');
const searchInput = document.querySelector('.search-box input');

function initApp() {
    loadContacts();
    setupEventListeners();
    initTheme();
}

function loadContacts() {
    contactsList.innerHTML = '';
    
    usersData.forEach(user => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.dataset.name = user.name;
        
        contactItem.innerHTML = `
            <div class="avatar-wrapper">
                <img src="${user.avatar}" alt="${user.name}" class="profile-pic">
                <span class="online-status ${user.status.toLowerCase()}"></span>
            </div>
            <div class="contact-info">
                <h4>${user.name}</h4>
                <p>${user.lastMessage}</p>
            </div>
            <div class="contact-time">${user.time}</div>
            ${user.unread > 0 ? `<span class="unread-badge">${user.unread}</span>` : ''}
        `;
        
        contactItem.addEventListener('click', () => openChat(user));
        contactsList.appendChild(contactItem);
    });
}

function openChat(user) {
    emptyState.style.display = 'none';
    activeChat.style.display = 'flex';
    
    activeContactName.textContent = user.name;
    activeContactAvatar.src = user.avatar;
    activeContactStatus.textContent = user.status;
    
    loadMessages(user.name);
    
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.name === user.name) {
            item.classList.add('active');
            const badge = item.querySelector('.unread-badge');
            if (badge) badge.remove();
        }
    });
}

function loadMessages(contactName) {
    messagesContainer.innerHTML = '';
    
    if (chatData[contactName]) {
        chatData[contactName].forEach(msg => {
            addMessage(msg.message, msg.type === 'sent', msg.time, false);
        });
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else {
        showWelcomeMessage(contactName);
    }
}

function showWelcomeMessage(contactName) {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    welcomeMsg.id = 'welcome-message';
    welcomeMsg.innerHTML = `
        <p>Start your conversation with ${contactName}</p>
        <p>Send your first message below</p>
    `;
    messagesContainer.appendChild(welcomeMsg);
}

function addMessage(text, isSent, time = null, saveToData = true) {
    const welcomeMsg = document.getElementById('welcome-message');
    if (welcomeMsg) welcomeMsg.remove();
    
    if (!time) {
        const now = new Date();
        time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${time}</div>
    `;
    messagesContainer.appendChild(messageDiv);
    
    const contactName = activeContactName.textContent;
    if (isSent && saveToData) {
        if (!chatData[contactName]) chatData[contactName] = [];
        chatData[contactName].push({
            type: 'sent',
            message: text,
            time: time
        });
    }
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;
    
    const activeContact = document.querySelector('.contact-item.active');
    if (!activeContact) return;
    
    const contactName = activeContact.dataset.name;
    
    addMessage(messageText, true);
    messageInput.value = '';
    
    document.querySelectorAll('.contact-item').forEach(item => {
        if (item.dataset.name === contactName) {
            const lastMsg = item.querySelector('.contact-info p');
            if (lastMsg) {
                lastMsg.textContent = messageText.length > 30 
                    ? `${messageText.substring(0, 30)}...` 
                    : messageText;
            }
        }
    });
}

function searchConversations() {
    const searchTerm = searchInput.value.toLowerCase();
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const contactName = item.dataset.name.toLowerCase();
        if (contactName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    searchInput.addEventListener('input', searchConversations);
    document.querySelector('.settings-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.dropdown-content').classList.toggle('show');
    });
    document.addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.remove('show');
    });
}

function selectTheme(event) {
    const color = event.target.value.toLowerCase();
    const panelHeader = document.querySelector('.panel-header');
    const chatHeader = document.querySelector('.chat-header');
    
    const colorClasses = [
        'theme-black', 'theme-red', 'theme-blue', 'theme-green',
        'theme-yellow', 'theme-grey', 'theme-plum', 'theme-navy',
        'theme-pink', 'theme-purple', 'theme-coral', 'theme-orange',
        'theme-brown', 'theme-cyan', 'theme-maroon', 'theme-olive'
    ];
    
    panelHeader.classList.remove(...colorClasses);
    chatHeader.classList.remove(...colorClasses);
    
    if (color !== "change theme") {
        panelHeader.classList.add(`theme-${color}`);
        chatHeader.classList.add(`theme-${color}`);
    } else {
        panelHeader.style.backgroundColor = '';
        chatHeader.style.backgroundColor = '';
    }
    
    localStorage.setItem('headerTheme', color);
}

function changeBg(event) {
    const bg = event.target.value;
    const root = document.documentElement;
    const messagesContainer = document.querySelector('.messages-container');
    
    messagesContainer.classList.remove('bg-default', 'bg-image1', 'bg-image2', 'bg-image3');
    
    switch(bg) {
        case 'default':
            messagesContainer.style.backgroundImage = 'none';
            messagesContainer.style.backgroundColor = '#F9FAFB';
            break;
        case 'image1':
            messagesContainer.style.backgroundImage = 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")';
            messagesContainer.style.backgroundColor = 'transparent';
            break;
        case 'image2':
            messagesContainer.style.backgroundImage = 'url("https://wallpaperaccess.com/full/1288076.jpg")';
            messagesContainer.style.backgroundColor = 'transparent';
            break;
        case 'image3':
            messagesContainer.style.backgroundImage = 'url("https://i.pinimg.com/736x/78/1e/21/781e212cb0a891c6d8a3738c525e235d.jpg")';
            messagesContainer.style.backgroundColor = 'transparent';
            break;
    }
    
    localStorage.setItem('background', bg);
    
    if (bg === 'image1') {
        root.style.setProperty('--message-received-bg', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--message-received-text', '#1A1C23');
    } else {
        root.style.setProperty('--message-received-bg', '#FFFFFF');
        root.style.setProperty('--message-received-text', '#1A1C23');
    }
}

function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    searchInput.addEventListener('input', searchConversations);
    messageInput.addEventListener('input', updateMessageStats);
    document.querySelector('.settings-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.dropdown-content').classList.toggle('show');
    });
    document.addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.remove('show');
    });
}

function updateMessageStats() {
    const text = messageInput.value;
    const charCount = text.length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    document.getElementById('message-stats').textContent = `${charCount} characters, ${wordCount} words`;
}

function initTheme() {
    const savedTheme = localStorage.getItem('headerTheme');
    if (savedTheme && savedTheme !== "change theme") {
        const select = document.querySelector('select[onchange="selectTheme(event)"]');
        if (select) select.value = savedTheme;
        selectTheme({target: {value: savedTheme}});
    }
    const savedColor = localStorage.getItem('themeColor') || '#7E3AF2';
    const savedBg = localStorage.getItem('background') || 'default';
    
    document.documentElement.style.setProperty('--primary-color', savedColor);
    document.documentElement.style.setProperty('--primary-light', `${savedColor}20`);
    
    const bgSelect = document.querySelector('select[onchange="changeBg(event)"]');
    if (bgSelect) bgSelect.value = savedBg;
    changeBg({target: {value: savedBg}});
}

document.addEventListener('DOMContentLoaded', initApp);
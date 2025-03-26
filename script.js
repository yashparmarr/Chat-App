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
  }
  
  document.addEventListener('DOMContentLoaded', initApp);
// @ts-nocheck

const SaraSelectorBtn = document.querySelector('#Sara-selector')
const SamSelectorBtn = document.querySelector('#Sam-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-container')
const chats = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

function createChatMessageElement(message) {
  const div = document.createElement('div')
  div.className = `message ${message.sender === 'Sara' ? 'blue-bg' : 'gray-bg'}`
  div.innerHTML = `
    <div class="message-sender">${message.sender}</div>
    <div class="message-text"></div>
    <div class="message-timestamp">${message.timestamp}</div>
  `
  div.querySelector('.message-text').textContent = message.text
  return div
}

window.onload = () => {
  messages.forEach((message) => {
    chats.appendChild(createChatMessageElement(message))
  })
}

let messageSender = 'Sara'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Sara') {
    SaraSelectorBtn.classList.add('active-person')
    SamSelectorBtn.classList.remove('active-person')
  }
  if (name === 'Sam') {
    SamSelectorBtn.classList.add('active-person')
    SaraSelectorBtn.classList.remove('active-person')
  }

  /* auto-focus the input field */
  if (chatInput) chatInput.focus()
}

SaraSelectorBtn.onclick = () => updateMessageSender('Sara')
SamSelectorBtn.onclick = () => updateMessageSender('Sam')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chats.appendChild(createChatMessageElement(message))

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

if (clearChatBtn) {
  clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chats.innerHTML = ''
  })
}

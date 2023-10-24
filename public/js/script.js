const socket = io()

const form = document.querySelector('#form')
const input = document.querySelector('#input')
const pseudo = document.querySelector('#pseudo')
const messages = document.querySelector('#messages')

form.addEventListener("submit", e => {
    e.preventDefault()
    if(!input.value){
        return
    }
    socket.emit('chat message', pseudo.value, input.value)
    input.value = ""
    pseudo.value = ""
    input.focus()
    pseudo.focus()
})

// Récupérer les messages et mettre à jour le DOM
socket.on('chat message', (pseudo, msg) => {
    const item = document.createElement('li')
    item.textContent = `${pseudo} : ${msg}`
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
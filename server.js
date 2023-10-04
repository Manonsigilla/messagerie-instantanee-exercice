const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

// on va gérer l'ajout de fichiers statiques (css, js, image, etc)
app.use(express.static(join(__dirname, 'public')))

// le point d'entrée du serveur qui renvoie le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

// on écoute les connexions entrantes
io.on('connection', socket => {
    socket.on('chat message', (msg, pseudo) => {
        io.emit('chat message', msg, pseudo)
    })
})

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})
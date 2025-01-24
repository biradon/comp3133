// npm install express socket.io nodemon
// to run the app npx nodemon server.js

const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3000

// import socket server
const { Server } = require("socket.io")

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/client.html'))
})

//start listening to server on PORT
const appServer = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})

// Associate app server with socket server
const io = new Server(appServer)

// on() function listens to connection event
// when the event occurs, callback is excuted
io.on("connection", (socket) => {
    console.log(`Client connected. Client ID: ${socket.id}`)
    
    // list for 'ping' event
    socket.on('ping', (data) => {
        console.log(`ping event received from client. Data:  ${data}`)

        // Trigger hello event from server to client
        socket.emit('hello', 'hello from server')
    })

    // listen for 'chat-message' event
    socket.on('chat-message', (data) => {
        console.log(`Chat message received from client: ${data}`)

        // acknowledge message receipt
        socket.emit('chat-acknowledgement')
    })

    socket.on('send-feedback', (data) => {
        console.log(`Feedback received from client: ${JSON.stringify(data)}`)

        // // group all the feedback based on the category
        // socket.join(data.category)

        // // trigger event for all memebers in a group
        // io.to(data.category).emit('new-policy', 'policy updates.')

        socket.emit('feedback-acknowledgement', 
            {message:'Thanks for your feed back!'}
        )
    })
})

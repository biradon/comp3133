const express = require('express')
const mongoose = require('mongoose')
const app = express()

const http = require('http')

const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server)

mongoose.connect('mongodb+srv://biradon:password123456@cluster0.2pihl.mongodb.net/comp3133?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

const chatRoutes = require('./routes/ChatRoute');
app.use('/chat', chatRoutes)

const userRoutes = require('./routes/UserRoute');
app.use('/user', userRoutes)


io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data =>{
        io.emit('user-chat', data)
    })
})



app.listen(3000, () => {
    console.log("Listening on port 3000")
})


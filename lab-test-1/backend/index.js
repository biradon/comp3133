const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend to access backend
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://biradon:password123456@cluster0.2pihl.mongodb.net/comp3133?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Success Mongodb connection');
}).catch(err => {
    console.log('Error Mongodb connection', err);
});

// Routes
const chatRoutes = require('./routes/ChatRoute');
const userRoutes = require('./routes/UserRoute');

app.use('/chat', chatRoutes);
app.use('/user', userRoutes);

// WebSocket
const GroupMessage = require("./models/GroupMessage"); // Import the GroupMessage model
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for the 'on-chat' event
  socket.on("on-chat", (data) => {
    // Save the chat message to MongoDB
    const { message, room, username } = data;

    const groupMessage = new GroupMessage({
      fromuser: username,
      room: room, // You can use room to separate messages by room
      message: message,
      data_sent: new Date(),
    });

    // Save the message to MongoDB
    groupMessage
      .save()
      .then(() => {
        // After saving the message, broadcast it to all connected users
        io.emit("user-chat", data);
      })
      .catch((err) => {
        console.error("Error saving message:", err);
      });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Change backend port to avoid frontend conflict
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

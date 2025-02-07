const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const onlineUsers = {};

io.on("connection", (socket) => {

    socket.on("user-online", (userId) => {
        onlineUsers[userId] = socket.id;
        console.log(`User ${userId} is now online`);
        io.emit("online-users", Object.keys(onlineUsers)); 
    });

    socket.on("send-message", (newMessage) => {
        const receiverSocket = onlineUsers[newMessage.receiver];
        if (receiverSocket) {
            io.to(receiverSocket).emit("new-message", newMessage); 
        }
        io.to(socket.id).emit("new-message", newMessage); 
    });

    socket.on("disconnect", () => {
        const userId = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
        if (userId) {
            delete onlineUsers[userId];
            console.log(`User ${userId} disconnected`);
            io.emit("online-users", Object.keys(onlineUsers)); 
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

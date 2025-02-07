const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    const { receiver, message } = req.body;

    if (!receiver || !message) return res.status(400).json({ message: "All fields are required." });

    const newMessage = await Message.create({ sender: req.user.id, receiver, message });
    res.status(201).json(newMessage);
};

const getMessages = async (req, res) => {
    const messages = await Message.find({
        $or: [{ sender: req.user.id, receiver: req.params.userId }, { sender: req.params.userId, receiver: req.user.id }]
    }).sort({ timestamp: 1 });

    res.json(messages);
};

module.exports = { sendMessage, getMessages };

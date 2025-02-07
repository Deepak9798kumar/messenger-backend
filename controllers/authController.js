const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully." });
};

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//         const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "30d" });
//         res.json({ _id: user.id, name: user.name, email: user.email, token });
//     } else {
//         res.status(401).json({ message: "Invalid email or password" });
//     }
// };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        user.online = true;  
        await user.save();

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "30d" });
        res.json({ _id: user.id, name: user.name, email: user.email, token });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};


const getMe = async (req, res) => {
    res.json(req.user);
};

module.exports = { registerUser, loginUser, getMe };

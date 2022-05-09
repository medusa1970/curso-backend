const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body;
    const user = new User({ name, phone, email, password }); // Instancia de User
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save(); // Guarda el usuario en la base de datos
    res.json({
        message: 'User created successfully'
    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { return res.status(404).json({ message: 'User not found'});}
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { return res.status(400).json({ message: 'Invalid password'});}
    res.json({
        message: 'User logged successfully'
    });
}

exports.users = async (req, res) => {
    const users = await User.find();
    res.json(users);
}
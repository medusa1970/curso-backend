const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    if (!user) { return res.status(404).json({ message: 'Usuario no existe'});}
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { return res.status(400).json({ message: 'password incorrecto'});}
    const accestoken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '5m' });
    const refreshtoken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '15m' });
    res.json({
        accestoken,
        refreshtoken,
        message: `Bienvenido ${user.name}`,
        user: {name: user.name, email: user.email, phone: user.phone}
    });
}

exports.listuser = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

exports.userUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const user = await User.findByIdAndUpdate(id, { phone });
    res.json({
        message: 'User updated successfully'
    });
}

exports.userDelete = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json({
        message: 'User deleted successfully'
    });
}
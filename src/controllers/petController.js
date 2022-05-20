const Pet = require('../models/petModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.post = async (req, res) => {
    const {name, certificate, age, gender, owner, email, password} = req.body;
            
    const pet_found = await Pet.findOne({certificate});
    if(pet_found){
        res.status(410).json({
            error: 401,
            message: 'Esta mascota ya fue registrada'
        });
    }else{
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);
        const newPet = new Pet({name, certificate, age, gender, owner, email, password: newpassword});
        await newPet.save();
        res.json({message: "mascota registrada correctamente"})
    }
},

exports.get = async (req, res) => {
    try {
        const listPet = await Pet.find();
        res.json({
            error: null,
            message: "lista de mascotas obtenidas correctamente",
            listPet
        });
    } catch (error) {
        res.status(500).json({
            error: 500,
            message: 'Error al mostrar lista de mascotas'
        });
    }
},

exports.login = async(req, res) => {
    const {certificate, password} = req.body;  //req.body es un objeto
    const pet = await Pet.findOne({certificate}); //busca en la base de datos el usuario con el certificado
    if(!pet){ //si no encuentra el usuario
        res.status(401).json({
            error: 401,
            message: 'No existe una mascota con este numero de certificado'
        });
    }else{
        const validPassword = await bcrypt.compare(password, pet.password);
        if(!validPassword){
            res.status(401).json({
                error: 401,
                message: 'Contraseña incorrecta'
            });
        }else{
            const token = jwt.sign({ _id: pet._id}, process.env.SECRET_TOKEN, { expiresIn: '5m'});
            const refreshtoken = jwt.sign({ _id: pet._id}, process.env.SECRET_TOKEN, { expiresIn: '10m'});
            res.json({
                error: null,
                message: 'Login exitoso',
                token,
                refreshtoken
            });
        }
            res.json({
                error: null,
                message: 'Login correcto',
                pet
            });
        }
}


exports.put = (req, res) => {
    const {id} = req.params;
    const {owner, email} = req.body;
    Pet.findByIdAndUpdate(id, {owner, email}, {new: true}, (err, pet) => {
        if(err){
            res.status(500).json({
                error: 500,
                message: 'Error al actualizar mascota'
            });
        }else{
            res.json({
                error: null,
                message: 'Mascota actualizada correctamente',
                pet
            });
        }
    });
}

exports.delete = async(req, res) => {
    const {id} = req.params;
    Pet.findByIdAndDelete(id, (err, pet) => {
        if(err){
            res.status(500).json({
                error: 500,
                message: 'Error al eliminar mascota'
            });
        }else{
            res.json({
                error: null,
                message: 'Mascota eliminada correctamente'
            });
        }
    });
}
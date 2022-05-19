const Pet = require('../models/petModel');

exports.post = async (req, res) => {
    const {name, certificate, age, gender, owner, email, password} = req.body;
    const pet_found = await Pet.findOne({certificate}); 
    if(pet_found){
        res.status(410).json({
            error: 401,
            message: 'Esta mascota ya fue registrada'
        });
    }else{
        const newPet = new Pet({name, certificate, age, gender, owner, email, password});
        await newPet.save();
        res.json({message: "mascota grabada correctamente"})
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

exports.login = (req, res) => {
    res.json({message: 'llego datos login', data: req.body});
},

exports.put = (req, res) => {
    res.json({message: 'llego datos update', data: req.params});
},

exports.delete = (req, res) => {
    res.json({message: 'llego datos delete', data: req.params});
}
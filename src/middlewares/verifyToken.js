const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers['accestoken']);
    console.log(req.headers['refreshtoken'])
    const accestoken = req.headers['accestoken'];
    const refreshtoken = req.headers['refreshtoken'];
    if (!accestoken && !refreshtoken) { return res.status(401).json({ message: 'No existen los tokens'});}
        try {
            const acces = jwt.verify(accestoken, process.env.SECRET_KEY);
            const refresh = jwt.verify(refreshtoken, process.env.SECRET_KEY);
            if(!acces && !refresh) { return res.status(401).json({ message: 'Los tokens son invalidos'});}
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token invalido' });
        }
    }

    module.exports = verifyToken;
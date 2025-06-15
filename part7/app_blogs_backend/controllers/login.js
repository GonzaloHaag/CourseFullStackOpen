const jwt = require('jsonwebtoken'); // Para manejar sesiones
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');


/** post a /api/login --> manejado en app.js */
loginRouter.post('/',async (request,response) => {
    const { username, password } = request.body; // Obtengo los datos que van a venir en el body, enviados a traves de un form 

    /** Buscar usuario en mi base */
    const findUser = await User.findOne({ username });

    /** Verificar contraseña */
    const passwordCorrect = findUser === null ? false : await bcrypt.compare(password,findUser.passwordHash); // Si las password coinciden esto retorna true

    if(!(findUser && passwordCorrect)) {
        /** No se encontro el usuario o no coincidieron las contraseñas */
        return response.status(401).json({ error: 'Invalid username or password'})
    }

    const userForToken = {
        username: findUser.username,
        id: findUser._id
    }
    /** Creacion del token */
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 } // 1 hora, obliga al usuario a volver a iniciar sesion para obtener otro token
    );

    /** Devolvemos el token al usuario --> el token es firmado digitalmente */
    response.status(200).send({ token, username: findUser.username, name: findUser.name })
});

module.exports = loginRouter
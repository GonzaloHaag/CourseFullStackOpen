const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
usersRouter.post('/',async(request,response,next) => {
    const { username, name, password } = request.body;

    if(!username) {
        return response.status(400).json({error:'Username is required'})
    }
    if(!password) {
        return response.status(400).json({error:'Password is required'})
    }
    if(password.length < 3 ) {
        return response.status(400).json({error:'Password minimum 3 characters'})
    }
    const hashPassword = await bcrypt.hashSync(password,10); // hasheo la pass
    const user = new User({
        username: username,
        name: name,
        passwordHash: hashPassword
    });
    try {
        const savedUser = await user.save();
        response.status(201).json( savedUser )
    } catch (exception) {
        next(exception)
    }
});

usersRouter.get('/',async (request,response) => {
    const users = await User.find({}).populate('blogs',{ url: 1, title: 1, author: 1, id: 1}); // datos del blog a mostrar
    response.status(200).json( users )
})

usersRouter.get('/:id', async(request,response, next) => {
    try {
    const user = await User.findById(request.params.id).populate('blogs',{ url: 1, title: 1, author: 1, id: 1})
    if(!user) {
        return response.status(404).json({ error:'User not found' })
    }
    response.status(200).json( user )
   } catch (error) {
      next(error)
   }
})

module.exports = usersRouter
const testingRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

testingRouter.post('/reset', async(request,response) => {
    await Blog.deleteMany({}); // Borro todos los blogs 
    await User.deleteMany({}); // Borro todos los usuarios

    response.status(204).end();
});

module.exports = testingRouter;
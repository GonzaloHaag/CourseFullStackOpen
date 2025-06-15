const { test, after } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest'); // Libreria para los test 
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/); // Espero un 200 de respuesta y un json como Content Type

})

after(async () => {
    await mongoose.connection.close(); // Cerramos conexion
})
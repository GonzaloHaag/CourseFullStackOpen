const { test, after, before } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog'); // Asegúrate de tener este modelo

const api = supertest(app);

before(async () => {
    // Limpiamos la colección antes de cada prueba
    await Blog.deleteMany({});
    // Creamos un blog inicial
    await Blog.create({
        title: 'Blog inicial',
        author: 'Autor',
        url: 'http://inicial.com',
        likes: 5
    });
});

test('POST /api/blogs crea un nuevo blog', async () => {
    const blogsAntes = await Blog.find({});
    
    const nuevoBlog = {
        title: 'Nuevo blog',
        author: 'Tester',
        url: 'http://test.com',
        likes: 10
    };

    const response = await api
        .post('/api/blogs')
        .send(nuevoBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsDespues = await Blog.find({});
    assert.strictEqual(blogsDespues.length, blogsAntes.length + 1, 'No se incrementó la cantidad de blogs');

    const titulos = blogsDespues.map(b => b.title);
    assert.ok(titulos.includes(nuevoBlog.title), 'El nuevo blog no se encuentra en la base de datos');

    const blogGuardado = blogsDespues.find(b => b.title === nuevoBlog.title);
    assert.strictEqual(blogGuardado.author, nuevoBlog.author);
    assert.strictEqual(blogGuardado.url, nuevoBlog.url);
    assert.strictEqual(blogGuardado.likes, nuevoBlog.likes);
});

after(async () => {
    await mongoose.connection.close();
});
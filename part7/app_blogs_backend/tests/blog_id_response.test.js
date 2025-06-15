const { test, after, before } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

before(async () => {
    await Blog.deleteMany({}); // Limpiamos la colección antes del test
    // Insertamos un blog para que haya al menos uno
    await Blog.create({
        title: 'Blog de prueba',
        author: 'Tester',
        url: 'http://test.com',
        likes: 5
    });
});

test('The blog id comes as id', async () => {
    const response = await api.get('/api/blogs');
    
    // Verificamos que haya al menos un blog
    assert.ok(response.body.length > 0, 'No se devolvieron blogs');

    // Verificamos que cada blog tenga un campo 'id' definido
    for (const blog of response.body) {
        assert.ok(blog.id, 'El campo id no está definido');
        assert.strictEqual(typeof blog.id, 'string', 'El campo id no es una cadena');
    }
});

after(async () => {
    await mongoose.connection.close();
});

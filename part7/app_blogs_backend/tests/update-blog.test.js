const { test, before, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

before(async () => {
    await Blog.deleteMany({});
});

test('Blog can be updated with PUT', async () => {
    // Primero creamos un blog
    const newBlog = {
        title: 'Blog original',
        author: 'Autor original',
        url: 'http://original.com',
        likes: 5
    };

    const created = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201);

    const updatedData = {
        title: 'Blog actualizado',
        author: 'Autor actualizado',
        url: 'http://actualizado.com',
        likes: 10
    };

    // Actualizamos el blog
    const updated = await api
        .put(`/api/blogs/${created.body.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    // Verificamos que los datos hayan cambiado correctamente
    assert.strictEqual(updated.body.title, updatedData.title);
    assert.strictEqual(updated.body.author, updatedData.author);
    assert.strictEqual(updated.body.url, updatedData.url);
    assert.strictEqual(updated.body.likes, updatedData.likes);
});

after(async () => {
    await mongoose.connection.close();
});

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

test('If likes property is missing, it defaults to 0', async () => {
    const newBlog = {
        title: 'Blog sin likes',
        author: 'Anon',
        url: 'http://nolikes.com'
    };

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const createdBlog = response.body;

    assert.strictEqual(createdBlog.likes, 0, 'El valor de likes no fue 0 por defecto');
});

after(async () => {
    await mongoose.connection.close();
});

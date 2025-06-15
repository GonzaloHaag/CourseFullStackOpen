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

test('Blog creation fails with 400 if title is missing', async () => {
    const newBlog = {
        author: 'Autor sin título',
        url: 'http://sintitulo.com',
        likes: 5
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test('Blog creation fails with 400 if url is missing', async () => {
    const newBlog = {
        title: 'Título sin URL',
        author: 'Autor',
        likes: 3
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

after(async () => {
    await mongoose.connection.close();
});

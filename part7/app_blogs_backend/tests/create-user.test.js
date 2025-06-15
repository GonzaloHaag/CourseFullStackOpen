const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
});

test('se crea un usuario válido correctamente', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
        username: 'lalo',
        name: 'Eduardo',
        password: 'securepass'
    };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
});

test('no se crea usuario sin username', async () => {
    const newUser = {
        name: 'SinUsername',
        password: '123456'
    };

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(1); // solo el user inicial
});

test('no se crea usuario sin password', async () => {
    const newUser = {
        username: 'usuarioSinPassword',
        name: 'ErrorTest'
    };

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(1);
});

test('no se crea usuario con password menor a 3 caracteres', async () => {
    const newUser = {
        username: 'cortopass',
        name: 'Test corto',
        password: '12'
    };

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(1);
});

test('no se crea usuario con username repetido', async () => {
    const newUser = {
        username: 'root', // ya existe por el beforeEach
        name: 'Repetido',
        password: '123456'
    };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    expect(response.body.error).toBeDefined();

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(1);
});

afterAll(async () => {
    await mongoose.connection.close();
});

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const {
  clearDatabase,
  addUsersToDatabase,
  testUsers,
  // getUsersInDatabase,
} = require('./testHelper');
const User = require('../models/user');

const api = supertest(app);

/*
beforeEach(async () => {
  await clearDatabase(User);
  await addUsersToDatabase(User, testUsers[0]);
  console.log('Done adding user...');
}, 100000); */

test('new user can be added', async () => {
  const response = await api
    .post('/api/users')
    .send(testUsers[1])
    .expect(201);
  expect(response.body.username).toContain('mckloud');
  expect(response.body).not.toHaveProperty('password');
  expect(response.body).toHaveProperty('id');
  const getResponse = await api.get('/api/users');
  expect(getResponse.body).toHaveLength(2);
});

test('username must be unique', async () => {
  const user = {
    ...testUsers[0],
    username: 'root',
  };
  const response = await api
    .post('/api/users')
    .send(user)
    .expect(400);
  expect(response.body).toHaveProperty('error');
});

test('user can be added without name field', async () => {
  const { name, ...user } = testUsers[1];
  const response = await api
    .post('/api/users')
    .send(user)
    .expect(201);
  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toBe('');
});

test('username validation', async () => {
  const user = { ...testUsers[0], username: 'ca' };
  const response = await api
    .post('/api/users')
    .send(user)
    .expect(400);
  expect(response.body).toHaveProperty('error');
});

describe('password validation', () => {
  test('password length', async () => {
    const user = { ...testUsers[0], password: 'ca' };
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Password must be at least 3 characters long');
  });

  test('no password', async () => {
    const { password, ...user } = testUsers[1];
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Please provide a password');
  });

  test('user has blogs property', async () => {
    const response = await api
      .get('/api/users')
      .expect(200);
    expect(response.body[0]).toHaveProperty('blogs');
  });

  test('user can have empty blog list', async () => {
    const response = await api
      .get('/api/users')
      .expect(200);
    expect(response.body[0].blogs).toEqual([]);
  });
});

describe('test authentication', () => {
  let token;

  beforeAll(async () => {
    await clearDatabase(User);
    await addUsersToDatabase(User, testUsers[0]);
    console.log('Done adding user...');
  }, 100000);

  test('user can log in', async () => {
    const payload = {
      username: 'root',
      password: 'root',
    };
    const response = await api
      .post('/api/login')
      .send(payload)
      .expect(200);
    expect(response.body).toHaveProperty('token');
    token = ['Bearer', response.body.token];
    token = token.join(' ');
  });
});

afterAll(() => {
  mongoose.connection.close();
});

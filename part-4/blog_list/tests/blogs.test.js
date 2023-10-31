/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const superTest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./testHelper');

// use supertest to test the api calls/requests
const api = superTest(app);

const newBlog = {
  title: 'find the beast within',
  author: 'Nony, J, Nzekwe',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 30,
};

beforeAll(async () => {
  const savedUsers = helper.testUsers.map((user) => helper.addUsersToDatabase(User, user));
  await Promise.all(savedUsers);
  console.log('Done adding users...');
}, 100000);

beforeEach(async () => {
  const savedBlogs = helper.testBlogs.map((blog) => helper.addBlogsToDatabase(Blog, blog));
  await Promise.all(savedBlogs);
  console.log('Done adding blogs...');
});

describe('test blog lists expansion 1', () => {
  test('step 1, blogs length is 3', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.testBlogs.length);
    expect(response.headers['content-type']).toContain('json');
  });

  test('step 2, blogs unique identifier is named Id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0]).toHaveProperty('id');
  });

  test('step 3, new blog created successfully', async () => {
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog);
    expect(postResponse.body.author).toContain(newBlog.author);
    expect(postResponse.status).toBe(201);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body.length).toBe(4);
  });

  test('step 4, new blog without likes default to 0', async () => {
    // destructure the sample blog by removing the likes key
    // from the object
    const { likes, ...blog } = newBlog;
    const response = await api
      .post('/api/blogs')
      .send(blog);
    expect(response.body).toHaveProperty('likes');
    expect(response.body.likes).toBe(0);
  });

  test('step 5, new blog with no title or url properties', async () => {
    const { title, url, ...blog } = newBlog;
    const postResponse = await api
      .post('/api/blogs')
      .send(blog);
    expect(postResponse.status).toBe(400);
    expect(postResponse.body).toHaveProperty('error');
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body.length).toBe(3);
  });
});

describe('test blog lists expansion 2', () => {
  test('step 6, delete blog', async () => {
    // get a blog id
    const blogs = await Blog.find({});
    // send the delete request
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204);
    // confirm the blog was deleted
    const currentBlogs = await Blog.find({});
    expect(currentBlogs).toHaveLength(2);
  });

  test('step 7, update blog likes', async () => {
    const blog = await Blog.findOne({ title: 'React patterns' });
    const response = await api
      .put(`/api/blogs/${blog._id}`)
      .send({ likes: 3 })
      .expect(200);
    expect(response.body.likes).toBe(10);
  });
});

describe('test relations of blogs with user', () => {
  test('step 8, new blog designated to user', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200);
    expect(response.body[0]).toHaveProperty('user');
  });

  test('step 9, blog is populated by user info', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200);
    expect(response.body[0].user).toHaveProperty('username');
  });
});

afterAll(async () => {
  await helper.clearDatabase(User);
  console.log('All users deleted');
  await helper.clearDatabase(Blog);
  console.log('All blogs deleted...');
  // close connection to database after all tests are done.
  await mongoose.connection.close();
  console.log('Connection closed');
});

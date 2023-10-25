/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const superTest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');

// mongoose.set('bufferTimeoutMS', 30000);
// use supertest to test the api calls/requests
const api = superTest(app);

const sampleBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

const sampleBlog = {
  title: 'find the beast within',
  author: 'Nony, J, Nzekwe',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 30,
};

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of sampleBlogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
  console.log('done saving all');
}, 100000);

describe('test blog lists', () => {
  test('step 1, blogs length is 3', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(sampleBlogs.length);
    expect(response.headers['content-type']).toContain('json');
  });

  test('step 2, blogs unique identifier is named Id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0]).toHaveProperty('id');
  });

  test('step 3, new blog created successfully', async () => {
    const postResponse = await api
      .post('/api/blogs')
      .send(sampleBlog);
    expect(postResponse.body.author).toContain(sampleBlog.author);
    expect(postResponse.status).toBe(201);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body.length).toBe(4);
  });

  test('step 4, new blog without likes default to 0', async () => {
    // destructure the sample blog by removing the likes key
    // from the object
    const { likes, ...blog } = sampleBlog;
    const response = await api
      .post('/api/blogs')
      .send(blog);
    expect(response.body).toHaveProperty('likes');
    expect(response.body.likes).toBe(0);
  });

  test('step 5, new blog with no title or url properties', async () => {
    const { title, url, ...blog } = sampleBlog;
    const postResponse = await api
      .post('/api/blogs')
      .send(blog);
    expect(postResponse.status).toBe(400);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body.length).toBe(3);
  });
});

describe('test blog lists expansion', () => {
  test('step 6, delete blog', async () => {
    // get a blog id
    const blogs = await Blog.find({});
    // send the delete request
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204);
    // confirm the blog was deleted
    const currentBlogs = await Blog.find({});
    expect(currentBlogs.length).toBe(2);
    expect(currentBlogs[0].title).not.toContain('React patterns');
  });

  test('step 7, update blog likes', async () => {
    const blogs = await Blog.find({});
    const response = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send({ likes: 3 })
      .expect(203);
    expect(response.body.likes).toBe(10);
  });
});

afterAll(() => {
  // close connection to database after all tests are done.
  mongoose.connection.close();
});

const bcrypt = require('bcrypt');
const { getRandomUser } = require('../utils/helpers');

const testUsers = [
  {
    username: 'root',
    name: 'root',
    password: 'root',
  },
  {
    username: 'mckloud',
    name: 'keneb',
    password: 'keneb',
  },
  {
    username: 'pinky',
    name: 'maida',
    password: 'maida',
  },
];

const testBlogs = [
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

const clearDatabase = async (model) => {
  await model.deleteMany({});
};

const addBlogsToDatabase = async (Model, blog) => {
  const randomUser = await getRandomUser();
  const newBlog = {
    ...blog,
    user: randomUser._id,
  };
  await new Model(newBlog).save();
};

const addUsersToDatabase = async (Model, user) => {
  const password = await bcrypt.hash(user.password, 10);
  const newUser = {
    ...user,
    password,
  };
  await new Model(newUser).save();
};

const getAllDocuments = async (model) => {
  const users = await model.find({});
  return users;
};

module.exports = {
  clearDatabase,
  addBlogsToDatabase,
  addUsersToDatabase,
  getAllDocuments,
  testUsers,
  testBlogs,
};

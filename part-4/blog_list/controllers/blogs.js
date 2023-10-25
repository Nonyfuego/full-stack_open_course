const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (_request, response) => {
  const results = await Blog.find({});
  response.json(results);
});

router.post('/', async (request, response) => {
  const newBlog = request.body;
  if (!Object.keys(newBlog).includes('likes')) {
    newBlog.likes = 0;
  }
  const blog = await new Blog(newBlog).save();
  response.status(201).json(blog);
});

router.delete('/:id', async (request, response) => {
  const blogId = request.params.id;
  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
});

router.put('/:id', async (request, response) => {
  const newLikes = parseInt(request.body.likes, 10);
  const blog = await Blog.findById(request.params.id);
  blog.likes += newLikes;
  const updatedBlog = await blog.save();
  response.status(203).json(updatedBlog);
});

module.exports = router;

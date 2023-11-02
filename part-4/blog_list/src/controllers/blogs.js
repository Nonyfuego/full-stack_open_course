const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('/', async (request, response) => {
  const results = await Blog.find({});
  // console.log(request.token);
  // console.log(request.user);
  response.json(results);
});

router.post('/', async (request, response) => {
  // Only authenticated users are able to create a blog
  if (!request.user) {
    return response.status(401).json({ error: 'access denied' });
  }
  const user = await User.findById(request.user.id);
  const blog = {
    ...request.body,
    user: user._id,
  };
  // validation occurs while trying to save Blog
  // ValidationError will be raised if error occurs
  // while trying to save Blog.
  const savedBlog = await new Blog(blog).save();
  // assign new blog to user
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

router.delete('/:id', async (request, response) => {
  // Only creator of blog can delete blog
  const errorMsg = 'access denied';
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(400).json({ error: 'blog does not exist' });
  }
  if (!request.user) {
    return response.status(401).json({ error: errorMsg });
  }
  if (request.user.id !== blog.user._id.toString()) {
    return response.status(401).json({ error: errorMsg });
  }
  await Blog.deleteOne({ _id: blog._id });
  return response.status(204).end();
});

router.put('/:id', async (request, response) => {
  // only creator of blog can create blog
  const errorMsg = 'access denied';
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(400).json({ error: 'blog does not exist' });
  }
  if (!request.user) {
    return response.status(401).json({ error: errorMsg });
  }
  if (request.user.id !== blog.user._id.toString()) {
    return response.status(401).json({ error: errorMsg });
  }
  const newLikes = parseInt(request.body.likes, 10);
  blog.likes += newLikes;
  const updatedBlog = await blog.save();
  return response.status(200).json(updatedBlog);
});

module.exports = router;

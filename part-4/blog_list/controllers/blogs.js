const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', (_request, response, next) => {
  Blog.find({})
    .then((res) => response.json(res))
    .catch((err) => next(err));
});

router.post('/', (request, response, next) => {
  const data = new Blog(request.body);
  data.save()
    .then((res) => response.status(201).json(res))
    .catch((err) => next(err));
});

module.exports = router;

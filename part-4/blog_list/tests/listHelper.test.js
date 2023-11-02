/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const _ = require('lodash');
const listHelper = require('../src/utils/listHelper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
];

describe('test total likes', () => {
  test('when array has only one blog', () => {
    const blog = [blogs[0]];
    const likes = listHelper.totalLikes(blog);
    expect(likes).toBe(7);
  });

  test('when array has more than one blog', () => {
    const likes = listHelper.totalLikes(blogs);
    expect(likes).toBe(24);
  });

  test('when array is empty', () => {
    const likes = listHelper.totalLikes([]);
    expect(likes).toBe(0);
  });
});

describe('test favourite blog', () => {
  test('when a single blog has most likes', () => {
    const blogsCopy = [...blogs];
    const favouriteBlog = listHelper.favouriteBlog(blogsCopy);
    expect(favouriteBlog).toEqual(blogsCopy[2]);
  });

  test('when two blogs with same amount of like', () => {
    const blogsCopy = [...blogs];
    blogsCopy[1].likes = 12;
    const favouriteBlog = listHelper.favouriteBlog(blogsCopy);
    expect(favouriteBlog).toBe(blogsCopy[1]);
  });

  test('when all blogs has 0 like', () => {
    const blogsCopy = blogs.map((blog) => {
      blog.likes = 0;
      return blog;
    });
    const favouriteBlog = listHelper.favouriteBlog(blogsCopy);
    expect(favouriteBlog).toEqual(null);
  });
});

describe('test most blogs', () => {
  const blogsCopy = [
    ...blogs,
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ];

  test('when one author has most blogs', () => {
    const topAuthor = listHelper.mostBlog(blogsCopy);
    expect(topAuthor).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    });
  });

  test('when two author has most blogs', () => {
    const blogsCopy1 = [...blogsCopy];
    blogsCopy1[0] = {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    };
    const topAuthor = listHelper.mostBlog(blogsCopy1);
    expect(topAuthor).toEqual({
      author: 'Robert C. Martin',
      blogs: 2,
    });
  });

  test('when all author have the same amount', () => {
    const blogsCopy1 = _.dropRight(blogs, 1);
    const topAuthor = listHelper.mostBlog(blogsCopy1);
    expect(topAuthor).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    });
  });

  test('when blogs array is empty', () => {
    const topAuthor = listHelper.mostBlog([]);
    expect(topAuthor).toEqual({
      author: '',
      blogs: 0,
    });
  });
});

describe('test most likes', () => {
  test('when one author has many blogs with most likes', () => {
    let mostLikedAuthor = listHelper.mostLikes(blogs);
    expect(mostLikedAuthor).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });

  test('when many author has the same amount of likes', () => {
    let blogsCopy = [
      ...blogs,
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
        __v: 0,
      },
    ];
    let mostLIkedAuthor = listHelper.mostLikes(blogsCopy);
    expect(mostLIkedAuthor).toEqual({
      author: 'Michael Chan',
      likes: 17,
    });
  });

  test('when one author one blog with most likes', () => {
    let blogsCopy = [...blogs];
    blogsCopy[0].likes = 20;
    let mostLIkedAuthor = listHelper.mostLikes(blogsCopy);
    expect(mostLIkedAuthor).toEqual({
      author: 'Michael Chan',
      likes: 20,
    });
  });

  test('when all author has 0 like', () => {
    let blogsCopy = blogs.map((b) => {
      b.likes = 0;
      return b;
    });
    let mostLIkedAuthor = listHelper.mostLikes(blogsCopy);
    expect(mostLIkedAuthor).toEqual({
      author: '',
      likes: 0,
    });
  });
});

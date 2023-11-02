// eslint-disable-next-line no-unused-vars

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favouriteBlog = (blogs) => {
  let likes = 0;
  let mostLikedBlog = null;
  blogs.forEach((blog) => {
    if (blog.likes > likes) {
      likes = blog.likes;
      mostLikedBlog = blog;
    }
  });
  return mostLikedBlog;
};

const mostBlog = (blogs) => {
  const topAuthor = {
    author: '',
    blogs: 0,
  };
  blogs.forEach((blog) => {
    let count = 0;
    const blogsCopy = [...blogs];
    blogsCopy.forEach((b) => {
      if (b.author === blog.author) {
        count += 1;
      }
    });
    if (count > topAuthor.blogs) {
      topAuthor.author = blog.author;
      topAuthor.blogs = count;
    }
  });
  return topAuthor;
};

const mostLikes = (blogs) => {
  console.log(blogs);
  const mostLikedAuthor = {
    author: '',
    likes: 0,
  };
  blogs.forEach((blog) => {
    let countLikes = 0;
    blogs.forEach((b) => {
      if (b.author === blog.author) {
        countLikes += b.likes;
      }
    });
    if (countLikes > mostLikedAuthor.likes) {
      mostLikedAuthor.author = blog.author;
      mostLikedAuthor.likes = countLikes;
    }
  });
  return mostLikedAuthor;
};

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlog,
  mostLikes,
};

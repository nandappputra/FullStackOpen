const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likeSum = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(likeSum, 0);
};

const isEmpty = (obj) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
const favoriteBlog = (blogs) => {
  const findBlogWithMaximumLike = (favoriteBlog, blog) => {
    return isEmpty(favoriteBlog) || favoriteBlog.likes < blog.likes
      ? blog
      : favoriteBlog;
  };

  return blogs.reduce(findBlogWithMaximumLike, {});
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const cache = {};

  const recordToCache = (blog) => {
    if (cache[blog.author] === undefined) {
      cache[blog.author] = 0;
    }

    cache[blog.author] += 1;
  };

  blogs.map(recordToCache);

  let currentMax = 0;
  let currentMaximumBlogAuthor = "";
  const allAuthors = Object.keys(cache);
  allAuthors.map((author) => {
    if (cache[author] > currentMax) {
      currentMax = cache[author];
      currentMaximumBlogAuthor = author;
    }
  });

  return {
    author: currentMaximumBlogAuthor,
    blogs: currentMax,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

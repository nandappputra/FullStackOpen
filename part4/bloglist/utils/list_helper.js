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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

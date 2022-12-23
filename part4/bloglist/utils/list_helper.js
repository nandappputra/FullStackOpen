const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likeSum = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(likeSum, 0);
};

module.exports = {
  dummy,
  totalLikes,
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "MissingURLOrTitle") {
    return response.status(404).json({ error: error.message });
  } else if (error.name === "InvalidUserParameters") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler };

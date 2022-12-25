const errorHandler = (error, request, response, next) => {
  if (error.name === "MissingURLOrTitle") {
    return response.status(404).send({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler };

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "MissingURLOrTitle") {
    return response.status(404).json({ error: error.message });
  } else if (error.name === "InvalidUserParameters") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

module.exports = { tokenExtractor, errorHandler };

const jwt = require("jsonwebtoken");
const { Blog } = require("../models");
const { SECRET } = require("./config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(204).end();
  }
  next();
};

const extractUser = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    req.user = undefined;
    return next();
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, SECRET);
  } catch (error) {
    req.user = undefined;
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.error(error.name);

  if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "AuthenticationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { blogFinder, errorHandler, extractUser };

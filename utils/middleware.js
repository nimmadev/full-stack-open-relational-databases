const jwt = require("jsonwebtoken");
const { Blog } = require("../models");
const { SECRET } = require("./config");
const Session = require("../models/sessions");
const { AuthenticationError } = require("./errors");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(204).end();
  }
  next();
};

const extractUser = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    req.user = undefined;
    return next();
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const userDetails = jwt.verify(token, SECRET);
    const session = await Session.findOne({
      where: {
        userId: userDetails.id,
        token,
      },
    });
    if (!session || session.expiredAt < new Date()) {
      await session.destroy();
      throw new AuthenticationError("token expired");
    }
    userDetails.token = token;
    req.user = userDetails;
  } catch (error) {
    req.user = undefined;
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.error(error.name);

  if (
    error.name === "SequelizeDatabaseError" ||
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "AuthenticationError") {
    return response.status(401).json({ error: error.message });
  }
  next(error);
};

module.exports = { blogFinder, errorHandler, extractUser };

const { Op } = require("sequelize");
const { Blog, User } = require("../models");
const { AuthenticationError } = require("../utils/errors");
const { blogFinder } = require("../utils/middleware");
const blogRouter = require("express").Router();

blogRouter.get("/", async (req, res) => {
  const options = {
    include: {
      model: User,
      attributes: ["id", "name", "username"],
    },
    attributes: {
      exclude: ["userId"],
    },
    order: [["likes", "DESC"]],
  };
  if (req.query.search) {
    options.where = {
      [Op.or]: {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    };
  }
  const blogs = await Blog.findAll(options);
  res.json(blogs);
});

blogRouter.post("/", async (req, res, next) => {
  if (!req.user) throw new AuthenticationError();
  console.log(req.user);

  try {
    const blog = await Blog.create({ ...req.body, userId: req.user.id });
    if (blog) {
      res.json(blog);
    } else {
      res.status(204).end();
    }
  } catch (err) {
    return next(err);
  }
});

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog.userId !== req.user?.id)
    throw new AuthenticationError("invalid user");
  await req.blog.destroy();
  res.status(204).send();
});

blogRouter.put("/:id", blogFinder, async (req, res, next) => {
  const { likes } = req.body;

  req.blog.likes = likes;

  try {
    await req.blog.save();
  } catch (err) {
    return next(err);
  }

  res.json(req.blog);
});

module.exports = blogRouter;

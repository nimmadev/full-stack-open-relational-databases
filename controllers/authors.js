const { Blog } = require("../models");
const { sequelize } = require("../models/blog");

const authorRouter = require("express").Router();

authorRouter.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
  });
  res.json(authors);
});
module.exports = authorRouter;

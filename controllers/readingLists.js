const { ReadingList, Blog, User } = require("../models");
const { AuthenticationError } = require("../utils/errors");

const readingListRouter = require("express").Router();

readingListRouter.post("/", async (req, res) => {
  const { blogId, userId } = req.body;
  if (blogId === undefined || userId === undefined)
    return res.status(400).end();
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).end();
  const blog = await Blog.findByPk(blogId);
  if (!blog) return res.status(404).end();
  const list = await ReadingList.create({ blogId, userId });
  console.log(list);

  res.json(list);
});

readingListRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.user) throw new AuthenticationError();
  const { read } = req.body;
  const list = await ReadingList.findByPk(id);
  if (!list) return res.status(404).end();

  if (list.userId !== req.user.id) throw new AuthenticationError();
  list.read = read;
  await list.save();
  res.json(list);
});
module.exports = readingListRouter;

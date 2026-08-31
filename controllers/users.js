const { User, Blog } = require("../models");

const userRouter = require("express").Router();

userRouter.post("/", async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    const user = await User.create({
      name,
      username,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/", async (req, res) => {
  const users = await User.findAll({ include: { model: Blog } });
  res.json(users);
});

userRouter.put("/:username", async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  const { username: newUsername } = req.body;

  if (user && newUsername) {
    try {
      user.username = newUsername;
      await user.save();
      res.json(user);
    } catch (err) {
      return next(err);
    }
  }
  res.status(400).json({ error: "new username not defiend" });
});

module.exports = userRouter;

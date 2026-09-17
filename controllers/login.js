const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("../utils/config");
const Session = require("../models/sessions");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (user) {
    // verify password
    const userDetails = {
      id: user.id,
      name: user.name,
      username: user.username,
    };
    const token = jwt.sign(userDetails, SECRET);
    await Session.create({
      token,
      userId: user.id,
      expiredAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    res.json({
      token,
      ...userDetails,
    });
  } else {
    res.status(400).json({ error: "user not found" });
  }
});

module.exports = loginRouter;

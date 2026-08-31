const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("../utils/config");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (user) {
    // verify password
    const userDetails = {
      id: user.id,
      name: user.name,
      username: user.username,
    };
    const token = jwt.sign(userDetails, SECRET);
    res.json({
      token,
      user: userDetails,
    });
  } else {
    res.status(400).json({ error: "user not found" });
  }
});

module.exports = loginRouter;

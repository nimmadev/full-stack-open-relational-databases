const Session = require("../models/sessions");
const logoutRouter = require("express").Router();

logoutRouter.delete("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const session = await Session.findOne({
    where: {
      userId: req.user.id,
      token: req.user.token,
    },
  });

  if (!session) {
    return res.status(204).end();
  }

  await session.destroy();

  return res.status(204).end();
});
module.exports = logoutRouter;

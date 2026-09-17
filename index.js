const express = require("express");
const { connectToDb } = require("./utils/db");
const { PORT } = require("./utils/config");
const { errorHandler, extractUser } = require("./utils/middleware");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const { Blog, User, ReadingList } = require("./models");
const readingListRouter = require("./controllers/readingLists");
const logoutRouter = require("./controllers/logout");
const Session = require("./models/sessions");

const app = express();
app.use(express.json());

app.use(extractUser);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);

if (process.env.TESTING) {
  app.use("/api/reset", async (req, res) => {
    await ReadingList.destroy({
      where: {},
    });

    await Session.destroy({
      where: {},
    });

    await Blog.destroy({
      where: {},
    });

    await User.destroy({
      where: {},
    });

    res.status(200).json();
  });

  app.use("/", (req, res) => {
    res.status(200).end();
  });
}

app.use(errorHandler);

const start = async () => {
  await connectToDb();
  app.listen(PORT, (error) => {
    if (error instanceof Error) {
      console.log("app not started", error.message);
    } else {
      console.log("app running on port", PORT);
    }
  });
};

start();

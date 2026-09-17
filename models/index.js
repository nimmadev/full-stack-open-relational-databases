const Blog = require("./blog");
const ReadingList = require("./readingList");
const Session = require("./sessions");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);
User.belongsToMany(Blog, {
  through: ReadingList,
  foreignKey: "userId",
  as: "readings",
});
User.hasMany(ReadingList);
ReadingList.belongsTo(User);
Blog.belongsToMany(User, {
  through: ReadingList,
  foreignKey: "blogId",
  as: "readers",
});
Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);
Session.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Session, {
  foreignKey: "userId",
});
// async function syncDatabase() {
//   await User.sync({ alter: true });
//   await Blog.sync({ alter: true });
// }

// syncDatabase();

// Blog.drop();
// User.drop();
module.exports = { Blog, User, ReadingList };

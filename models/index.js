const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);
async function syncDatabase() {
  await User.sync({ alter: true });
  await Blog.sync({ alter: true });
}

syncDatabase();

// Blog.drop();
// User.drop();
module.exports = { Blog, User };

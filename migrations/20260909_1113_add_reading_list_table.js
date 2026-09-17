const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("reading_lists", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
      },
    });
    await queryInterface.addConstraint("reading_lists", {
      fields: ["user_id", "blog_id"],
      type: "unique",
      name: "reading_lists_user_blog_unique",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint(
      "reading_lists",
      "reading_lists_user_blog_unique",
    );
    await queryInterface.dropTable("reading_lists");
  },
};

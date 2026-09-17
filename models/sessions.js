const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "session",
  },
);

module.exports = Session;

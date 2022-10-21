"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Members.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Members",
    }
  );

  // Members.associate = function (models) {
  //   models.Members.hasMany(models.Posts, {
  //     foreignKey: 'id',
  //     onDelete: 'cascade',
  //   });

  //   models.Members.hasMany(models.Comments, {
  //     foreignKey: 'id',
  //     onDelete: 'cascade',
  //   });

  //   models.Members.hasMany(models.Likes, {
  //     foreignKey: 'id',
  //     onDelete: 'cascade',
  //   });
  // };
  return Members;
};

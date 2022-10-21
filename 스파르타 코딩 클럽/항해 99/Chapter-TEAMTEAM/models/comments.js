"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^[1-2]+$/,
        },
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
      modelName: "Comments",
    }
  );

  // Comments.associate = function (models) {
  //   models.Comments.belongsTo(models.Members, {
  //     onDelete: 'cascade',
  //     forignKey: {
  //       allowNull: true,
  //     }
  //   });
  //   models.Comments.hasMany(models.Comments, {
  //     foreignKey: 'id',
  //     onDelete: 'cascade',
  //   });
  // };
  return Comments;
};

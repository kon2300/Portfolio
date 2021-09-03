'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'user_id',
      })
      Article.belongsToMany(models.User, {
        as: 'like',
        through: models.Like,
        foreignKey: 'article_id',
      })
    }
  }
  Article.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'users',
            key: 'id',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Article',
      underscored: true,
    }
  )
  return Article
}

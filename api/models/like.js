'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User)
      Like.belongsTo(models.Article)
    }
  }
  Like.init(
    {
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
      article_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'articles',
            key: 'id',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Like',
      underscored: true,
    }
  )
  return Like
}

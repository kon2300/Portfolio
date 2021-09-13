'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        as: 'user_profile',
        foreignKey: 'user_id',
      })
      User.hasMany(models.Article, {
        foreignKey: 'user_id',
      })
      User.belongsToMany(models.Article, {
        as: 'like',
        through: models.Like,
        foreignKey: 'user_id',
      })
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  )
  return User
}

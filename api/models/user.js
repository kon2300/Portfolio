'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        as: 'profile',
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
        onDelete: 'cascade',
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['password', 'email', 'email_verified_at', 'updatedAt', 'createdAt'] },
      },
      onDelete: 'CASCADE',
    }
  )
  return User
}

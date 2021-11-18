'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: 'user_id',
      })
    }
  }
  Profile.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      age: DataTypes.STRING,
      annual_income: DataTypes.STRING,
      family_members: DataTypes.STRING,
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
      modelName: 'Profile',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['id', 'updatedAt', 'createdAt'] },
      },
    }
  )
  return Profile
}

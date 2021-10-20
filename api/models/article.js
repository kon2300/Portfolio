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
      name: DataTypes.STRING,
      age: DataTypes.STRING,
      time: DataTypes.JSON,
      annual_income: DataTypes.STRING,
      family_members: DataTypes.STRING,
      rent_expenses: DataTypes.INTEGER,
      food_expenses: DataTypes.INTEGER,
      householeditem_expenses: DataTypes.INTEGER,
      utility_expenses: DataTypes.INTEGER,
      internet_expenses: DataTypes.INTEGER,
      riberalarts_expenses: DataTypes.INTEGER,
      insurance_expenses: DataTypes.INTEGER,
      entertainment_expenses: DataTypes.INTEGER,
      free_expenses: DataTypes.INTEGER,
      comment: DataTypes.STRING,
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
      total_expenses: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.rent_expenses + this.food_expenses + this.householeditem_expenses + this.utility_expenses + this.internet_expenses + this.riberalarts_expenses + this.insurance_expenses + this.entertainment_expenses + this.free_expenses
        },
        set(value) {
          throw new Error('Do not try to set the `total_expenses` value!')
        },
      },
    },
    {
      sequelize,
      modelName: 'Article',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['createdAt'] },
      },
    }
  )
  return Article
}

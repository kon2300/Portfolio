'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      food_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      householeditem_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      internet_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      riberalarts_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      insurance_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      entertainment_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      free_expenses: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles')
  },
}

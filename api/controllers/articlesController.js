const { Op } = require('sequelize')
const { User, Article, Like } = require('../models')

module.exports = {
  postArticle: async (req, res) => {
    await Article.findOrCreate({
      where: {
        user_id: req.body.user_id,
        time: req.body.time,
      },
      defaults: {
        name: req.body.name,
        age: req.body.age,
        time: req.body.time,
        annual_income: req.body.annual_income,
        family_members: req.body.family_members,
        rent_expenses: req.body.rent_expenses,
        food_expenses: req.body.food_expenses,
        householeditem_expenses: req.body.householeditem_expenses,
        utility_expenses: req.body.utility_expenses,
        internet_expenses: req.body.internet_expenses,
        riberalarts_expenses: req.body.riberalarts_expenses,
        insurance_expenses: req.body.insurance_expenses,
        entertainment_expenses: req.body.entertainment_expenses,
        free_expenses: req.body.free_expenses,
        comment: req.body.comment,
        user_id: req.body.user_id,
      },
    })
      .then(([result, created]) => {
        if (created) {
          res.json(result)
        } else {
          res.json({
            error: 'この日付はすでに投稿済みです',
          })
        }
      })
      .catch((error) => {
        res.json({ postArticleError: error })
      })
  },
  editArticle: async (req, res) => {
    try {
      const result = await Article.findByPk(req.params.articleId)
      res.json(result)
    } catch (error) {
      res.json({ editArticleError: error })
    }
  },
  updateArticle: async (req, res) => {
    try {
      const result = await Article.update(
        {
          name: req.body.name,
          age: req.body.age,
          time: req.body.time,
          annual_income: req.body.annual_income,
          family_members: req.body.family_members,
          rent_expenses: req.body.rent_expenses,
          food_expenses: req.body.food_expenses,
          householeditem_expenses: req.body.householeditem_expenses,
          utility_expenses: req.body.utility_expenses,
          internet_expenses: req.body.internet_expenses,
          riberalarts_expenses: req.body.riberalarts_expenses,
          insurance_expenses: req.body.insurance_expenses,
          entertainment_expenses: req.body.entertainment_expenses,
          free_expenses: req.body.free_expenses,
          comment: req.body.comment,
          user_id: req.body.user_id,
        },
        { where: { id: req.params.articleId } }
      )
      res.json(result)
    } catch (error) {
      res.json({ updateArticleError: error })
    }
  },
  showMyArticles: async (req, res) => {
    try {
      const result = await Article.findAll({
        where: { user_id: req.params.userId },
        order: [['updatedAt', 'DESC']],
        attributes: {
          exclude: ['age', 'annual_income', 'family_members', 'id', 'name', 'updatedAt', 'user_id', 'comment'],
        },
      })
      console.log(result)
      res.json(result)
    } catch (error) {
      res.json({ showMyArticlesError: error })
    }
  },
  showMyAllArticles: async (req, res) => {
    try {
      const result = await Article.findAll({
        where: { user_id: req.params.userId },
        include: [
          {
            model: User,
            as: 'like',
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
        ],
        order: [['updatedAt', 'DESC']],
      })
      res.json(result)
    } catch (error) {
      res.json({ showMyAllArticlesError: error })
    }
  },
  showAllArticles: async (req, res) => {
    try {
      const result = await Article.findAll({
        include: [
          {
            model: User,
            as: 'like',
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
        ],
        order: [['updatedAt', 'DESC']],
      })
      res.json(result)
    } catch (error) {
      res.json({ showArticlesError: error })
    }
  },
  searchArticles: async (req, res) => {
    try {
      if (req.body.age && req.body.annual_income) {
        const result = await Article.findAll({
          where: {
            age: req.body.age,
            annual_income: req.body.annual_income,
          },
          include: [
            {
              model: User,
              as: 'like',
              attributes: ['id'],
              through: {
                attributes: [],
              },
            },
          ],
          order: [['updatedAt', 'DESC']],
        })
        res.json(result)
      } else if (req.body.age && req.body.family_members) {
        const result = await Article.findAll({
          where: {
            age: req.body.age,
            family_members: req.body.family_members,
          },
          include: [
            {
              model: User,
              as: 'like',
              attributes: ['id'],
              through: {
                attributes: [],
              },
            },
          ],
          order: [['updatedAt', 'DESC']],
        })
        res.json(result)
      } else if (req.body.age && req.body.annual_income && req.body.family_members) {
        const result = await Article.findAll({
          where: {
            age: req.body.age,
            annual_income: req.body.annual_income,
            family_members: req.body.family_members,
          },
          include: [
            {
              model: User,
              as: 'like',
              attributes: ['id'],
              through: {
                attributes: [],
              },
            },
          ],
          order: [['updatedAt', 'DESC']],
        })
        res.json(result)
      } else {
        const result = await Article.findAll({
          where: {
            [Op.or]: {
              age: req.body.age,
              annual_income: req.body.annual_income,
              family_members: req.body.family_members,
            },
          },
          include: [
            {
              model: User,
              as: 'like',
              attributes: ['id'],
              through: {
                attributes: [],
              },
            },
          ],
          order: [['updatedAt', 'DESC']],
        })
        res.json(result)
      }
    } catch (error) {
      res.json({ searchArticlesError: error })
    }
  },
  removeArticle: async (req, res) => {
    try {
      const result = await Article.destroy({
        where: { id: req.params.articleId },
      })
      res.json(result)
    } catch (error) {
      res.json({ removeArticleError: error })
    }
  },
  likeArticle: async (req, res) => {
    try {
      const result = await Like.findOrCreate({
        where: { article_id: req.params.articleId, user_id: req.params.userId },
        article_id: req.params.articleId,
        user_id: req.params.userId,
      })
      res.json(result)
    } catch (error) {
      res.json({ likeArticleError: error })
    }
  },
  removeLikeArticle: async (req, res) => {
    try {
      const result = await Like.destroy({
        where: { article_id: req.params.articleId, user_id: req.params.userId },
      })
      res.json({ result })
    } catch (error) {
      res.json({ removeLikeArticleError: error })
    }
  },
}

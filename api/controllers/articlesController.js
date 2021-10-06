const { User, Article, Like, Profile } = require('../models')

module.exports = {
  postArticle: async (req, res) => {
    try {
      const result = await Article.create({
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
      })
      res.json(result)
    } catch (error) {
      res.json({ postArticleError: error })
    }
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
        },
        { where: { id: req.params.articleId } }
      )
      res.json(result)
    } catch (error) {
      res.json({ updateArticleError: error })
    }
  },
  showAllArticles: async (req, res) => {
    try {
      const result = await Article.findAll({
        include: {
          all: true,
          nested: true,
        },
        order: [['updatedAt', 'DESC']],
      })
      res.json(result)
    } catch (error) {
      res.json({ showArticlesError: error })
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
      res.json({ success: like })
    } catch (error) {
      res.json({ removeLikeArticleError: error })
    }
  },
}

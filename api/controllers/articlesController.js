const { User, Article, Like } = require('../models')

module.exports = {
  postArticle: async (req, res) => {
    await Article.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    })
      .then((article) => {
        res.json({ article })
      })
      .catch((error) => {
        res.json({ postArticleError: error })
      })
  },
  editArticle: async (req, res) => {
    await Article.findByPk(req.params.articleId)
      .then((article) => {
        res.json({ article })
      })
      .catch((error) => {
        res.json({ editArticleError: error })
      })
  },
  updateArticle: async (req, res) => {
    await Article.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.articleId } }
    )
      .then((article) => {
        res.json({ article })
      })
      .catch((error) => {
        res.json({ updateArticleError: error })
      })
  },
  showArticles: async (req, res) => {
    await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
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
      attributes: ['id', 'title', 'content', 'updatedAt'],
    })
      .then((articles) => {
        res.json({ articles })
      })
      .catch((error) => {
        res.json({ showArticlesError: error })
      })
  },
  removeArticle: async (req, res) => {
    await Article.destroy({ where: { id: req.params.articleId } })
      .then((article) => {
        res.json({ success: article })
      })
      .catch((error) => {
        res.json({ removeArticleError: error })
      })
  },
  likeArticle: async (req, res) => {
    await Like.findOrCreate({
      where: { article_id: req.params.articleId, user_id: req.params.userId },
      article_id: req.params.articleId,
      user_id: req.params.userId,
    })
      .then((like) => {
        res.json({ like })
      })
      .catch((error) => {
        res.json({ likeArticleError: error })
      })
  },
  removeLikeArticle: async (req, res) => {
    await Like.destroy({
      where: { article_id: req.params.articleId, user_id: req.params.userId },
    })
      .then((like) => {
        res.json({ success: like })
      })
      .catch((error) => {
        res.json({ removeLikeArticleError: error })
      })
  },
}

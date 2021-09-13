const express = require('express')
const router = express.Router()
const articlesController = require('../controllers/articlesController')

router.post('/create', articlesController.postArticle)

router.put('/:articleId', articlesController.updateArticle)

router.delete('/:articleId', articlesController.removeArticle)

router.get('/showAllArticles', articlesController.showAllArticles)

router.get('/editArticle/:articleId', articlesController.editArticle)

router.post('/likeArticle/:articleId/:userId', articlesController.likeArticle)

router.delete(
  '/removeLikeArticle/:articleId/:userId',
  articlesController.removeLikeArticle
)

module.exports = router

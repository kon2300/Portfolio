const express = require('express')
const router = express.Router()
const articlesController = require('../controllers/articlesController')

router.post('/create', articlesController.postArticle)

router.put('/:articleId', articlesController.updateArticle)

router.delete('/:articleId', articlesController.removeArticle)

router.get('/showMyArticles/:userId', articlesController.showMyArticles)

router.post('/showMyAllArticles', articlesController.showMyAllArticles)

router.post('/showAllArticles', articlesController.showAllArticles)

router.get('/editArticle/:articleId', articlesController.editArticle)

router.delete('/removeArticle/:articleId', articlesController.removeArticle)

router.post('/likeArticle/:articleId/:userId', articlesController.likeArticle)

router.delete('/removeLikeArticle/:articleId/:userId', articlesController.removeLikeArticle)

module.exports = router

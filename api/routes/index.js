const express = require('express')
const router = express.Router()

router.use('/auth', require('./authRoutes'))
router.use('/articles', require('./articlesRoutes'))
router.use('/profile', require('./profileRoutes'))

module.exports = router

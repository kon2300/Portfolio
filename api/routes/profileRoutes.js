const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.post('/:userId', profileController.createProfile)

router.get('/:userId', profileController.showProfile)

router.put('/:userId', profileController.updateProfile)

router.get('/error', profileController.error)

module.exports = router

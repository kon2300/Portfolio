const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('../utils/auth')

router.post('/signUp', authController.createUser)

router.post(
  '/signIn',
  passport.authenticate('local', {
    passReqToCallback: true,
    failureRedirect: 'error',
  }),
  authController.isAuthenticated
)

router.get('/verify', authController.verifyToken)

router.post('/logout', authController.logout)

router.get('/error', authController.error)

module.exports = router

const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('../utils/auth')

router.post('/signUp', authController.createUser)

router.get('/verifyUser/:id/:hash', authController.verifyUser)

router.post(
  '/signIn',
  passport.authenticate('local', {
    passReqToCallback: true,
    successRedirect: '/auth/isAuthenticated',
    failureRedirect: '/auth/error',
  })
)

router.get('/verify', authController.verifyToken)

router.post('/logout', authController.logout)

router.get('/isAuthenticated', authController.isAuthenticated)

router.get('/error', authController.error)

router.get('/:provider', (req, res, next) => {
  const provider = req.params.provider
  passport.authenticate(provider)(req, res, next)
})

router.get('/:provider/callback', (req, res, next) => {
  const provider = req.params.provider
  passport.authenticate(provider, {
    successRedirect: '/auth/isAuthenticated',
    passReqToCallback: true,
  })(req, res, next)
})

module.exports = router

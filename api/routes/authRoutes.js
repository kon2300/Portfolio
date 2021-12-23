require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('../utils/auth')

router.post('/signUp', authController.createUser)

router.get('/verifyUser/:id/:hash', authController.verifyUser)

router.post('/signIn', passport.authenticate('local', { failureRedirect: '/auth/error' }), (req, res, next) => {
  const userid = req.user.id
  if (req.isAuthenticated()) {
    const jwtToken = jwt.sign(
      {
        userid: userid,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '60m',
      }
    )
    res.json({ jwtToken, userid })
  } else {
    next(authController.error)
  }
})

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

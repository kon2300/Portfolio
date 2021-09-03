const bcrypt = require('bcryptjs')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const JwtStrategy = passportJwt.Strategy
const LocalStrategy = require('passport-local').Strategy
const User = require('../models').User

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      User.findOne({
        where: {
          id: jwtPayload.id,
        },
      })
        .then((user) => {
          return done(null, user)
        })
        .catch((error) => {
          return done(null, false, { message: error })
        })
    }
  )
)

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      await User.findOne({
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user)
          }
          throw new Error()
        })
        .catch((error) => {
          return done(null, false, { message: error })
        })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

module.exports = passport

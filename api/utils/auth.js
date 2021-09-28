require('dotenv').config()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const JwtStrategy = passportJwt.Strategy
const LocalStrategy = require('passport-local').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require('passport-github2').Strategy
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

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      const email = profile.emails[0].value
      const hashedPassword = await bcrypt.hash(token, 10)
      await User.findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          email: email,
          password: hashedPassword,
          email_verified_at: new Date(),
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
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value
      const hashedPassword = await bcrypt.hash(accessToken, 10)
      await User.findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          email: email,
          password: hashedPassword,
          email_verified_at: new Date(),
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
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: 'https://www.googleapis.com/auth/plus.login',
      scope: 'email',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value
      const hashedPassword = await bcrypt.hash(accessToken, 10)
      await User.findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          email: email,
          password: hashedPassword,
          email_verified_at: new Date(),
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

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

module.exports = passport

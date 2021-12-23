require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('./utils/auth')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')
const cors = require('cors')
const router = require('./routes')

const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(expressLayouts)
app.use(cors({ credentials: true, origin: process.env.FRONT_APP_URL, optionsSuccessStatus: 200 }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: 'auto',
    },
    resave: true,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(connectFlash())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

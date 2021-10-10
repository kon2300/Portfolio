require('dotenv').config()
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const transporter = require('../utils/nodemailer')

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        email: req.body.email,
        password: hashedPassword,
      },
    })
      .then(([user, created]) => {
        if (created) {
          const hash = crypto.createHash('sha1').update(user.email).digest('hex')
          const now = new Date()
          const expiration = now.setHours(now.getHours() + 1)
          let verificationUrl = `${process.env.APP_URL}/auth/verifyUser/${user.id}/${hash}?expires=${expiration}`
          const signature = crypto.createHmac('sha256', process.env.APP_KEY).update(verificationUrl).digest('hex')
          verificationUrl += `&signature=${signature}`

          transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            text: `以下のURLをクリックして本登録を完了させてください。\n\n ${verificationUrl}`,
            subject: '本登録メール',
          })
          return res.json({
            result: 'メールを送信しました。本登録を完了させてください。',
          })
        } else {
          res.json({
            error: '入力されたメールアドレスはすでに使用されています。',
          })
        }
      })
      .catch((error) => {
        res.json({ createError: error })
      })
  },
  verifyUser: (req, res) => {
    const userId = req.params.id
    User.unscoped()
      .findByPk(userId)
      .then((user) => {
        if (!user) {
          res.json({ error: 'このURLは正しくありません。' })
        } else if (user.email_verified_at && !Number.isNaN(user.email_verified_at.getTime())) {
          res.json({
            error: 'すでに登録されています。',
          })
        } else {
          const now = new Date()
          const hash = crypto.createHash('sha1').update(user.email).digest('hex')
          const isCorrectHash = hash === req.params.hash
          const isExpired = now.getTime() > parseInt(req.query.expires)
          const verificationUrl = process.env.APP_URL + req.originalUrl.split('&signature=')[0]
          const signature = crypto.createHmac('sha256', process.env.APP_KEY).update(verificationUrl).digest('hex')
          const isCorrectSignature = signature === req.query.signature

          if (!isCorrectHash || !isCorrectSignature || isExpired) {
            res.json({ error: 'このURLはすでに有効期限切れか、正しくありません。' })
          } else {
            user.email_verified_at = new Date()
            user.save()
            const jwtToken = jwt.sign(
              {
                userid: user.id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '60m',
              }
            )
            res.redirect(`http://localhost:8080/user-redirect/${jwtToken}/${user.id}`)
          }
        }
      })
  },
  isAuthenticated: (req, res) => {
    if (req.isAuthenticated()) {
      const jwtToken = jwt.sign(
        {
          userid: req.user[0].id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '60m',
        }
      )
      res.redirect(`http://localhost:8080/user-redirect/${jwtToken}/${req.user[0].id}`)
    } else {
      res.json({ isAuthenticatedError: error })
    }
  },
  verifyToken: async (req, res) => {
    try {
      if (req.headers['authorization']) {
        const bearToken = req.headers['authorization']
        const bearer = bearToken.split(' ')
        const token = bearer[1]
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        res.json({ decoded })
      } else {
        res.json({ tokon: 'false' })
      }
    } catch (error) {
      res.json({ verifyError: error })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.json({ logout: 'OK' })
  },
  error: (req, res) => {
    res.json({ error: '入力に誤りがあります。' })
  },
}

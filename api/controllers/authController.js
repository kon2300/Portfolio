require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = {
  createUser: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    })
      .then(([user, created]) => {
        if (created) {
          const jwtToken = jwt.sign(
            {
              userid: user.id,
              username: user.name,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '60m',
            }
          )
          res.json({ jwtToken: jwtToken, id: user.id })
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
  isAuthenticated: (req, res) => {
    if (req.isAuthenticated()) {
      const jwtToken = jwt.sign(
        {
          userid: req.user.id,
          username: req.user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '60m',
        }
      )
      res.json({ jwtToken: jwtToken, id: req.user.id })
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
        res.json({ tokon: 'faulse' })
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

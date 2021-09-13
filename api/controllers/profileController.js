require('dotenv').config()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { Profile } = require('../models')

module.exports = {
  createProfile: async (req, res) => {
    await Profile.findOrCreate({
      where: {
        [Op.or]: { name: req.body.name, user_id: req.params.userId },
      },
      defaults: {
        name: req.body.name,
        age: req.body.age,
        annual_income: req.body.annual_income,
        family_members: req.body.family_members,
        user_id: req.params.userId,
      },
    })
      .then(([user, created]) => {
        if (created) {
          res.json({ success: user })
        } else {
          res.json({
            error: '入力された名前はすでに使用されています。',
          })
        }
      })
      .catch((error) => {
        res.json({ createError: error })
      })
  },
  showProfile: async (req, res) => {
    try {
      const result = await Profile.findOne({
        where: { user_id: req.params.userId },
        attributes: [
          'name',
          'age',
          'annual_income',
          'family_members',
          'user_id',
        ],
      })
      res.json(result)
    } catch (error) {
      res.json({ showProfileError: error })
    }
  },
  updateProfile: async (req, res) => {
    try {
      const result = await Profile.update(
        {
          age: req.body.age,
          annual_income: req.body.annual_income,
          family_members: req.body.family_members,
        },
        { where: { user_id: req.params.userId } }
      )
      res.json({ result })
    } catch (error) {
      res.json({ updateProfileError: error })
    }
  },
  error: (req, res) => {
    res.json({ error: '入力に誤りがあります。' })
  },
}

const bcrypt = require('bcrypt')
const express = require('express')
const { sign } = require('jsonwebtoken')

const router = express.Router()

const { Users } = require('../models')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash
    })
    
    res.json('Successfully registered')
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await Users.findOne({ where: { username: username } })

  if (!user) res.json({ error: 'User not found' })

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: 'Wrong password' })

    const accessToken = sign(
      { username: user.username, id: user.id }, 
      'importantsecret'
    )

    res.json(accessToken)
  })
})

module.exports = router
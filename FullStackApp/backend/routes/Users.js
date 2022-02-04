const bcrypt = require('bcrypt')
const express = require('express')

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

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: 'Wrong password' })

    res.json('Logged in')
  })
})

module.exports = router
const express = require('express')
const router = express.Router()

const { Likes, Posts } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/', validateToken, async (req, res) => {
  const posts = await Posts.findAll({
    include: [Likes]
  })
  const likedPosts = await Likes.findAll({
    where: {
      UserId: req.user.id
    }
  })
  res.json({
    posts: posts,
    likedPosts: likedPosts
  })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const post = await Posts.findByPk(id)
  res.json(post)
})

router.post('/', async (req, res) => {
  const post = req.body
  await Posts.create(post)
  res.json(post)
})

module.exports = router
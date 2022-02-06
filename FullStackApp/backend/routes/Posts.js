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

router.post('/', validateToken, async (req, res) => {
  const post = req.body
  post.user = user.username
  await Posts.create(post)
  res.json(post)
})

router.delete('/:postId', validateToken, async (req, res) => {
  const postId = req.params.postId
  await Posts.destroy({
    where: {
      id: postId
    }
  })
  res.json('Successfully deleted')
})

module.exports = router
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

router.get('/byPostId/:id', async (req, res) => {
  const id = req.params.id
  const post = await Posts.findByPk(id)
  res.json(post)
})

router.get('/byUserId/:id', async (req, res) => {
  const id = req.params.id
  const posts = await Posts.findAll({
    where: {
      UserId: id
    },
    include: [Likes]
  })
  res.json(posts)
})

router.post('/', validateToken, async (req, res) => {
  const post = req.body
  post.user = req.user.username
  post.userId = req.user.id
  await Posts.create(post)
  res.json(post)
})

router.put('/title', validateToken, async (req, res) => {
  const { newTitle, id } = req.body
  await Posts.update(
    {
      title: newTitle
    },
    {
      where: {
        id: id
      }
    }
  )
  res.json(newTitle)
})

router.put('/text', validateToken, async (req, res) => {
  const { newText, id } = req.body
  await Posts.update(
    {
      text: newText
    },
    {
      where: {
        id: id
      }
    }
  )
  res.json(newText)
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
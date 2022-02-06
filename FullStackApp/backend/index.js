const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

const commentsRouter = require('./routes/Comments')
const likesRouter = require('./routes/Likes')
const postsRouter = require('./routes/Posts')
const usersRouter = require('./routes/Users')

app.use('/comments', commentsRouter)
app.use('/likes', likesRouter)
app.use('/posts', postsRouter)
app.use('/auth', usersRouter)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001')
  })
})
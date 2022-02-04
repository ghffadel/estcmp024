const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

const commentsRouter = require('./routes/Comments')
const postsRouter = require('./routes/Posts')

app.use('/comments', commentsRouter)
app.use('/posts', postsRouter)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001')
  })
})
const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const questionRouter = require('./routers/question')


const app = express()
const port = process.env.PORT || 5000;


app.use(express.json())
app.use(userRouter)
app.use(questionRouter)

app.listen(port, () => {
  console.log('Server is up on port', port)
})
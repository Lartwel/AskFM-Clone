const express = require('express');
require('./db/mongoose');
require('dotenv').config();
const cors = require('cors')
const session = require('express-session')
const userRouter = require('./routers/user')
const questionRouter = require('./routers/question')
const wallRouter = require('./routers/wall')

const app = express()

const {
  NODE_ENV = 'development',
  PORT = 5000,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME
} = process.env


const IN_PROD = NODE_ENV === 'production'


/*
  > middlewares:
*/

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  next()
})


app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret:  SESS_SECRET,
  cookie: {
    maxAge: parseInt(SESS_LIFETIME),
    sameSite: true,
    secure: IN_PROD
  }
}))

app.use(userRouter)
app.use(questionRouter)
// app.use(wallRouter)



app.listen(PORT, () => {
  console.log('Server is up on port', PORT)
})
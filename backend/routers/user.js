const express = require('express')
const User = require('../models/user')
const checkAuth = require('../middleware/checkAuth')

const router = new express.Router()

router.get('/wall', async(req, res) => {
  try{
    if(req.session.email && req.session.userID){
      res.send()
    } else{
      res.status(404).send()
    }
  } catch(e){
    console.log('home route errr', e)
  }
})


//create user
router.post('/users', async(req, res) => {
  try{
    console.log('req', req)
    req.body.username = req.body.username.toLowerCase();
    req.body.email = req.body.email.toLowerCase();
    const user = new User(req.body)
    await user.save()

    //auth session
    req.session.email = user.email;
    req.session.userID = user._id;
    req.session.username = user.username;
    
    res.status(201).send({user})
  } catch(e){
    //checking if the username or email are already taken
    try{
      const user = await User.findByCredentials(req) //find user and authenticate session
      if(user){
        console.log('eeeeeee', Object.keys(e))
        res.status(409).json(e)
      }
    } catch(e){
      console.log('create user', e)
      res.status(409).send(e)
    }
  }
})


//check if user already logged in
router.get('/users/login', checkAuth, async(req, res) => {
  try{
    res.send()
  } catch(e){
    res.status(400).send()
  }
})

//login user
router.post('/users/login', async (req, res) => {
  console.log('logging route')
  try{
    req.body.email = req.body.email.toLowerCase();
    const user = await User.findByCredentials(req) //find user and authenticate session
    return res.send({user})
  } catch(e){
    console.log("logging error", e);
    res.status(400).send()
  }
})

//logout
router.post('/users/logout', async (req, res) => {
  try {
    req.session.email = '';
    req.session.userID = '';
    req.session.username = '';
    res.send("Signed out successfully")
  } catch(e){
    console.log('logout error', e);
    res.status(500).send()
  }
})


//delete users >> delete it in production
router.delete('/users', async(req, res) => {
  try{
    const users = await User.deleteMany()
    res.send()
  } catch(e){
    console.log('del err', e);
    res.status(400).send()
  }
})


//read users >> delete it in production
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users)
  } catch(e){
    console.log('read all users err', e)
    res.status(400).send(e)
  }
})

module.exports = router
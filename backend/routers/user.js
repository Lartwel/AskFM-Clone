const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


//create user
router.post('/users', async(req, res) => {
  try{
    req.body.username = req.body.username.toLowerCase();
    req.body.email = req.body.email.toLowerCase();
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken(); //generates auth token and saves it to user model
    console.log('user token', token)
    res.status(201).send({user, token})
  } catch(e){
    console.log(e)
    res.status(400).send()
  }
})

//login user
router.post('/users/login', async (req, res) => {
  try{
    req.body.email = req.body.email.toLowerCase();
    console.log(req.body)
    const user = await User.findByCredentials(req.body)
    const token = await user.generateAuthToken();
    res.send({user, token})
  } catch(e){
    console.log(e);
    res.status(400).send()
  }
})

//logout
router.post('/users/logout', auth, async (req, res) => {
  try {
    // console.log(req.user);
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token );
    await req.user.save();
    res.send("Signed out successfully")
  } catch(e){
    console.log(e);
    res.status(500).send()
  }
})

//Logout all devices
router.post('/users/logout-all', auth, async (req, res) => {
  try{
    req.user.tokens = [];
    await req.user.save();
    res.send('Signout out from all devices successfully')
  } catch(e) {
    res.status(500).send()
  }
})

//delete users
router.delete('/users', async(req, res) => {
  try{
    const users = await User.deleteMany()
    res.send()
  } catch(e){
    console.log(e);
    res.status(400).send()
  }
})

module.exports = router
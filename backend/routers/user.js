const express = require('express')
const User = require('../models/user')
const checkAuth = require('../middleware/checkAuth')
const chalk = require('chalk');
const log = console.log;

const router = new express.Router()

router.get('/wall', async(req, res) => {
  try{
    if(req.session.email && req.session.userID){
      res.send()
    } else{
      res.status(404).send()
    }
  } catch(e){
    res.status(400).send()
  }
})


//create user
router.post('/users', async(req, res) => {
  try{
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
    console.log('eee', e)
    try{
      const user = await User.findByCredentials(req) //find user and authenticate session
      if(user){
        res.status(409).json(e)
      }
    } catch(e){
      console.log(e)
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
  try{
    req.body.email = req.body.email.toLowerCase();
    const user = await User.findByCredentials(req) //find user and authenticate session
    return res.send({user})
  } catch(e){
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
    res.status(500).send()
  }
})


//delete users >> delete it in production
router.delete('/users', async(req, res) => {
  try{
    const users = await User.deleteMany()
    res.send()
  } catch(e){
    res.status(400).send()
  }
})


//read users >> delete it in production
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users)
  } catch(e){
    res.status(400).send(e)
  }
})

//follow a user
router.post('/users/follow', checkAuth, async(req, res) => {
  try {
    const followerID = req.session.userID;
    const followedUsername = req.body.followedUsername;
    
    const user = await User.findById(followerID);
    const followedUser = await User.findOne({ username: followedUsername });

    if(!followedUser){
      throw new Error('This user is not found')
    }


    user.following.push(followedUser._id);
    followedUser.followers.push(user._id)
    
    user.save();
    followedUser.save()

    log(chalk.bgGreen(user, followedUsername))

    res.send('lolz');
  } catch (e) {
    log(chalk.bgRed('follow route err', e))
    res.status(400).send()
  }
})

//unfollow a user
router.post('/users/unfollow', checkAuth, async(req, res) => {
  try {
    const followerID = req.session.userID;
    const followedUsername = req.body.followedUsername;

    const user = await User.findById(followerID);
    const followedUser = await User.findOne({ username: followedUsername });

    if(!followedUser){
      throw new Error('This user is not found')
    }

    user.following = user.following.filter( id => id.toString() !== followedUser._id.toString() );
    followedUser.followers = followedUser.followers.filter( id => id.toString() !== user._id.toString() )

    user.save();
    followedUser.save()

    res.send();
  } catch (e) {
    log(chalk.bgRed('unfollow route err', e))
    res.status(400).send()
  }
})

module.exports = router
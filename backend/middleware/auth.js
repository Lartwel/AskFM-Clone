const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'askunderground888')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
    if(!user){
      throw new Error(user)
    }
    req.user = user;
    req.token = token;
    next()
  } catch(e) {
    console.log("e", e)
    res.status(401).send('Please Authenticate')
  }
}

module.exports = auth;
const express = require('express')
// const redirectLogin = require('../middleware/redirectLogin')
const router = new express.Router()


router.get('/', async (req, res) => {
  try{
    res.send('wall accessed', req.sessionID);
  } catch(e){
    res.status(400).send()
  }
})

module.exports = router
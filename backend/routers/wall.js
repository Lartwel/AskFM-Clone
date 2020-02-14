const express = require('express')
// const redirectLogin = require('../middleware/redirectLogin')
const router = new express.Router()

console.log('hiiiii')

router.get('/', async (req, res) => {
  console.log('waaaaaaaaaaaal')
  try{
    console.log('sending')
    res.send('wall accessed', req.sessionID);
  } catch(e){
    console.log('going to wall err', e)
    res.status(400).send()
  }
})

module.exports = router
const express = require('express');
const Question = require('../models/question')
const auth = require('../middleware/auth');

const router = new express.Router()

//create question
router.post('/questions/:id', auth, async (req, res) => {
  req.body.questioner = req.user._id;
  req.body.owner = req.params.id;
  try{
    if(req.body.questioner.toString() === req.body.owner){
      throw new Error("user can't ask his/herself")
    }

    const question = new Question(req.body)
    await question.save()
    res.status(201).send(question)
  } catch(e){
    console.log(e)
    res.status(400).send()
  }
})


//delete question
router.delete('/questions/:id', auth, async (req, res) => {
  try{
    const question = await Question.findByIdAndDelete(req.params.id)
    if(!question){
      return res.status(404).send()
    }
    res.status(200).send(question)
  } catch(e){
    console.log(e)
    res.status(400).send()
  }
})


//read questions
router.get('/questions', auth, async(req, res) => {
  try{
    const questions = await Question.find({ owner: req.user._id })
    console.log(questions)
    if(!questions){
      return res.status(404).send()
    }
    res.send(questions)
  } catch(e) {
    console.log(e);
    res.status(400).send()
  }
})

//read a question
router.get('/questions/:id', auth, async(req, res) => {
  try{
    const question = await Question.findOne({_id: req.params.id})
    if(!question){
      return res.status(404).send()
    }
    res.send(question)
  } catch(e) {
    console.log(e);
    res.status(400).send()
  }
})


//delete questions
router.delete('/questions', async (req, res) => {
  try {
    const questions = await Question.deleteMany()
    res.send()
  } catch (e) {
    console.log(e);
    res.status(400).send()
  }
})

module.exports = router;
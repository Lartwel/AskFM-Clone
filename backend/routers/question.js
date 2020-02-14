const express = require('express');
const Question = require('../models/question')
const checkAuth = require('../middleware/checkAuth')

const router = new express.Router()

//create question
router.post('/questions/:username', checkAuth, async (req, res) => {
  req.body.questioner = req.session.username;
  req.body.owner = req.params.username;

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

//read questions
router.get('/questions', checkAuth, async(req, res) => {
  try{
    const owner = req.session.username;
    const questions = await Question.find({ owner })
    if(!questions){
      return res.status(404).send()
    }
    res.send(questions)
  } catch(e) {
    console.log(e);
    res.status(400).send()
  }
})

//read answered questions only
router.get('/questions/answered', checkAuth, async (req, res) => {
  try {
    const questions = await Question.find({ answer: { $ne: '' }})
    console.log(questions)
    res.send(questions);
  } catch(e) {
    res.status(400).send()
  }
})


//read pending questions only
router.get('/questions/pending', checkAuth, async (req, res) => {
  try {
    const questions = await Question.find({ answer: '', owner: req.session.username})
    console.log(questions)
    res.send(questions);
  } catch(e) {
    res.status(400).send()
  }
})

//read a question
router.get('/questions/:id', checkAuth, async(req, res) => {
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


//answer a question
router.post('/questions/:id/answer', checkAuth, async(req, res) => {
  try{
    const question = await Question.findById(req.params.id);
    if(!question){
      res.status(404).send()
    }
    const answer = req.body.answer;
    question.answer = answer;
    question.save();
    res.send("Answer saved successfully")
  } catch(e){
    res.send(400).send()
  }
})


//delete question
router.delete('/questions/:id', checkAuth, async (req, res) => {
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

//delete questions
router.delete('/questions', checkAuth, async (req, res) => {
  try {
    const questions = await Question.deleteMany()
    res.send()
  } catch (e) {
    console.log(e);
    res.status(400).send()
  }
})

module.exports = router;
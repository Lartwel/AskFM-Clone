const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 140,
  },
  answer: {
    type: String,
    trim: true,
  },
  owner: { //user who is asked
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  questioner: {
    type: String, // mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  anonymity: { // to hide the question's questioner identity
    type: Boolean,
    required: true
  },
})


const Question = mongoose.model('Question', questionSchema)

module.exports = Question;
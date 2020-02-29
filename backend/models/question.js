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
    default: '',
    trim: true,
  },
  owner: { //user who is asked
    type: String,
    required: true,
    ref: 'User'
  },
  questioner: {
    type: String,
    required: true,
    ref: 'User'
  },
  anonymity: { // to hide the question's questioner identity
    type: Boolean,
    required: true
  },
})



//hiding sensitive data (questioner) before sending to client-side
questionSchema.methods.toJSON = function(){
  const question = this;
  const questionObject = question.toObject();
  if(question.anonymity === true){
    questionObject.questioner = 'Anonymous';
  }
  return questionObject;
}

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;
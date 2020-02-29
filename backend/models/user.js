const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('The email is invalid!')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    validate(value){
      if(value.toLowerCase().includes('password') || value.toLowerCase().includes('pass')){
        throw new Error('Please, choose a stronger password.')
      }
    }
  },
  followers: [{
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  }],
  following: [{
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  }]
},{
  timestamps: true
})


//refering questions to their owners
userSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'owner'
})

//referring questions to their questioners
userSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'questioner'
})

//to find user by credentials when logging in
userSchema.statics.findByCredentials = async req => {

  const {email, password} = req.body;

  const user = await User.findOne({ email })
  if(!user){
    throw new Error('Unable to login!')
  }
  const isMatch = bcrypt.compare(password, user.password)
  if(!isMatch){
    throw new Error('Unable to login!')
  }
  
  //authenticate user login session
  req.session.email = user.email;
  req.session.userID = user._id;
  req.session.username = user.username;

  return user
}

// to generate auth token and save it to user model's tokens
// userSchema.methods.generateAuthToken = async function () {
//   console.log('authing')
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'askunderground888')
//   console.log('token', token);
//   user.tokens = user.tokens.concat({ token })
//   await user.save();
//   return token;
// }


// hash the plain text password before saving
userSchema.pre('save', async function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


/* 
  hide password and other tokens when sending user date back to client-side.
  we're using toJSON method as it's being fired every time before sneding user date to client-side
*/
userSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}


const User = mongoose.model('User', userSchema)

module.exports = User;
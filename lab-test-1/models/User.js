const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  firstname: {
    type: String,
    required: [true, 'First name is required']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  createon: {
    type: Date,
    required: [true, 'Creation date is required'],
    default: Date.now
  }
});


const User = mongoose.model("User", UserSchema);
module.exports = User;
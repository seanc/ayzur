const mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    trim: true
  },
  password: String,
  mcUsername: {
    type: String,
    trim: true
  },
  mcVerified: Boolean,
  admin: Boolean
});

module.exports = User;

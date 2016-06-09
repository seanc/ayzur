const mongoose = require('mongoose');

exports = mongoose.model('User', {
  email: {
    type: String,
    trim: true
  },
  password: String,
  mcUsername: {
    type: String,
    trim: true
  },
  mcVerified: Boolean
});

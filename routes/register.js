const User = require('../models/User');
const bcrypt = require('co-bcrypt');
const validator = require('validator');

function * register() {
  var body = this.request.body;

  if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password')) {
    this.body = {
      ok: false,
      data: 'Email and password are required'
    };
    return;
  }

  var email = body.email;
  var password = body.password;

  if (!validator.isEmail(email)) {
    this.body = {
      ok: false,
      data: 'Email is not valid'
    };
    return;
  }

  var query = yield User.find({email: email}).exec();

  if (query.length) {
    this.body = {
      ok: false,
      data: 'Email is already in use'
    };
    return;
  }

  var salt = yield bcrypt.genSalt(10);
  var hash = yield bcrypt.hash(password, salt);

  var user = new User({
    email: email,
    password: hash,
    mcVerified: false
  });

  yield user.save(function(err) {
    if (err) {
      this.status = 500;
      this.body = {
        ok: false,
        data: 'An error occurred, please submit a ticket'
      };
      return;
    }

    this.body = {
      ok: true,
      data: 'Registration complete'
    };
  }.bind(this));
}

register.method = 'POST';
register.path = '/api/register';

module.exports = register;

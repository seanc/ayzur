var validator = require('validator');
var User = require('../../models/User');
var bcrypt = require('co-bcrypt');

function* login() {
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

  var query = yield User.findOne({email: email}).exec();

  if (!query) {
    this.status = 403;
    this.body = {
      ok: false,
      data: 'Incorrect email or password'
    };
    return;
  }

  var check = yield bcrypt.compare(password, query.password);

  if (check) {
    /* eslint-disable camelcase */
    var username = (query.hasOwnProperty('username') ? query.username : '');
    this.cookies.set('user.email', query.email);
    this.cookies.set('user.username', username);
    this.cookies.set('user.auth_token', 'foobarbazqux');
    this.body = {
      ok: true,
      data: {
        auth_token: 'foobarbazqux',
        email: query.email,
        username: (query.hasOwnProperty('username') ? query.username : '')
      }
    };
    return;
    /* eslint-enable camcelcase */
  }

  this.status = 403;
  this.body = {
    ok: false,
    data: 'Incorrect email or password'
  };
}

login.method = 'POST';
login.path = '/api/login';

module.exports = login;

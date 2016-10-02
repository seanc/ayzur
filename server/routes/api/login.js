var User = require('../../models/User');
var bcrypt = require('co-bcrypt');

function* login() {
  var body = this.request.body;

  console.log(body);

  if (!body.hasOwnProperty('emailOrUsername') ||
      !body.hasOwnProperty('password')) {
    this.status = 403;
    this.body = {
      ok: false,
      data: 'Incorrect username or password'
    };
    return;
  }

  var emailOrUsername = body.emailOrUsername;
  var password = body.password;

  var query = yield User.findOne({
    $or: [
      {username: emailOrUsername},
      {email: emailOrUsername}
    ]
  }).exec();

  if (!query) {
    this.status = 403;
    this.body = {
      ok: false,
      data: 'Incorrect username or password'
    };
    return;
  }

  var check = yield bcrypt.compare(password, query.password);

  if (check) {
    /* eslint-disable camelcase */
    this.session.user = {
      email: query.email,
      username: (query.hasOwnProperty('username') ? query.username : '')
    };
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
    data: 'Incorrect username or password'
  };
}

login.method = 'POST';
login.path = '/api/login';

module.exports = login;

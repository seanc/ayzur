function* login() {
  yield this.render('login');
}

login.method = 'GET';
login.path = '/login';

module.exports = login;

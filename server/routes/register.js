function* register() {
  yield this.render('register');
}

register.method = 'GET';
register.path = '/register';

module.exports = register;

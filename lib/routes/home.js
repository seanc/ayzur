function * home() {
  this.body = 'Foobar';
}

home.method = 'GET';
home.path = ['/', '/home'];

module.exports = home;

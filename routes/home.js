function * home() {
  this.body = 'Hello World';
}

home.method = 'GET';
home.path = '/';

module.exports = home;

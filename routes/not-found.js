function * notFound() {
  this.body = '404';
}

notFound.method = 'GET';
notFound.path = '/404';

module.exports = notFound;

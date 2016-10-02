module.exports = function* database(next) {
  if (!this.ready) {
    this.throw(504);
  } else if (this.ready === 'error') {
    this.throw(500);
  } else {
    yield next;
  }
};

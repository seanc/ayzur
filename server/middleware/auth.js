function* auth(next) {
  if (!this.session.user) {
    return this.redirect('/login');
  }

  yield next;
}

module.exports = auth;

var cookie = require('mmm-cookies');

module.exports = {
  user: {
    username: cookie.get('user.username'),
    email: cookie.get('user.email')
  },
  getUsername: function() {
    return this.user.username;
  },
  getEmail: function() {
    return this.user.email;
  }
};

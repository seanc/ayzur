var router = require('vue-router');

/* global localStorage */
module.exports = {
  user: {
    authenticated: false
  },
  login: function(context, details, redirect) {
    context.$http.post('/api/login', details, function(res) {
      localStorage.setItem('auth_token', res.auth_token);

      this.user.authenticated = true;

      if (redirect) {
        router.go(redirect);
      }
    }).catch(function(err) {
      context.error = err;
    });
  },
  register: function(context, details, redirect) {
    context.$http.post('/api/register', details, function(res) {
      localStorage.setItem('auth_token', res.auth_token);

      this.user.authenticated = true;

      if (redirect) {
        router.go(redirect);
      }
    }).catch(function(err) {
      context.err = err;
    });
  },
  logout: function() {
    localStorage.removeItem('auth_token');
    this.user.authenticated = false;
  },
  check: function() {
    var authToken = localStorage.getItem('auth_token');

    this.user.authenticated = (authToken);
  }
};

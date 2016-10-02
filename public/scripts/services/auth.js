/* global localStorage */
var cookie = require('mmm-cookies');

module.exports = {
  user: {
    authenticated: false
  },
  login: function(context, details) {
    var _this = this;

    return new Promise(function(resolve, reject) {
      context.$http.post('/api/login', details)
      .then(function(res) {
        _this.user.authenticated = true;

        resolve(res);
      })
      .catch(function(err) {
        reject(err);
      });
    });
  },
  register: function(context, details) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      context.$http.post('/api/register', details)
      .then(function(res) {
        if (res.data.ok) {
          _this.user.authenticated = true;
        }
        resolve(res);
      })
      .catch(function(err) {
        reject(err);
      });
    });
  },
  logout: function(cb) {
    localStorage.removeItem('auth_token');
    this.user.authenticated = false;
    cb();
  },
  check: function() {
    if (cookie.get('user.auth_token')) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }

    return this.user.authenticated;
  }
};

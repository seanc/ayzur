var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var VueValidator = require('vue-validator');

var validator = require('validator');
var auth = require('./services/auth');
var cookie = require('mmm-cookies');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueValidator);

Vue.component('navbar', require('./components/navbar.vue'));

Vue.validator('email', function(val) {
  return validator.isEmail(val);
});

var App = Vue.extend({
  data: function() {
    return {
      loggedIn: false,
      email: cookie.get('user.email'),
      username: cookie.get('user.username')
    };
  },
  ready: function() {
    this.$root.data = this.$data;
    this.$data.loggedIn = auth.check();

    console.log(cookie.get('user.email'));
  }
});
var Router = new VueRouter({linkActiveClass: 'active'});

Router.map({
  '/': {
    component: require('./pages/home.vue')
  },
  '/sign-in': {
    component: require('./pages/sign-in.vue')
  },
  '/sign-up': {
    component: require('./pages/sign-up.vue')
  },
  '/support': {
    component: require('./pages/support.vue'),
    auth: true
  },
  '/admin': {
    component: require('./pages/admin/admin.vue'),
    auth: false,
    subRoutes: {
      '/settings': {
        component: require('./pages/admin/settings.vue')
      }
    }
  },
  '*': {
    component: require('./pages/not-found.vue')
  }
});

// Check for authentication here, this will be added later on
Router.beforeEach(function(route) {
  if (route.to.auth && auth.check()) {
    return route.redirect('/sign-in');
  }
  route.next();
});

/* global document */
document.addEventListener('DOMContentLoaded', function() {
  Router.start(App, '#app');
});

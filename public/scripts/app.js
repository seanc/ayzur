var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var VueValidator = require('vue-validator');

var validator = require('validator');
var auth = require('./services/auth');

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
      email: '',
      username: ''
    };
  },
  ready: function() {
    this.$data.loggedIn = auth.check();
    this.$root.data = this.$data;
  }
});
var Router = new VueRouter();

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

var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var VueValidator = require('vue-validator');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueValidator);

Vue.component('navbar', require('./components/navbar.vue'));

/* eslint-disable no-useless-escape, max-len */
Vue.validator('email', function(val) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
});
/* eslint-enable no-useless-escape, max-len */

var App = Vue.extend({
  data: function() {
    return {
      loggedIn: false
    };
  },
  ready: function() {
    this.$root.data = this.data;
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
  if (route.to.auth) {
    return route.redirect('/auth/sign-in');
  }
  route.next();
});

/* global document */
document.addEventListener('DOMContentLoaded', function() {
  Router.start(App, '#app');
});

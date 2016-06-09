var Vue = require('vue');
var VueResource = require('vue-resource');
var VueRouter = require('vue-router');

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.component('navbar', require('./components/navbar.vue'));

var App = Vue.extend({
  http: {
    root: '/api'
  },
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

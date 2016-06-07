var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

Vue.component('navbar', require('./components/navbar.vue'));

var App = Vue.extend({});
var Router = new VueRouter();

Router.map({
  '/': {
    component: require('./pages/home.vue')
  }
});

/* global document */
document.addEventListener('DOMContentLoaded', function() {
  Router.start(App, '#app');
});

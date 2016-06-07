var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

Vue.component('navbar', require('./components/navbar.vue'));

var Home = require('./pages/home.vue');

var App = Vue.extend({});
var Router = new VueRouter();

Router.map({
  '/': {
    component: Home
  }
});

/* global document */
document.addEventListener('DOMContentLoaded', function() {
  Router.start(App, '#app');
});

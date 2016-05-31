var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var Hello = require('./components/hello.vue');

var App = Vue.extend({});
var Router = new VueRouter();

Router.map({
  '/': {
    component: Hello
  }
});

/* global document */
document.addEventListener('DOMContentLoaded', function() {
  Router.start(App, '#app');
});

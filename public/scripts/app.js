var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var hello = Vue.component('hello', {
  template: 'hello <a v-link="{path: \'/foo\'}">world</a>'
});

var world = Vue.component('world', {
  template: 'world <a v-link="{path: \'/\'}">hello</a>'
});

var App = Vue.extend({});
var router = new VueRouter();

router.map({
  '/': {
    component: hello
  },
  '/foo': {
    component: world
  }
});

/* global document */
document.addEventListener('DOMContentLoaded', function() {
  router.start(App, '#app');
});

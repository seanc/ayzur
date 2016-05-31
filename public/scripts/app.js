import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Hello = Vue.component('hello', {
  template: `hello <a v-link="{path: '/foo'}">world</a>`
});

const World = Vue.component('world', {
  template: `world <a v-link="{path: '/'}">hello</a>`
});

const App = Vue.extend({});
const Router = new VueRouter();

Router.map({
  '/': {
    component: Hello
  },
  '/foo': {
    component: World
  }
});

/* global document */
document.addEventListener('DOMContentLoaded', () => Router.start(App, '#app'));

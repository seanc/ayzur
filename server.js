const koa = require('koa');
const app = koa();
const session = require('koa-session');
const parser = require('koa-bodyparser');
const mongoose = require('mongoose');
const opts = require('minimist')(process.argv.slice(2), {
  default: {
    port: 8080,
    host: 'localhost'
  }
});
const Promise = require('bluebird');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/ayzur');

var router = require('koa-router')();
var routes = require('./routes');
for (var name in routes) {
  var route = routes[name];
  router[route.method.toLowerCase() || 'get'](route.path, route);
}

app.keys = ['changeme123'];

app.use(session(app));
app.use(parser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routes.app);

app.listen(opts.port, opts.host, function() {
  console.log(`Listening on ${opts.host}:${opts.port}`);
});

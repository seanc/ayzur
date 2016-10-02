const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-bodyparser');
const opts = require('./config');
const routes = require('./routes');
const mongoose = require('mongoose');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');
const session = require('koa-session');
const csrf = require('koa-csrf');

Object.assign(app.context, {
  opts: opts,
  db: mongoose,
  ready: false,
  render: nunjucks({
    ext: 'html', 
    path: path.join(__dirname, './views')
  })
});

for (var name in routes) {
  var route = routes[name];
  var middleware = (route.middleware || null);
  if (middleware) {
    router[route.method.toLowerCase() || 'get'](route.path, route, middleware);
  } else {
    router[route.method.toLowerCase() || 'get'](route.path, route);
  }
}

app.keys = ['changeme123'];

app.use(require('./database'));
app.use(parser());
app.use(require('koa-static-namespace')(path.join(__dirname, '../public'), {
  namespace: '/static'
}));
app.use(session(app));
app.use(csrf());
app.use(function* (next) {
  this.state.user = yield this.session.user;
  this.state.csrf = this.csrf;
  yield next;
});
app.use(router.routes());
app.use(router.allowedMethods());

mongoose.connect('mongodb://' + opts.mongodb);
var connection = mongoose.connection;

connection.once('open', function() {
  app.context.ready = true;
});

connection.on('error', function(err) {
  app.context.ready = 'error';
  console.error(err);
});

app.listen(opts.port, opts.host, function listen() {
  console.log(`Listening on ${opts.host}:${opts.port}`);
});

module.exports = app;

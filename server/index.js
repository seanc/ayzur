const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const opts = require('./config');
const routes = require('./routes');
const mongoose = require('mongoose');

Object.assign(app.context, {
  opts: opts,
  db: mongoose,
  ready: false
});

for (const name in routes) {
  var route = routes[name];
  router[route.method.toLowerCase() || 'get'](route.path, route);
}

app.use(require('./database'));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routes.app);

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

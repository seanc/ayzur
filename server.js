const koa = require('koa');
const app = koa();
const opts = require('minimist')(process.argv.slice(2), {
  default: {
    port: 8080,
    host: 'localhost'
  }
});

var router = require('koa-router')();
var routes = require('./routes');
for (const name in routes) {
  var route = routes[name];
  router[route.method.toLowerCase() || 'get'](route.path, route);
}

app.use(router.routes());
app.use(router.allowedMethods());
app.use(routes.app);

app.listen(opts.port, opts.host, function() {
  console.log(`Listening on ${opts.host}:${opts.port}`);
});

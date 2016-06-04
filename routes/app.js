var path = require('path');

var app = require('koa-static')(path.join(__dirname, '../public'));
app.method = 'GET';
app.path = '/';

module.exports = app;

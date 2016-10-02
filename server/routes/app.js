function* app() {
  yield this.render('index');
}

app.method = 'GET';
app.path = '/';

module.exports = app;

var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var vueify = require('vueify');

gulp.task('javascript', function() {
  browserify('public/scripts/app.js')
  .transform(vueify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('public/scripts/dist'))
  .pipe(rename('app.min.js'))
  .pipe(streamify(uglify({mangle: false})))
  .pipe(gulp.dest('public/scripts/dist'));
});

gulp.task('sass', function() {
  gulp.src('public/styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(auto({
    browsers: 'last 3 versions'
  }))
  .pipe(gulp.dest('public/styles'));
});

gulp.task('build', ['javascript', 'sass']);
gulp.task('watch', function() {
  gulp.watch(['public/scripts/**/*.js', '!public/scripts/dist'], ['javascript']);
  gulp.watch('public/styles/**/*.scss', ['sass']);
});

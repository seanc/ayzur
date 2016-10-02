var gulp = require('gulp');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src('public/styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(auto({
    browsers: 'last 3 versions'
  }))
  .pipe(gulp.dest('public/styles'));
});

gulp.task('build', ['sass']);
gulp.task('watch', function() {
  gulp.watch('public/styles/**/*.scss', ['sass']);
});

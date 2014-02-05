var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.run('lint', 'js');

  gulp.watch('src/js/**/*.js', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('lint', 'js');
  });
});

gulp.task('lint', function () {
  gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
    .pipe(concat('angular-breadcrumbs.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('angular-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist/js'));
});
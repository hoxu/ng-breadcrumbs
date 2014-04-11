var path = require('path'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    karma = require('gulp-karma'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.run('uglify-js', 'lint');

  gulp.watch('src/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('uglify-js');
  });

  gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('debug', function() {
  gulp.run('copy-js', 'lint');

  gulp.watch('src/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('copy-js');
  });

  gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('uglify-js', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-js', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  gulp.run('uglify-js');

  // undefined.js: unfortunately necessary for now
  return gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});
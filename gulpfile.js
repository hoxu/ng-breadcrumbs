var path = require('path'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    webdriverUpdate = require("gulp-protractor").webdriver_update,
    protractor = require("gulp-protractor").protractor,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    debug = false,
    WATCH_MODE = 'watch',
    RUN_MODE = 'run';

var mode = WATCH_MODE;

function changeNotification(event) {
  console.log('File', event.path, 'was', event.type, ', running tasks...');
}

gulp.task('uglify-js', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('copy-js', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('lint', function () {
  gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('karma', function() {
  // undefined.js: unfortunately necessary for now
  gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: mode
    }))
    .on('error', function() {});
});

gulp.task('protractor', ['webdriver-update'], function(callback) {
  gulp.src(["./src/tests/*.js"])
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:8080']
    }))
    .on('end', function() {
      callback();
    })
    .on('error', function(err) {
      callback(err);
    });
});

gulp.task('webdriver-update', webdriverUpdate);

function build() {
  var jsTask = debug ? 'copy-js' : 'uglify-js';

  var jsWatcher = gulp.watch('src/js/**/*.js', [jsTask, 'karma', 'protractor']),
      testWatcher = gulp.watch('test/**/*.js', ['karma', 'protractor']);

  jsWatcher.on('change', changeNotification);
  testWatcher.on('change', changeNotification);
}

gulp.task('default', ['uglify-js', 'lint', 'karma', 'protractor'], build);

gulp.task('debug', ['debug-mode', 'copy-js', 'lint', 'karma', 'protractor'], build);

gulp.task('connect', function() {
  gulp.watch(['public/**/*', 'index.html'], function() {
    gulp.src(['public/**/*', 'index.html'])
      .pipe(connect.reload());
  });

  connect.server({
    livereload: true
  });
});

gulp.task('server', ['connect', 'default']);

gulp.task('kill-connect', ['protractor'], function() {
  connect.serverClose();
});

gulp.task('run-mode', function() {
  mode = RUN_MODE;
});

gulp.task('debug-mode', function() {
  debug = true;
});

gulp.task('test', ['run-mode', 'connect', 'uglify-js', 'karma', 'protractor', 'kill-connect']);
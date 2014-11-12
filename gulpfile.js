var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    protractor = require("gulp-protractor").protractor,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    program = require('commander'),
    stylish = require('jshint-stylish'),
    debug = false,
    WATCH_MODE = 'watch',
    RUN_MODE = 'run';

var mode = RUN_MODE;

function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .option('-t, --tests [glob]', 'Specify which tests to run')
  .option('-b, --browsers <items>', 'Specify which browsers to run on', list)
  .option('-r, --reporters <items>', 'Specify which reporters to use', list)
  .parse(process.argv);

gulp.task('js', function() {
  var jsTask = gulp.src('src/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist'));
  if (!debug) {
    jsTask.pipe(uglify());
  }
  jsTask
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('connect', function() {
  if (mode === WATCH_MODE) {
    gulp.watch(['public/**/*', 'index.html'], function() {
      gulp.src(['public/**/*', 'index.html'])
        .pipe(connect.reload());
    });
  }

  connect.server({
    livereload: mode === WATCH_MODE
  });
});

gulp.task('karma', ['js'], function() {
  // undefined.js: unfortunately necessary for now
  gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: mode,
      tests: program.tests,
      reporters: program.reporters || ['progress'],
      browsers: program.browsers || ['PhantomJS']
    }))
    .on('error', function() {});
});

gulp.task('protractor', function(done) {
  gulp.src(["./src/tests/*.js"])
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: [
        '--baseUrl', 'http://127.0.0.1:8080',
        '--browser', program.browsers ? program.browsers[0] : 'phantomjs'
      ]
    }))
    .on('end', function() {
      if (mode === RUN_MODE) {
        connect.serverClose();
      }
      done();
    })
    .on('error', function() {
      if (mode === RUN_MODE) {
        connect.serverClose();
      }
      done();
    });
});

gulp.task('debug', function() {
  debug = true;
});

gulp.task('watch-mode', function() {
  mode = WATCH_MODE;

  var jsWatcher = gulp.watch(['src/**/*.js'], ['js']),
      jshintWatcher = gulp.watch(['src/**/*.js', 'test/**/*.js'], ['lint']),
      karmaWatcher = gulp.watch('test/unit/**/*.js', ['karma']),
      protractorWatcher = gulp.watch('test/ui/**/*.js', ['protractor']);

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  }

  jsWatcher.on('change', changeNotification);
  jshintWatcher.on('change', changeNotification);
  karmaWatcher.on('change', changeNotification);
  protractorWatcher.on('change', changeNotification);
});

gulp.task('all', ['js', 'lint', 'karma', 'protractor']);
gulp.task('default', ['watch-mode', 'all']);
gulp.task('server', ['connect', 'default']);
gulp.task('test', ['connect', 'all']);
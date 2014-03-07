var path = require('path'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    htmlmin = require('gulp-htmlmin'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('default', function(){
  gulp.run('uglify-js', 'less', 'minify-template', 'lint');

  gulp.watch('src/js/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('uglify-js');
  });

  gulp.watch('src/less/**/*.less', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('less');
  });

  gulp.watch('src/template/**/*.html', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('minify-template');
  });
});

gulp.task('debug', function(){
  gulp.run('copy-js', 'less', 'copy-template', 'lint');

  gulp.watch('src/js/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('copy-js');
  });

  gulp.watch('src/less/**/*.less', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('less');
  });

  gulp.watch('src/js/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('copy-template');
  });
});

gulp.task('uglify-js', function () {
  gulp.src('src/js/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(concat('ng-breadcrumbs.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('ng-breadcrumbs.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-template', function() {
  gulp.src('src/template/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/template'))
});

gulp.task('copy-template', function() {
  gulp.src('src/template/**/*.html')
    .pipe(gulp.dest('public/template'))
});

gulp.task('less', function () {
  gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'public/less', 'includes') ]
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('lint', function () {
  gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
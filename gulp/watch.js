'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('copy-json', function() {
  gulp.src(path.join(conf.paths.src, '/app/**/*.json'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

gulp.task('copy-conf', function() {
  gulp.src(path.join(conf.paths.src, '/index.config.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));

});

gulp.task('watch', ['inject', 'copy-json', 'copy-conf'], function () {

  gulp.watch(path.join(conf.paths.src, '/index.config.js'), function (event) {
    if (isOnlyChange(event)) {
      gulp.start('config-reload');
    }
  });

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  gulp.watch(path.join(conf.paths.src, '/app/**/*.css'), function (event) {
    if (isOnlyChange(event)) {
      browserSync.reload(event.path);
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function (event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });


  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function (event) {
    browserSync.reload(event.path);
  });

});

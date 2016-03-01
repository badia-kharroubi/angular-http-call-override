'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function () {
  return buildScripts()
    .pipe(browserSync.stream());
});
gulp.task('config-reload', function () {
  return gulp.src(path.join(conf.paths.src, '/index.config.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size())
};

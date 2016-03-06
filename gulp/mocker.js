'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var exec = require('child_process').exec;

gulp.task('mocker', ['mocker-origin', 'mocker-target']);

gulp.task('mocker-origin', function (cb) {
  var mockerPath = path.join(conf.paths.mocker,'/origin');
  var cmd = 'cd ' + mockerPath + ' && apimocker -c config.json';
  exec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
gulp.task('mocker-target', function (cb) {
  var mockerPath = path.join(conf.paths.mocker,'/target');
  var cmd = 'cd ' + mockerPath + ' && apimocker -c config.json';
  exec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

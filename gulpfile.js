/* eslint-disable no-undef */
/* eslint-disable strict */

'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('js', function () {
  return gulp.src('js/*.js')
     .pipe(jshint())
     .pipe(jshint.reporter('default'))
     .pipe(uglify())
     .pipe(concat('app.js'))
     .pipe(gulp.dest('build'));
});

gulp.task('minify', function () {
  gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'js/*.js'
  ], {
    base: 'js'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series(
    'clean',
    'copy',
    'js',
    'minify'
));

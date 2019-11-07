/*global require */

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const ngHtml2Js = require("gulp-ng-html2js");

const scripts = () => 
  src(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./app.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(dest('app_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('app_client'));

const watchers = () => {
  watch(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'], scripts);
}
watchers.displayName = 'watch';

gulp.task('default', ['scripts', 'watch']);

exports.scripts = scripts;
exports.watch = watchers;
exports.default = series(scripts, watchers);
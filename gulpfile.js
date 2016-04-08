/*global require */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    ngHtml2Js = require("gulp-ng-html2js");

gulp.task('scripts', function () {
    'use strict';

    gulp.src(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('./app.min.js'))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('app_client'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app_client'));
});

gulp.task('watch', function () {
    'use strict';

    watch(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'], function () {
        gulp.start('scripts');
    });
});

gulp.task('default', ['scripts', 'watch']);
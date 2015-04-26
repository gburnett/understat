var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    jasmine = require('gulp-jasmine'),
    babel = require('gulp-babel'),
    rimraf = require('gulp-rimraf');

gulp.task('rimraf', function () {
    gulp.src('./node/*.js')
        .pipe(rimraf({ read: false }));
});

gulp.task('build', function() {
    gulp.src('app/*.js')
	.pipe(babel())
	.pipe(rename('understat.js'))
	.pipe(gulp.dest('node'));
});

gulp.task('lint', function() {
    gulp.src('app/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
    gulp.src(['./index.js','./test/tests.js'])
	.pipe(jasmine());
});

gulp.task('prepublish', ['rimraf', 'lint', 'build', 'test']);

gulp.task('watch', function () {
    var watch = require('gulp-watch');
    watch(['./index.js', './app/*.js'], function () {
        gulp.start('prepublish');
    });
});

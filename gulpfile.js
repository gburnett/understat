var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    jasmine = require('gulp-jasmine');

gulp.task('compress', function() {
    gulp.src('app/*.js')
	.pipe(uglify())
	.pipe(rename('understat.min.js'))
	.pipe(gulp.dest('dist'));
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

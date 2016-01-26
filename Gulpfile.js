var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function(){
  return browserify('./js/app.js')
    .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function(){
  gulp.watch('**/*.js', ['browserify']);
});

var gulp    = require('gulp');
var plumber = require('gulp-plumber'); // used for error catching during watch
var sass    = require("gulp-sass");
var coffee  = require('gulp-coffee');

var paths = {
  styles:  ['scss/*.scss'],
  scripts: ['js/*.coffee']
};

gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('css'));
});

gulp.task('coffee', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('js'));
});

// Rerun the task when a file changes
gulp.task('watch', function(){
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.scripts, ['coffee']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'coffee']);

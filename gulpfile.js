var gulp    = require('gulp');
var plumber = require('gulp-plumber'); // used for error catching during watch
var sass    = require("gulp-sass");
var coffee  = require('gulp-coffee');

var sourcePaths = {
  styles:  ['scss/*.scss'],
  scripts: ['js/*.coffee']
};

var distPaths = {
  styles:  'css',
  scripts: 'js'
};

gulp.task('sass', function () {
  gulp.src(sourcePaths.styles)
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest(distPaths.styles));
});

gulp.task('coffee', function () {
  gulp.src(sourcePaths.scripts)
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest(distPaths.scripts));
});

// Rerun the task when a file changes
gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['sass']);
  gulp.watch(sourcePaths.scripts, ['coffee']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'coffee']);

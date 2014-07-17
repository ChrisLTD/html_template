var gulp   = require('gulp');
var sass   = require("gulp-sass");
var coffee = require('gulp-coffee');

var paths = {
  styles:  ['scss/*.scss'],
  scripts: ['js/*.coffee']
};

gulp.task('sass', function () {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('coffee', function () {
  return gulp.src(paths.scripts)
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

const gulp      = require('gulp');
const plumber   = require('gulp-plumber'); // used for error catching during watch
const sass      = require("gulp-sass");
const babel     = require('gulp-babel');
const swig      = require('gulp-swig');
const webserver = require('gulp-webserver');
const opn       = require('opn'); // for opening the browser

const sourcePaths = {
  styles:    ['./scss/*.scss'],
  scripts:   ['./js/*.js'],
  images:    ['./img/**/*'],
  templates: ['./templates/**/*.html'],
  raw:       ['./raw/**/*']
};

const distPaths = {
  styles:    './dist/css',
  scripts:   './dist/js',
  images:    './dist/img',
  templates: './dist',
  raw:       './dist',
};

const server = {
  host: 'localhost',
  port: '8001'
};

gulp.task('styles', function () {
  return gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('scripts', function () {
  return gulp.src( sourcePaths.scripts )
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest( distPaths.scripts ));
});

gulp.task('images', function () {
  return gulp.src( sourcePaths.images )
    .pipe(gulp.dest( distPaths.images ));
});

gulp.task('raw', function () {
  return gulp.src(sourcePaths.raw)
    .pipe(gulp.dest( distPaths.raw ));
});

gulp.task('templates', function() {
  return gulp.src( sourcePaths.templates )
    .pipe(plumber())
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest( distPaths.templates ));
});

gulp.task('webserver', function() {
  return gulp.src( distPaths.templates )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  return opn( 'http://' + server.host + ':' + server.port );
});

// Rerun the task when a file changes
gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['styles']);
  gulp.watch(sourcePaths.scripts, ['scripts']);
  gulp.watch(sourcePaths.images, ['images']);
  gulp.watch(sourcePaths.templates, ['templates']);
  gulp.watch(sourcePaths.raw, ['raw']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'templates', 'raw']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'watch', 'webserver', 'openbrowser']);

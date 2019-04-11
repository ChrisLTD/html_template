const gulp       = require('gulp');
const plumber    = require('gulp-plumber'); // used for error catching during watch
const sass       = require("gulp-sass");
const browserify = require('browserify');
const babelify   = require('babelify');
const source     = require('vinyl-source-stream');
const swig       = require('gulp-swig');
const connect    = require('gulp-connect');
const uncache    = require('gulp-uncache');
const opn        = require('opn'); // for opening the browser

const sourcePaths = {
  styles:     ['./src/scss/*.scss'],
  scriptName: './src/js/script.js',
  scriptPath: './src/js/',
  scripts:    './src/js/*.js',
  images:     ['./src/img/**/*'],
  templates:  ['./src/*.html'],
  partials:   ['./src/partials/*.html'],
  raw:        ['./src/raw/**/*']
};

const distPaths = {
  styles:     './dist/css',
  scripts:    './dist/js',
  scriptName: 'script.js',
  images:     './dist/img',
  templates:  './dist',
  raw:        './dist'
};

const server = {
  host: 'localhost',
  port: '8001'
};

gulp.task('styles', function () {
  return gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(connect.reload())
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('scripts', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: sourcePaths.scriptName,
    debug: false // switch to true for sourcemaps
  });

  return b.transform(babelify, {
    presets: [
        // 'react', // uncomment to enable reactifying & jsx
        'es2015'
      ]
    })
    .bundle()
    .pipe(plumber())
    .pipe(connect.reload())
    .pipe(source(distPaths.scriptName))
    .pipe(gulp.dest(distPaths.scripts));
});

gulp.task('images', function () {
  return gulp.src( sourcePaths.images )
    .pipe(connect.reload())
    .pipe(gulp.dest( distPaths.images ));
});

gulp.task('raw', function () {
  return gulp.src(sourcePaths.raw)
    .pipe(connect.reload())
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
    .pipe(uncache())
    .pipe(connect.reload())
    .pipe(gulp.dest( distPaths.templates ));
});

gulp.task('webserver', function() {
  connect.server({
    root: distPaths.templates,
    port: server.port,
    livereload: true
  });
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
  gulp.watch(sourcePaths.partials, ['templates']);
  gulp.watch(sourcePaths.raw, ['raw']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'templates', 'raw']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'watch', 'webserver', 'openbrowser']);
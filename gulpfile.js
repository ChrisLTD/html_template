var gulp      = require('gulp');
var plumber   = require('gulp-plumber'); // used for error catching during watch
var sass      = require("gulp-sass");
var coffee    = require('gulp-coffee');
var swig      = require('gulp-swig');
var webserver = require('gulp-webserver');
var changed   = require('gulp-changed'); // only move changed files
var opn       = require('opn'); // for opening the browser

var sourcePaths = {
  styles:    ['./scss/*.scss'],
  scripts:   ['./coffee/*.coffee'],
  images:    ['./img/**/*'],
  templates: ['./templates/**/*.html'],
  raw:       ['./raw/**/*']
};

var distPaths = {
  styles:    './dist/css',
  scripts:   './dist/js',
  images:    './dist/img',
  templates: './dist',
  raw:       './dist',
};

var server = {
  host: 'localhost',
  port: '8001'
};

gulp.task('styles', function () {
  return gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(changed(distPaths.styles))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('scripts', function () {
  return gulp.src( sourcePaths.scripts )
    .pipe(plumber())
    .pipe(changed( distPaths.scripts ))
    .pipe(coffee())
    .pipe(gulp.dest( distPaths.scripts ));
});

gulp.task('images', function () {
  return gulp.src( sourcePaths.images )
    .pipe(changed( distPaths.images ))
    .pipe(gulp.dest( distPaths.images ));
});

gulp.task('raw', function () {
  return gulp.src(sourcePaths.raw)
    .pipe(changed( distPaths.raw ))
    .pipe(gulp.dest( distPaths.raw ));
});

gulp.task('templates', function() {
  return gulp.src( sourcePaths.templates )
    .pipe(plumber())
    .pipe(changed( distPaths.templates ))
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest( distPaths.templates ))
})

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

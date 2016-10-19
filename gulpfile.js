var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var typescript = require('gulp-tsc');
var del = require('del');
var concat = require('gulp-concat');
var paths = {
  sass: ['./scss/**/*.scss'],
  src: ['./src/app.ts', './src/controllers.ts',
    './src/directives.ts', './src/services.ts',
    './src/services/*.ts', './src/activities/*.ts', './src/subject/*.ts',
    './src/*.ts', './src/routes.ts'],
  ts: ['./dist/bundle.ts']
};

function bundleTS(done) {
  gulp.src(paths.src)
    .pipe(concat('bundle.ts'))
    .pipe(gulp.dest('./dist/'))
    .on('end', done);
}

function compileTS(done) {
  gulp.src(paths.ts)
    .pipe(typescript( {emitError: false}) )
    .pipe(concat('dist.js'))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done);
}

gulp.task('bundle', bundleTS);

gulp.task('compile', ['bundle'], compileTS);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.src, ['compile']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('clean', function() {
  "use strict";
  return del([
      './www/js/**/*.js'
  ]);
});

gulp.task('default', ['sass', 'compile', "watch"]);


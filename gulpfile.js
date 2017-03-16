'use strict';

var gulp = require('gulp');
var pump = require('pump');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var clean = require('gulp-dest-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');

//var KarmaServer = require('karma').Server;

var disttarget = 'dist';

gulp.task('default', function (cb) {
    runSequence('web', 'app', 'scripts', 'libs',  cb);
});

gulp.task('web', function (cb) {
    runSequence('dist-clean', 'html', 'less', 'fonts',  cb);
});

gulp.task('watch', function (cb) {
    runSequence('html-watch', 'less-watch', 'app-watch', cb);
});

gulp.task('dist-clean', function (cb) {
    var dest = 'dist';
     pump([gulp.src(['dist']),
         clean(dest),
         gulp.dest(dest)
    ], cb);
});

gulp.task('fonts', function (cb) {

    var dest = 'dist/fonts';
    pump([gulp.src(['node_modules/font-awesome/fonts/*.*' ]),
         clean(dest),
         gulp.dest(dest)
    ], cb);
});

gulp.task('html', function (cb) {

    var dest = 'dist';
    pump([gulp.src(['web/*.html']),
        gulp.dest(dest)
    ], cb);
});

gulp.task('html-watch', ['html'], function () {
     return gulp.watch(['web/*.html'], ['html']);
});

gulp.task('less', function (cb) {

    var dest = 'dist/css';
    pump([gulp.src(['node_modules/bootstrap/less/bootstrap.less',
                    'less/**/*.less',
                    'node_modules/font-awesome/less/font-awesome.less',
                    'less/style.less']),
            less(),
            minify(),
            concat('styles.css'),
            clean(dest),
            gulp.dest(dest)
    ], cb);
});

gulp.task('less-watch', ['less'], function () {
     return gulp.watch(['less/**/*.less','app/**/*.less'], ['less']);
});


gulp.task('scripts', function (cb) {
    var dest = 'dist/app/assets/js';
    pump([gulp.src('app/assets/js/*.js', {read: false }),
            clean(dest),
            gulp.dest(dest)], cb);
});

gulp.task('libs', function (cb) {

    var dest = 'dist/app/assets/libs';
    pump([gulp.src(['node_modules/angular/angular.min.js',
                    'node_modules/angular-messages/angular-messages.min.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jquery-ui-dist/jquery-ui.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js'
                    ]),
         clean(dest),
         gulp.dest(dest)
    ], cb);
});



gulp.task('app-template', function (cb) {

    var dest = 'dist/app';
    pump([gulp.src(['app/**/*.html']),
            gulp.dest(dest)
    ], cb);
});

gulp.task('app', ['app-template'], function (cb) {

    var dest = 'dist/app';
    pump([gulp.src(['app/**/*.js']),

            eslint(),
            eslint.format(),
            eslint.failAfterError(),

            //concat('app.js'),
            gulp.dest(dest)
    ], cb);
});

gulp.task('app-watch', ['app','app-template-watch'], function () {
     return gulp.watch(['app/**/*.js'], ['app']);
});

gulp.task('app-template-watch', ['app-template'], function () {
     return gulp.watch(['app/**/*.html'], ['app-template']);
});


// Run test once and exit
// gulp.task('test', function (cb) {
//     new KarmaServer({
//         configFile: __dirname + '/karma.conf.js',
//         singleRun: true
//     }, cb).start();
// });

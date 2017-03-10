//定义依赖和插件
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');//livereload
   
var jsSrc = 'js/*.js';
var jsDist = 'dist/js';

var htmlSrc = './*.html';
var htmlDist = 'dist';

//定义名为js的任务
gulp.task('js', function () {

    gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDist))
        .pipe(connect.reload())

});

//定义html任务
gulp.task('html', function () {

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDist))
        .pipe(connect.reload());

});

gulp.task('css', function () {
    // 1. 找到文件
    gulp.src('css/*.css').pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6','chrome', 'android 4'))
    // 2. 压缩文件
        .pipe(minifycss())
    // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

//定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});


//定义看守任务
gulp.task('watch', function () {

    gulp.watch('./*.html', ['html']);

    gulp.watch('js/*.js', ['js']);
	
	gulp.watch('css/*.css', ['css']);

});


//定义默认任务
gulp.task('default', [ 'js', 'html','css','watch', 'connect']);
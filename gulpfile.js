//���������Ͳ��
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

//������Ϊjs������
gulp.task('js', function () {

    gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDist))
        .pipe(connect.reload())

});

//����html����
gulp.task('html', function () {

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDist))
        .pipe(connect.reload());

});

gulp.task('css', function () {
    // 1. �ҵ��ļ�
    gulp.src('css/*.css').pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6','chrome', 'android 4'))
    // 2. ѹ���ļ�
        .pipe(minifycss())
    // 3. ���Ϊѹ���ļ�
        .pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

//����livereload����
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});


//���忴������
gulp.task('watch', function () {

    gulp.watch('./*.html', ['html']);

    gulp.watch('js/*.js', ['js']);
	
	gulp.watch('css/*.css', ['css']);

});


//����Ĭ������
gulp.task('default', [ 'js', 'html','css','watch', 'connect']);
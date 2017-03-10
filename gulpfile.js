var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),//sass的编译
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),//更改提醒
    cache = require('gulp-cache'),//图片缓存，只有图片替换了才压缩
    livereload = require('gulp-livereload'),
    del = require('del');//清除文件
	
gulp.task('sass', function() {
     return sass('sass/*.scss',{style: 'expanded'})
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6','chrome 55', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }))
	.pipe(livereload());
});

// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function () {
    // 1. 找到文件
    gulp.src('css/*.css').pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6','chrome', 'android 4'))
    // 2. 压缩文件
        .pipe(minifycss())
    // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css'))
		.pipe(livereload());
});

gulp.task('images', function() {
     return gulp.src('./img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('a.js,move.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist/css/*.*', 'dist/js/*.*', 'dist/img/*.*'], cb)
});

/**
gulp.task('default', ['clean'], function() {
    gulp.start('sass','css', 'scripts', 'images'); //clean会优先执行，start中的任务执行顺序不确定
});*/


gulp.task('default', ['clean','sass','css', 'scripts', 'images']);

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('sass/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('js/*.js', ['scripts']);
  // Watch image files
  gulp.watch('img/**/*', ['images']);
});

gulp.task('watch-auto', function() {
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
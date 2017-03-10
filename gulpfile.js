// ��ȡ gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
// ��ȡ minify-css ģ�飨����ѹ�� CSS��
var minifyCSS = require('gulp-minify-css');
// ��ȡ gulp-imagemin ģ��,ѹ��ͼƬ
var imagemin = require('gulp-imagemin');


// ѹ�� js �ļ�
// ��������ʹ�� gulp script ����������
gulp.task('script', function() {
    // 1. �ҵ��ļ�
    gulp.src('js/*.js')
    // 2. ѹ���ļ�
        .pipe(uglify())
    // 3. ���ѹ������ļ�
        .pipe(gulp.dest('dist/js'))
});
// ѹ�� css �ļ�
// ��������ʹ�� gulp css ����������
gulp.task('css', function () {
    // 1. �ҵ��ļ�
    gulp.src('css/*.css')
    // 2. ѹ���ļ�
        .pipe(minifyCSS())
    // 3. ���Ϊѹ���ļ�
        .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function () {
    // 1. �ҵ�ͼƬ
    gulp.src('img/*.*')
    // 2. ѹ��ͼƬ
        .pipe(imagemin({
            progressive: true
        }))
    // 3. ���ͼƬ
        .pipe(gulp.dest('dist/img'))
});
/**
gulp.task('watch',function(){
 gulp.watch('css/*.css',['styles']);
 gulp.watch('js/*.js',['scripts']);
 gulp.watch('img/*.{png,jpg,gif}',['images']);
});*/
// ��������ʹ�� gulp auto ����������
gulp.task('auto', function () {
    // �����ļ��޸ģ����ļ����޸���ִ�� script ����
    gulp.watch('./js/*.js', ['script']);
	gulp.watch('./css/*.css', ['css']);
	// �����ļ��޸ģ����ļ����޸���ִ�� images ����
    gulp.watch('img/*.*)', ['images']);
});
// ʹ�� gulp.task('default') ����Ĭ������
// ��������ʹ�� gulp ���� script ����� auto ����
gulp.task('default', ['script','css','images','auto']);
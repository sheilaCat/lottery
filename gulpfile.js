// 载入外挂
var gulp = require('gulp'),  
    sass = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

// 样式
gulp.task('styles', function() {  
  return gulp.src('src/stylesheets/style.less')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});

// 脚本
gulp.task('scripts', function() {  
  return gulp.src('src/javascripts/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

// 字体
gulp.task('fonts', function() {
  return gulp.src('src/fonts/*')
  .pipe(livereload())
  .pipe(gulp.dest('public/fonts'));
});

// 清理
gulp.task('clean', function() {  
  return gulp.src(['public/stylesheets', 'public/javascripts', 'public/fonts'], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'fonts');
});

// 看手
gulp.task('watch', function() {
  livereload.listen();
  // 看守所有.less
  gulp.watch('src/stylesheets/*.less', ['styles']);

  // 看守所有.js档
  gulp.watch('src/javascripts/*.js', ['scripts']);

  // 看守fonts
  gulp.watch('src/fonts/*', ['fonts']);


  // 建立即时重整伺服器
/*  var server = livereload();
*/


  // 看守所有位在 public/  目录下的档案，一旦有更动，便进行重整
/*  gulp.watch(['public/**']).on('change', function(file) {
    server.changed(file.path);
  });
*/

});
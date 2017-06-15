var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat-css');
var browserSync = require('browser-sync');
var path = require('path');

// задача для компиляции less в css и проставления вендорных префиксов
gulp.task('less', function() {
    return gulp.src('./less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'bower_components') ]
        }))
        .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./css'))
});

// задача для вывода результата компиляции в браузере
gulp.task('browser-sync', ['less'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// задача для отслеживания изменений в файлах
gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less']);

    gulp.watch('./css/*.css').on("change", browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// задача по умолчанию
gulp.task('default', ['browser-sync', 'watch']);
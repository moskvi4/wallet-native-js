var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['build-js', 'bild-css']);

gulp.task('build-js', function () {
    return gulp.src('src/js/namespace.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('bild-css', function () {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/'));
});

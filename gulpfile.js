var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['build-js']);

gulp.task('build-js', function () {
    return gulp.src('src/js/namespace.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});

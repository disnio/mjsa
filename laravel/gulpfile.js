var gulp = require('gulp');

var sass = require('gulp-sass');

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./css/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('./css/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass']);
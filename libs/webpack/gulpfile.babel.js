// generated on 2016-07-04 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// gulp.task('styles', () => {
//   return gulp.src('src/styles/*.scss')
//     .pipe($.plumber())
//     .pipe($.sourcemaps.init())
//     .pipe($.sass.sync({
//       outputStyle: 'expanded',
//       precision: 10,
//       includePaths: ['.']
//     }).on('error', $.sass.logError))
//     .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
//     .pipe($.sourcemaps.write())
//     .pipe(gulp.dest('build/styles'))
//     .pipe(reload({stream: true}));
// });
// gulp.task('styles', () => {
//   return gulp.src('src/styles/*.scss')
//     .pipe($.plumber())
//     .pipe(webpack(webpackConfig))
//     .pipe(gulp.dest('build/css'))
//     .pipe(reload({stream: true}));
// });

gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe($.plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('src/js/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

// gulp.task('html', ['styles', 'scripts'], () => {
//   return gulp.src('src/*.html')
//     .pipe($.useref({searchPath: ['build', 'app', '.']}))
//     .pipe($.if('*.js', $.uglify()))
//     .pipe($.if('*.css', $.cssnano()))
//     .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('images', () => {
//   return gulp.src('src/images/**/*')
//     .pipe($.cache($.imagemin({
//       progressive: true,
//       interlaced: true,
//       // don't remove IDs from SVGs, they are often used
//       // as hooks for embedding and styling
//       svgoPlugins: [{cleanupIDs: false}]
//     })))
//     .pipe(gulp.dest('build/images'));
// });

// gulp.task('fonts', () => {
//   return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
//     .concat('src/fonts/**/*'))
//     .pipe(gulp.dest('build/fonts'));
// });

// gulp.task('extras', () => {
//   return gulp.src([
//     'src/*.*',
//     '!src/*.html'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('build'));
// });

gulp.task('clean', del.bind(null, ['build']));

gulp.task('serve', ['clean', 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['build', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('src/**/*', ["scripts"] ).on('change', reload);
  gulp.watch('webpack.config.js', ["scripts"] ).on('change', reload);
});


// inject bower components
gulp.task('wiredep', () => {
  gulp.src('src/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('src/styles'));

  gulp.src('src/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'extras'], () => {
  return gulp.src('build/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

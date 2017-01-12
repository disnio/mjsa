import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import watch from 'gulp-watch';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config';

const reload = browserSync.reload;

gulp.task('scripts', () => {
    return gulp.src('js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('static'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('clean', del.bind(null, ['static/*']));

gulp.task('default', ['clean', 'scripts'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./', 'static', 'app'],
        }
    });

    watch('js/**/*', ["scripts"]).on('change', reload);
    watch('webpack.config.js', ["scripts"]).on('change', reload);
});

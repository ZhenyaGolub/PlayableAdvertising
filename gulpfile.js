const { src, dest, watch, series, parallel } = require('gulp');

const browserSync = require('browser-sync').create();

const gulpSass = require('gulp-sass')(require('sass'));
const gulpConcat = require('gulp-concat');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpRename = require('gulp-rename');
const gulpUglify = require('gulp-uglify-es').default;
const gulpHTMLMin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const del = require('del');

const cleanDist = () => {
    return del('dist')
}

const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
}

const createCssFile = () => {
    return src('./src/scss/main.scss')
        .pipe(gulpSass({outputStyle: 'compressed'}))
        .pipe(gulpConcat('style.min.css'))
        .pipe(gulpAutoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src('./src/js/main.js')
    .pipe(gulpRename('main.min.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulpUglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream())
}

const minifyHTML = () => {
    return src('./src/index.html')
    .pipe(gulpHTMLMin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
}

const watching = () => {
    watch(['./src/scss/**/*.scss'], createCssFile);
    watch(['./src/js/main.js', '!./src/js/main.min.js'], scripts);
    watch(['./src/index.html']).on('change', browserSync.reload);
}

const build = () => {
    return src([
        'src/css/style.min.css',
        'src/js/main.min.js',
        'src/images/**/*',
        'src/fonts/**/*',
        ], { base: 'src' })
        .pipe(dest('dist'))
}

exports.createCssFile = createCssFile;
exports.scripts = scripts;
exports.minifyHTML = minifyHTML;
exports.watching = watching;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, build, minifyHTML);
exports.start = parallel(createCssFile, scripts, browsersync, watching);
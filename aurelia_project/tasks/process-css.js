import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(concat('app.less'))
    .pipe(less())
    .pipe(gulp.dest('assets/'));
}

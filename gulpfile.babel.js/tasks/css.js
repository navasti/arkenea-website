import { src, dest } from 'gulp'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import gulpif from 'gulp-if'
import cssnano from 'cssnano'
import browserSync from 'browser-sync'
import path from 'path'
import handleErrors from '../lib/handle-errors'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.src, config.tasks.css.src, '/**/main.{' + config.tasks.css.extensions + '}'),
  dest: path.posix.join(config.root.dest, config.tasks.css.dest)
}

const cssTask = () => {
  return src(paths.src)
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer())
    .pipe(gulpif(global.build, postcss([
      cssnano()
    ])))
    .pipe(dest(path.posix.join(global.build ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.build, browserSync.stream()))
}

export default cssTask

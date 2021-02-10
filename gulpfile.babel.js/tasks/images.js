import { src, dest, lastRun } from 'gulp'
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import path from 'path'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.posix.join(config.root.dest, config.tasks.images.dest)
}

const imagesTask = () => {
  return src([paths.src, '*!README.md'])
    .pipe(dest(path.posix.join(global.build ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.build, browserSync.stream()))
}

export default imagesTask

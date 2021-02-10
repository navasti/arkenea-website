import { src, dest } from 'gulp'
import gulpImagemin from 'gulp-imagemin'
import path from 'path'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.posix.join(config.root.dest, config.tasks.images.dest)
}

const imagesTask = () => {
  return src([paths.src, '*!README.md'])
    .pipe(gulpImagemin()) // minify if it's production task
    .pipe(dest(path.posix.join(config.root.dist)))
}

export default imagesTask

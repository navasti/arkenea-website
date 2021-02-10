import { src, dest } from 'gulp'
import gulpif from 'gulp-if'
import gulpChanged from 'gulp-changed'
import path from 'path'
import browserSync from 'browser-sync'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.src, config.tasks.fonts.src, '/**/*.{' + config.tasks.fonts.extensions + '}'),
  dest: path.posix.join(config.root.dest, config.tasks.fonts.dest)
}

const fontsTask = () => {
  return src([paths.src, '*!README.md'])
    .pipe(gulpif(!global.build, gulpChanged(paths.dest))) // Ignore unchanged files
    .pipe(dest(path.posix.join(global.build ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.build, browserSync.stream()))
}

export default fontsTask

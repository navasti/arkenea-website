import { src, dest, lastRun } from 'gulp'
import path from 'path'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.base, config.tasks.favicon.src, '/**/*'),
  dest: config.tasks.favicon.dest
}

const faviconTask = () => {
  return src([paths.src, '*!README.md'], { since: lastRun(faviconTask) })
    .pipe(dest(path.posix.join(config.root.dist, paths.dest)))
}

export default faviconTask

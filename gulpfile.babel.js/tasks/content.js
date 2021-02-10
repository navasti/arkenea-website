import { src, dest, lastRun } from 'gulp'
import path from 'path'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.base, config.tasks.content.src, '/**/*'),
  dest: config.tasks.content.dest
}

const contentTask = () => {
  return src([paths.src, '*!README.md'], { since: lastRun(contentTask) })
    .pipe(dest(path.posix.join(config.root.dist, paths.dest)))
}

export default contentTask

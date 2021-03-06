import { src, dest } from 'gulp'
import path from 'path'
import critical from 'critical'
import config from '../config'

const paths = {
  src: path.posix.join(config.root.dist, config.tasks.critical.src),
  dest: config.root.dist
}

const criticalConfig = {
  inline: true,
  base: paths.dest,
  height: config.tasks.critical.height,
  width: config.tasks.critical.width,
  minify: true,
  extract: false,
  ignore: ['font-face']
}

const criticalTask = cb => {
  return src(paths.src)
    .pipe(critical.stream(criticalConfig))
    .pipe(dest(paths.dest))
}

export default criticalTask

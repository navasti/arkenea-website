import { src, dest } from 'gulp'
import revRewrite from 'gulp-rev-rewrite'
import config from '../config'
import path from 'path'

const revUpdateHTMLTask = () => {
  var finalPath = path.join(global.build ? config.root.dist : '', config.root.dest)
  var manifest = src(path.join(finalPath, 'manifest.json'))
  var srcPath = global.build ? path.join('.', config.root.dist, '**/*.{css,html}') : './*.html'
  var destPath = global.build ? path.join(config.root.dist) : './'

  return src(srcPath)
    .pipe(revRewrite({ manifest }))
    .pipe(dest(destPath))
}

export default revUpdateHTMLTask

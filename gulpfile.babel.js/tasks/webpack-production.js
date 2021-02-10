
import webpack from 'webpack'
import webpackMultiConfig from '../webpack/base'
import compileLogger from '../webpack/compile-logger'

const webpackProductionTask = cb => {
  webpack(webpackMultiConfig('production'), (err, stats) => {
    compileLogger(err, stats)
    cb()
  })
}

export default webpackProductionTask

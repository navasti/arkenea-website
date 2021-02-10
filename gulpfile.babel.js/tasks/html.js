/* eslint no-unreachable: "error" */
import { src, dest } from 'gulp'
import data from 'gulp-data'
import twig from 'gulp-twig'
import gulpif from 'gulp-if'
import htmlmin from 'gulp-htmlmin'
import path from 'path'
import fs from 'fs'
import browserSync from 'browser-sync'
import config from '../config'
import handleErrors from '../lib/handle-errors'
import twigExtends from '../twig/extends'
import twigFilters from '../twig/filters'

const exclude = path.posix.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

const paths = {
  src: [path.posix.join(config.root.src, config.tasks.html.src, '/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.posix.join('./')
}

const parse = name => {
  return JSON.parse(fs.readFileSync(name, 'utf8'))
}

const getData = (file, name, isFileName = false) => {
  const dataPath = path.posix.resolve(config.root.src, config.tasks.html.src, name)

  if (isFileName) {
    const filePath = path.posix.basename(file.path, '.twig')
    const fileName = `${dataPath}/${filePath}.json`

    if (fs.existsSync(fileName)) {
      return parse(fileName)
    }
  } else {
    return parse(dataPath)
  }
}

const getDataAll = file => {
  return getData(file, config.tasks.html.data, true)
}

const getDataOne = file => {
  return getData(file, config.tasks.html.dataFile, false)
}

const htmlTask = () => {
  return src(paths.src)
    .pipe(data(getDataOne))
    .pipe(data(getDataAll))
    .on('error', handleErrors)
    .pipe(twig({
      extend: twigExtends,
      filters: twigFilters()
    }))
    .pipe(gulpif(global.build, htmlmin(config.tasks.html.htmlmin)))
    .on('error', handleErrors)
    .pipe(dest(path.posix.join(global.build ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.build, browserSync.stream()))
}

export default htmlTask

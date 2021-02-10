import { series, parallel } from 'gulp'
import clean from './tasks/clean'
import css from './tasks/css'
import html from './tasks/html'
import revUpdateHTML from './tasks/rev-update-html'
import images from './tasks/images'
import imagesCompress from './tasks/images-compress'
import content from './tasks/content'
import favicon from './tasks/favicon'
import watch from './tasks/watch'
import browserSync from './tasks/browser-sync'
import svgSprites from './tasks/svg-sprites'
import fonts from './tasks/fonts'
import zip from './tasks/zip'
import rev from './tasks/rev'
import critical from './tasks/critical'
import webpackProduction from './tasks/webpack-production'
import config from './config'

global.build = false

// Production task
const build = function () {
  if (global.process.argv.includes('build')) {
    global.build = true
  }

  const tasks = [clean, html, css, images, fonts, svgSprites, webpackProduction, content, favicon]

  if (config.tasks.critical.enabled) {
    tasks.push(critical)
  }

  if (config.tasks.rev.enabled) {
    tasks.push(rev)
    tasks.push(revUpdateHTML)
  }

  return tasks
}

// Dev task
const dev = function () {
  return [html, css, images, fonts, parallel(browserSync, watch)]
}

// Sprites task
const sprites = function () {
  return [svgSprites]
}

// Zip task
const zips = function () {
  return [zip]
}

// Images task
const imagesTasks = function () {
  return [imagesCompress]
}

// Exports Gulp tasks
exports.clean = clean
exports.html = html
exports.css = css
exports.images = images
exports.imagesCompress = imagesCompress
exports.fonts = fonts
exports.browserSync = browserSync
exports.watch = watch
exports.svgSprites = svgSprites
exports.zip = zip
exports.rev = rev
exports.revUpdateHTML = revUpdateHTML
exports.critical = critical
exports.webpackProduction = webpackProduction

// Exports main Gulp tasks
exports.default = series(...dev())
exports.build = series(...build())
exports.sprites = series(...sprites())
exports.zips = series(...zips())
exports.imagesCompress = series(...imagesTasks())

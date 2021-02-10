import { src, dest } from 'gulp'
import config from '../config'
import zip from 'gulp-zip'

const paths = {
  src: config.tasks.zip.src,
  dest: config.tasks.zip.dest
}
const prefix = config.tasks.zip.prefix

const formatZero = val => val < 10 ? `0${val}` : val

const date = new Date()
const year = date.getFullYear()
const month = formatZero(date.getMonth() + 1)
const day = formatZero(date.getDate())
const hour = formatZero(date.getHours())

const minute = formatZero(date.getMinutes())
const dateFormated = `${year}-${month}-${day}-${hour}-${minute}`

const name = `${prefix}.${dateFormated}.zip`

const zipTask = () => {
  return src(paths.src)
    .pipe(zip(name))
    .pipe(dest(paths.dest))
}

export default zipTask

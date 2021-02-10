import notify from 'gulp-notify'

module.exports = (errorObject, callback) => {
  notify.onError(errorObject).apply(this, arguments)
}

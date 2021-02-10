import { watch, parallel } from 'gulp'
import path from 'path'
import config from '../config'

const watchTask = cb => {
  const watchableTasks = ['css', 'html', 'images', 'fonts']

  watchableTasks.forEach(taskName => {
    const task = config.tasks[taskName]

    if (task) {
      const glob = path.posix.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      watch(glob, parallel(taskName))
    }
  })

  cb()
}

export default watchTask

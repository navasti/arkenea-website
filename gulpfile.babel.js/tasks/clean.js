import del from 'del'
import config from '../config'

const cleanTask = cb => {
  const path = global.build ? config.root.dist : config.root.dest

  del([path]).then(paths => {
    cb()
  })
}

export default cleanTask

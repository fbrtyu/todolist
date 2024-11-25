const data = require('./database')

let gettaskid = (id) => {
  let findElement = null
  for (elem of data.data) {
    if (elem.id === id) {
      findElement = elem
    }
  }

  return findElement ? findElement : 500
}

exports.gettaskid = gettaskid

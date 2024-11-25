const data = require('./database')

let deletetask = (id) => {
  let deleteElement = null
  for (const [index, element] of data.data.entries()) {
    if (element.id === id) {
      deleteElement = element
      data.data.splice(index, 1)
    }
  }
  return deleteElement ? deleteElement : 500
}

exports.deletetask = deletetask

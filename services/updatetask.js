const data = require('./database')

let updatetask = (id, title, description, status) => {
  let updateElement = null
  for (const [index, element] of data.data.entries()) {
    if (element.id === id) {
      data.data[index].title = title ? title : data.data[index].title
      data.data[index].description = description
        ? description
        : data.data[index].description
      data.data[index].status = status ? status : data.data[index].status
      updateElement = element
    }
  }

  return updateElement ? updateElement : 500
}

exports.updatetask = updatetask

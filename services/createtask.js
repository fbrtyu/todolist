const data = require('./database')
const { v4: uuidv4 } = require('uuid')

let createtask = (title, description, status) => {
  try {
    data.data.push({
      id: uuidv4(),
      title: title,
      description: description,
      status: status,
    })
    return 201
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.createtask = createtask

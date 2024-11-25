const express = require('express')
const bp = require('body-parser')
require('dotenv').config()
const getTask = require('./routes/get')
const createTask = require('./routes/create')
const updateTask = require('./routes/update')
const deleteTask = require('./routes/delete')

try {
  const server = express()
  server.use(bp.json())
  server.use(bp.urlencoded({ extended: true }))

  const PORT = process.env.PORT

  server.use('/task', getTask)
  server.use('/create', createTask)
  server.use('/update', updateTask)
  server.use('/delete', deleteTask)

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
} catch (err) {
  console.log('Server status: 500. Ошибка запуска сервера.\n')
  console.log(err)
}

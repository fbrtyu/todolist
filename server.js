const express = require('express')
const cors = require('cors')
require('dotenv').config()
const getTask = require('./routes/get')
const createTask = require('./routes/create')
const updateTask = require('./routes/update')
const deleteTask = require('./routes/delete')
const login = require('./routes/login')
const registration = require('./routes/registration')
const db = require('./database/models/sequelize/index')
const checkToken = require('./middlewares/checkToken')
const logger = require("./middlewares/logger")
const deleteUser = require('./routes/deleteUser')

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

try {
  const server = express()
  server.use(cors(corsOptions))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))

  server.use(checkToken)
  server.use(logger)

  const PORT = process.env.PORT

  server.use('/task', getTask)
  server.use('/create', createTask)
  server.use('/update', updateTask)
  server.use('/delete', deleteTask)
  server.use('/login', login)
  server.use('/registration', registration)
  server.use('/user', deleteUser)

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
} catch (err) {
  console.log('Server status: 500. Ошибка запуска сервера.\n')
  console.log(err)
}

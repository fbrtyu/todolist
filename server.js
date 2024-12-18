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
const logger = require('./middlewares/logger')
const deleteUser = require('./routes/deleteUser')
const fs = require('node:fs')

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

try {
  //Проверка есть ли файл config.json и его создание
  fs.access('config.json', fs.constants.F_OK, async (err) => {
    if (err) {
      try {
        fs.readFile('config/default-config.json', async (err, data) => {
          if (err) {
            console.log(err)
          } else {
            fs.writeFile('config.json', data, async (err) => {
              if (err) {
                console.log(err)
              } else {
                //Запись в global, но не могу прочитать из global
                global.config = await JSON.parse(data.toString())
                console.log('Файл config.json успешно создан!')
              }
            })
          }
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      fs.readFile("config.json", async (err, data)=>{
        if(err) {
          console.log(err)
        } else {
          //Запись в global, но не могу прочитать из global
          global.config = await JSON.parse(data.toString())
          console.log('Файл config.json уже существует!')
        }
      })
    }
  })

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

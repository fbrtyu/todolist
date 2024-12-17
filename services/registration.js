const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/models/sequelize/index')
const { v4: uuidv4 } = require('uuid')

const saltRounds = 10

let registration = async (login, password_1, password_2) => {
  try {
    //Проверка логина и паролей
    if (
      password_1 === password_2 &&
      password_1 !== '' &&
      login !== '' &&
      login.match(/^[A-za-z]{4,}$/gi) !== null &&
      password_1.match(/^(?![0-9]+$)(?![a-zA-z]+$)([0-9a-zA-z]){6,}$/gi) !==
        null
    ) {
      //Проверка нет ли дубликата логина
      const currentUser = await db.db.Auth.findAll({ where: { login: login } })

      if (currentUser[0]) {
        return 500
      } else {
        //Если нет, то хеширование пароля и добавление записи в БД
        //Генерация токенов и отдача их пользователю
        const accessToken = await jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + (60 * 60) / 2,
            login: login,
          },
          'SECRETACCESS'
        )

        const refreshToken = await jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            login: login,
          },
          'SECRETREFRESH'
        )

        const uid = uuidv4()

        await db.db.User.create({
          id: uid,
          firstName: 'firstName',
          lastName: 'lastName',
        })

        bcrypt.hash(password_1, saltRounds, async function (err, hash) {
          await db.db.Auth.create({
            idUser: uid,
            login: login,
            password: hash,
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        })
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          status: 200,
        }
      }
    } else {
      return 500
    }
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.registration = registration

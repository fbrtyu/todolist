const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkToken = async (req, res, next) => {
  let accessToken
  let refreshToken
  //Тут брать данные из req и если они есть, то проверять
  if (req.body.accessToken) {
    try {
      accessToken = jwt.verify(req.body.accessToken, process.env.SECRETACCESS)
      //Если токен правильный, то пускаем пользователя дальше
      //В res добавляю login,
      // чтобы в следующем route его использовать для поиска в БД
      res.login = accessToken.login
    } catch (err) {
      console.log(err)
      res.status(500).send('Ошибка токена.')
      return 0
    }
  }

  if (req.body.refreshToken) {
    try {
      refreshToken = jwt.verify(
        req.body.refreshToken,
        process.env.SECRETREFRESH
      )

      //Если токен правильный, то обновляем все токены
      accessToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + (60 * 60) / 2,
          login: refreshToken.login,
        },
        process.env.SECRETACCESS
      )

      res.login = refreshToken.login

      refreshToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          login: refreshToken.login,
        },
        process.env.SECRETREFRESH
      )
    } catch (err) {
      console.log(err)
      res.status(500).send('Ошибка токена.')
      return 0
    }
  }
  next()
}

module.exports = checkToken

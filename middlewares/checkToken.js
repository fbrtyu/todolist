const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
  let accessToken
  let refreshToken
  //Тут брать данные из req и если они есть, то проверять
  if (req.body.accessToken) {
    try {
      accessToken = await jwt.verify(req.body.accessToken, 'SECRETACCESS')
      //Если токен правильный, то пускаем пользователя дальше
      console.log('accessToken is ok')
    } catch (err) {
      console.log(err)
      res.status(500).send('Ошибка токена.')
      return 0
    }
  }

  if (req.body.refreshToken) {
    try {
      refreshToken = await jwt.verify(req.body.refreshToken, 'SECRETREFRESH')
      //Если токен правильный, то обновляем все токены
      console.log('refreshToken is ok')

      accessToken = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + (60 * 60) / 2,
          login: refreshToken.login,
        },
        'SECRETACCESS'
      )

      refreshToken = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          login: refreshToken.login,
        },
        'SECRETREFRESH'
      )

      res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Ошибка токена.')
      return 0
    }
  }
  next()
}

module.exports = checkToken

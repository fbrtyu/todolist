const express = require('express')
const router = express.Router()
const registration = require('../services/registration')

router.post('/newuser', async (req, res) => {
  const answer = await registration.registration(
    req.body.login,
    req.body.password_1,
    req.body.password_2
  )
  if (answer !== undefined && answer.status === 200) {
    res.status(200).send(answer)
  } else {
    res.status(500).send(
      `Такой логин уже используется или пароль не соответствует требованиям 
        (Логин должен быть минимум 4 символа и состоять только из букв латинского алфавита. 
        Пароль, должен быть минимум 6 символов в длину и состоять только из букв латинского алфавита и из цифр.)`
    )
  }
})

module.exports = router

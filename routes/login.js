const express = require('express')
const router = express.Router()
const login = require('../services/login')

router.post('/user', async (req, res) => {
  const answer = await login.login(req.body.login, req.body.password)
  if (answer !== undefined && answer.status === 200) {
    res.status(200).send(answer)
  } else {
    res.status(500).send('Ошибка входа.')
  }
})

module.exports = router

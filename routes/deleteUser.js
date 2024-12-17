const express = require('express')
const router = express.Router()
const deleteUser = require('../services/deleteUser')

router.delete('/delete', async (req, res) => {
  try {
    const answer = await deleteUser.deleteUser(req.body.login, req.body.password)
    if (answer !== 500) {
      res.status(200).send('Учётная запись пользователя удалена.')
    } else {
      res.status(500).send('Нет такого пользователя или неверные данные.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Ошибка удаления.')
  }
})

module.exports = router

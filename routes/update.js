const express = require('express')
const router = express.Router()
const updateTask = require('../services/updateTask')

router.patch('/:id', (req, res) => {
  try {
    const answer = updateTask.updateTask(
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.status
    )
    if (answer !== 500) {
      res.status(200).send('Задача успешно обновлена.')
    } else {
      res.status(500).send('Задча не найдена.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Ошибка обновления задачи.')
  }
})

module.exports = router

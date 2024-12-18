const express = require('express')
const router = express.Router()
const deleteTask = require('../services/deleteTask')

router.delete('/:id', (req, res) => {
  try {
    const answer = deleteTask.deleteTask(req.params.id)
    if (answer !== 500) {
      res.status(200).send('Задача успешно удалена.')
    } else {
      res.status(500).send('Нет такой задачи.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Ошибка удаления задачи.')
  }
})

module.exports = router

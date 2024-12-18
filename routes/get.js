const express = require('express')
const router = express.Router()
const getAllTasks = require('../services/getAllTasks')
const gettaskid = require('../services/getTaskId')

router.post('/all', async (req, res) => {
  try {
    const answer = JSON.stringify(await getAllTasks.getAllTasks(req, res))
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(answer)
  } catch (err) {
    console.log(err)
    res.status(500).send('Произошла ошибка получения данных.')
  }
})

router.get('/:id', (req, res) => {
  try {
    const answer = JSON.stringify(gettaskid.gettaskid(req.params.id))
    if (answer !== '500') {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(answer)
    } else {
      res.status(500).send('Данная задача не найдена.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Произошла ошибка получения данных.')
  }
})

module.exports = router

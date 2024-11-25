const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')
const createtask = require('../services/createtask')

router.use(logger)

router.post('/new', (req, res) => {
  const answer = createtask.createtask(
    req.body.title,
    req.body.description,
    req.body.status
  )
  if (answer === 201) {
    res.status(201).send('Вы успешно создали новую задачу.')
  } else {
    res.status(answer).send('Произошла ошибка при создании задачи.')
  }
})

module.exports = router

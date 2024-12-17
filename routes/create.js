const express = require('express')
const router = express.Router()
const createtask = require('../services/createTask')

router.post('/new', async (req, res) => {
  const answer = await createtask.createtask(
    req.body.title,
    req.body.description,
    req.body.status,
    res.login
  )
  if (answer === 201) {
    res.status(201).send('Вы успешно создали новую задачу.')
  } else {
    res.status(answer).send('Произошла ошибка при создании задачи.')
  }
})

module.exports = router

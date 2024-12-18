const express = require('express')
const router = express.Router()
const createTask = require('../services/createTask')

router.post('/new', async (req, res) => {
  const answer = await createTask.createTask(
    req.body.title,
    req.body.description,
    req.body.status,
    res.login
  )
  if (answer === 200) {
    res.status(200).send('Вы успешно создали новую задачу.')
  } else {
    res.status(answer).send('Произошла ошибка при создании задачи.')
  }
})

module.exports = router

const { v4: uuidv4 } = require('uuid')
const db = require('../database/models/sequelize/index')

let createtask = async (title, description, status, login) => {
  try {
    let taskId = uuidv4()

    user = await db.db.Auth.findOne({ where: { login: login } })

    task = await db.db.Task.create({
      id: taskId,
      title: title,
      description: description,
      status: status,
    })

    await db.db.TaskOfUser.create({
      idUser: user.idUser,
      idTask: taskId,
    })

    return 201
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.createtask = createtask

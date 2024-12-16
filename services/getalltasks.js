const data = require('./database')
const db = require('../database/models/sequelize/index')

let getalltasks = async (req, res) => {
  // await db.db.TaskOfUser.create({
  //   idUser: '940d620f-58a7-4ed0-a570-cc55f3e1ff1a',
  //   idTask: 'fdcc86ac-b230-4f76-a941-149c980eb8d6',
  // })
  //console.log(await db.db.Auth.findAll())
  user = await db.db.Auth.findOne({ where: { login: res.login } })
  tasks = await db.db.TaskOfUser.findAll({
    where: { idUser: user.idUser },
    include: [{ association: 'Task' }],
  })
  let array = []
  array.push(tasks[0].dataValues.Task)
  return array
}

exports.getalltasks = getalltasks

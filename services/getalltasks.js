const db = require('../database/models/sequelize/index')

let getalltasks = async (req, res) => {
  user = await db.db.Auth.findOne({ where: { login: res.login } })
  tasks = await db.db.TaskOfUser.findAll({
    where: { idUser: user.idUser },
    include: [{ association: 'Task' }],
  })
  let array = []
  for (elem of tasks) {
    array.push({
      id: elem.dataValues.Task.id,
      title: elem.dataValues.Task.title,
      description: elem.dataValues.Task.description,
      status: elem.dataValues.Task.status,
    })
  }
  return array
}

exports.getalltasks = getalltasks

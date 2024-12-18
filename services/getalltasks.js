const db = require('../database/models/sequelize/index')

let getAllTasks = async (req, res) => {
  try {
    user = await db.db.Auth.findOne({ where: { login: res.login } })
    try {
      tasks = await db.db.TaskOfUser.findAll({
        where: { idUser: user.idUser },
        include: [{ association: 'Task' }],
      })
    } catch (err) {
      console.log(err)
      return 501
    }
    let arrayOfTasks = []
    for (elem of tasks) {
      arrayOfTasks.push({
        id: elem.dataValues.Task.id,
        title: elem.dataValues.Task.title,
        description: elem.dataValues.Task.description,
        status: elem.dataValues.Task.status,
      })
    }
    return arrayOfTasks
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.getAllTasks = getAllTasks

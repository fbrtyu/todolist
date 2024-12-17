const db = require('../database/models/sequelize/index')

let getalltasks = async (req, res) => {
  try {
    user = await db.db.Auth.findOne({ where: { login: res.login } })
    // Не понимаю почему в Auth не успевает добавится информация, ранее работало нормально
    // if(user === null) {
    //   return 500
    // }
    try {
      tasks = await db.db.TaskOfUser.findAll({
        where: { idUser: user.idUser },
        include: [{ association: 'Task' }],
      })
    } catch (err) {
      console.log(err)
      return 501
    }
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
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.getalltasks = getalltasks

const db = require('../database/models/sequelize/index')

let deletetask = async (id) => {
  try {
    task = await db.db.TaskOfUser.destroy({
      where: {
        idTask: id,
      },
    })
    return 200
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.deletetask = deletetask

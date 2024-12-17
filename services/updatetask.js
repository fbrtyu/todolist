const db = require('../database/models/sequelize/index')

let updatetask = async (id, title, description, status) => {
  try {
    task = await db.db.Task.update(
      {
        title: title,
        description: description,
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    )
    return 200
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.updatetask = updatetask

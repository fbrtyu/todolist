const db = require('../database/models/sequelize/index')
const bcrypt = require('bcrypt')

let deleteUser = async (login, password) => {
  try {
    if (login !== '' && password !== '') {
      const currentUser = await db.db.Auth.findAll({ where: { login: login } })
      if (currentUser[0] !== undefined) {
        if (
          await bcrypt.compare(password, currentUser[0].dataValues.password)
        ) {
          try {
            // onDelete cascade, но почему то это не работает, 
            // при удалении родительской записи, зависимая не удаляется
            auth = await db.db.Auth.destroy({
              where: { idUser: currentUser[0].dataValues.idUser },
            })

            taskuser = await db.db.TaskOfUser.destroy({
              where: { idUser: currentUser[0].dataValues.idUser },
            })

            user = await db.db.User.destroy({
              where: { id: currentUser[0].dataValues.idUser },
            })

            console.log(await db.db.Auth.findAll())
            console.log(await db.db.User.findAll())
            console.log(await db.db.Task.findAll())
            console.log(await db.db.TaskOfUser.findAll())

            return 200
          } catch (err) {
            console.log(err)
          }
        } else {
          return 500
        }
      } else {
        return 500
      }
    } else {
      return 500
    }
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.deleteUser = deleteUser

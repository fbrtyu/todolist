const bcrypt = require('bcrypt')
const db = require('../database/models/sequelize/index')
const updateTokens = require("./updateTokens")

let login = async (login, password) => {
  try {
    if (login !== '' && password !== '') {
      const currentUser = await db.db.Auth.findAll({ where: { login: login } })
      if (currentUser[0]) {
        if (
          await bcrypt.compare(password, currentUser[0].dataValues.password)
        ) {
          return await updateTokens.updateTokens(login)
        }
      }
    }
  } catch (err) {
    console.log(err)
    return 500
  }
}

exports.login = login

const jwt = require('jsonwebtoken')
const db = require('../database/models/sequelize/index')

async function updateTokens(login) {
  accessToken = await jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + (60 * 60) / 2,
      login: login,
    },
    'SECRETACCESS'
  )

  refreshToken = await jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      login: login,
    },
    'SECRETREFRESH'
  )

  await db.db.Auth.update(
    { accessToken: accessToken, refreshToken: refreshToken },
    { where: { login: login } }
  )

  return { accessToken: accessToken, refreshToken: refreshToken, status: 200 }
}

exports.updateTokens = updateTokens

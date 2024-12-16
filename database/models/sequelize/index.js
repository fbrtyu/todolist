const sqlite3 = require('sqlite3').verbose()
const sqliteDataBase = new sqlite3.Database('db.sqlite3')
const db = require('../sequelize/sqlite')

function initialDB() {
  db.User.sync()
  db.Task.sync()
  db.Auth.sync()
  db.TaskOfUser.sync()
}

initialDB()

module.exports = {
  db: db,
}

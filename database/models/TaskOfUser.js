const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define(
    'TaskOfUser',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      tableName: 'TaskOfUser',
    }
  )
}

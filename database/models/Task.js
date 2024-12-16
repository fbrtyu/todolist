const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Task',
    }
  )
}

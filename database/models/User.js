const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'User',
    }
  )
}

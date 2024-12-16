const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define(
    'Auth',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      accessToken: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Auth',
    }
  )
}

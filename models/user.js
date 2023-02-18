'use strict';

const UserModel = function (sequelize, DataTypes) {
  return sequelize.define(
    'User',
    {
      Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isEmail: DataTypes.BOOLEAN,
      IsActive: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
};

module.exports = UserModel;

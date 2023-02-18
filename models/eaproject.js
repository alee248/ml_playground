'use strict';

const EaProject = function (sequelize, DataTypes) {
  return sequelize.define(
    'EaProject',
    {
      Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Description: DataTypes.STRING(),
      Goal: DataTypes.STRING()
    },
    {
      timestamps: false,
    }
  );
};

module.exports = EaProject;

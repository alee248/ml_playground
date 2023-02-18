'use strict';

//+FK DeidPatient, EaProject, EaBinFile, EaNote
const EaProjectModel = function (sequelize, DataTypes) {
  return sequelize.define(
    'EaProjectModel',
    {
      Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      ProjectId: DataTypes.INTEGER,
      ModelId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};

module.exports = EaProjectModel;

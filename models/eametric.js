'use strict';

const EaMetric = function (sequelize, DataTypes) {
  return sequelize.define(
    'EaMetric',
    {
      Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      ProjectModelId: DataTypes.INTEGER,
      Name: DataTypes.STRING(100),
      Value: DataTypes.STRING(),
      UserId: DataTypes.INTEGER,
      Date: DataTypes.Date,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = EaMetric;
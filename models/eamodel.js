'use strict';

const EaModel = function (sequelize, DataTypes) {
  return sequelize.define(
    'EaModel',
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
      Date: {
        type: DataTypes.DATE,
      },
      Version: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Details: DataTypes.TEXT,
      Intended_use: DataTypes.TEXT,
      Factors: DataTypes.TEXT,
      Training_data: DataTypes.TEXT,
      Evaluation_data: DataTypes.TEXT,
      Ethical_consid: DataTypes.TEXT,
      Licence: DataTypes.STRING(),
      Caveats_Recs: DataTypes.TEXT,
      FilePath: DataTypes.STRING(),
    },
    {
      timestamps: true,
    }
  );
};

module.exports = EaModel;

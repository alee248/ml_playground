'use strict';

const EaCommentModel = function (sequelize, DataTypes) {
  return sequelize.define(
    'EaComment',
    {
      Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      UserId: DataTypes.INTEGER,
      ModelId: DataTypes.INTEGER,
      Comment: DataTypes.TEXT,
      Visibility: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = EaCommentModel;

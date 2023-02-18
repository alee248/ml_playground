'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.EaProject.hasMany(EaProjectModel);
db.EaProjectModel.belongsTo(db.EaProject,{
    foreignKey: 'ProjectId'
});

db.EaModel.hasOne(EaProjectModel);
db.EaProjectModel.belongsTo(db.EaModel,{
    foreignKey: 'ModelId'
});

db.EaProjectModel.hasOne(EaMetric);
db.EaMetric.belongsTo(db.EaProjectModel,{
    foreignKey: 'ProjectModelId'
});

db.User.hasMany(EaMetric);
db.EaMetric.belongsTo(db.User,{
    foreignKey: 'UserId'
});

db.User.hasMany(EaComment);
db.EaComment.belongsTo(db.User,{
    foreignKey: 'UserId'
});

db.EaModel.hasOne(EaComment);
db.EaComment.belongsTo(db.EaModel,{
    foreignKey: 'ModelId'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

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

db.User.hasMany(db.Comment)
db.Comment.belongsTo(db.User, {
    foreignKey: 'UserId',
    targetKey: 'Id'
})

db.User.hasMany(db.Metrics)
db.Metrics.belongsTo(db.User, {
    foreignKey: 'UserId',
    targetKey: 'Id'
})

db.Project.hasMany(db.ProjectModel)
db.ProjectModel.belongsTo(db.Project, {
    foreignKey: 'ProjectId',
    targetKey: 'Id'
})

db.Model.hasMany(db.ProjectModel)
db.ProjectModel.belongsTo(db.Model, {
    foreignKey: 'ModelId',
    targetKey: 'Id'
})

db.Model.hasMany(db.Comment)
db.Comment.belongsTo(db.Model, {
    foreignKey: 'ModelId',
    targetKey: 'Id'
})

db.Model.belongsToMany(db.Project, {
    through: db.ProjectModel,
    sourceKey: 'Id',
    targetKey: 'Id'
})
db.Project.belongsToMany(db.Model, {
    through: db.ProjectModel,
    sourceKey: 'Id',
    targetKey: 'Id'
})

db.Model.hasMany(db.Result)
db.Result.belongsTo(db.Model, {
    foreignKey: 'ModelId',
    targetKey: 'Id'
})

db.User.hasMany(db.Result)
db.Result.belongsTo(db.User, {
    foreignKey: 'UserId',
    targetKey: 'Id'
})

db.Comment.hasMany(db.Comment, {
    foreignKey: 'ReplyTo',
    targetKey: 'Id',
    as: 'ChildComment'
})
db.Comment.belongsTo(db.Comment, {
    foreignKey: 'ReplyTo',
    targetKey: 'Id',
    as: 'ParentComment'
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
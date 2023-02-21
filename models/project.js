const ProjectModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'Project',
        {
            Id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Goal: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 1
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports =  ProjectModel;
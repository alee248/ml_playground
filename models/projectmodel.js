const ProjectModelModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'ProjectModel',
        {
            Id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            ProjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ModelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports =  ProjectModelModel;
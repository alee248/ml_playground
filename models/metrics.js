const MetricsModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'Metrics',
        {
            Id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            ProjectModelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Value: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Date: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        },
        {
            timestamps: false,
        }
    );
};

module.exports =  MetricsModel;
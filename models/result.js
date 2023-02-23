const ResultModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'Result',
        {
            Id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            Value: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Prob: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Queuing'
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ModelId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            FileName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Datetime: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            timestamps: false,
        }
    );
};

module.exports =  ResultModel;
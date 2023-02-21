const ModelModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'Model',
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
            Type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            Version: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Details: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            IntendedUse: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Factors: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            TrainingData: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            EvalData: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            EthicalConsid: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            CaveatsRecs: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Licence: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            FilePath: {
                type: DataTypes.TEXT,
                allowNull: true
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports =  ModelModel;
const CommentModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'Comment',
        {
            Id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ModelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Comment: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            Datetime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            Visibility: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports =  CommentModel;
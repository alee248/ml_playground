const UserModel = function (sequelize, DataTypes) {
    return sequelize.define(
        'User',
        {
            Id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            Username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            IsActive: {
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

module.exports =  UserModel;
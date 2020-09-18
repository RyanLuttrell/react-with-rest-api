const {DataTypes, Sequelize} = require('sequelize');
const Course = require('./course');

//Create the User model with specific attributes and requirements

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Sorry but we need a First Name'},
                    notNull: true
                }
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Sorry but we need a Last Name'},
                    notNull: true
                }
            },
            emailAddress: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Sorry but we need an Email Address'},
                    notNull: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Sorry but we need a Password'},
                    notNull: true
                }
            }
        }, {sequelize});
    return User;
}
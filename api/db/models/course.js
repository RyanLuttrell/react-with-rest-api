const {DataTypes, Sequelize} = require('sequelize');
const User = require('./user');

//Create the Course model with specific attributes and requirements

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Sorry but we need a Title'},
                    notNull: true
                }
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Sorry but we need a Description'},
                    notNull: true
                }
            },
            estimatedTime: {
                type: DataTypes.STRING,
            },
            materialsNeeded: {
                type: DataTypes.STRING
            }
        }, {sequelize});
    return Course;
}
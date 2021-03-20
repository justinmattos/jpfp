const faker = require('faker/locale/en_US');
const db = require('./db');
const { Model, DataTypes } = require('sequelize');

const randomGPA = () => {
  return (Math.floor(Math.random() * (400 - 0 + 1)) / 100).toFixed(2);
};

class Student extends Model {}
Student.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageURL: {
      type: DataTypes.STRING,
      defaultValue: faker.image.people,
    },
    GPA: {
      type: DataTypes.STRING,
      defaultValue: randomGPA,
    },
  },
  { sequelize: db, modelName: 'students' }
);

module.exports = Student;

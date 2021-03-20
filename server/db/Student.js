const faker = require('faker/locale/en_US');
const db = require('./db');
const { Model, DataTypes } = require('sequelize');

const randomGPA = () => {
  return (Math.floor(Math.random() * (400 - 0 + 1)) / 100).toFixed(2);
};

class Student extends Model {}
Student.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        throw new Error('Do not set the "fullName" value!');
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    imageURL: {
      type: DataTypes.STRING,
      defaultValue: 'https://picsum.photos/id/237/200',
    },
    GPA: {
      type: DataTypes.FLOAT,
      validate: {
        max: 4.0,
        min: 0.0,
      },
      defaultValue: randomGPA,
    },
  },
  { sequelize: db, modelName: 'students' }
);

module.exports = Student;

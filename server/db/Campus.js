const faker = require('faker/locale/en_US');
const db = require('./db');
const { Model, DataTypes } = require('sequelize');

class Campus extends Model {}
Campus.init(
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: 'https://picsum.photos/id/237/200',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    detail: {
      type: DataTypes.TEXT,
      defaultValue: faker.lorem.paragraph,
    },
  },
  { sequelize: db, modelName: 'campuses' }
);

module.exports = Campus;
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
      defaultValue: 'https://picsum.photos/id/870/200',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: faker.lorem.paragraph,
    },
  },
  { sequelize: db, modelName: 'campuses', timestamps: false }
);

module.exports = Campus;

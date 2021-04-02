const faker = require('faker/locale/en_US');
const db = require('./db');
const { Model, DataTypes } = require('sequelize');
const Student = require('./Student');

class Campus extends Model {}
Campus.init(
  {
    campusId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
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
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.address1}\n${this.address2}`;
      },
      set() {
        return new Error('Do not set the "address" value directly!');
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

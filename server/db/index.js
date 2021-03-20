const faker = require('faker/locale/en_US');
const db = require('./db');
const Campus = require('./Campus');
const Student = require('./Student');

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = { db, models: { Campus, Student } };

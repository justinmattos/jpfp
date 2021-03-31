const faker = require('faker/locale/en_US');
const db = require('./db');
const Campus = require('./Campus');
const Student = require('./Student');

Student.belongsTo(Campus, { foreignKey: 'campusId' });
Campus.hasMany(Student, { foreignKey: 'campusId' });

module.exports = { db, models: { Campus, Student } };

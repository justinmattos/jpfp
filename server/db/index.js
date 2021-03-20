const faker = require('faker/locale/en_US');
const db = require('./db');
const Campus = require('./Campus');
const Student = require('./Student');

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = () => {
  return new Promise((res, rej) => {
    let SEED = 1729;
    const seedCampus = Array(20)
      .fill('')
      .map((e) => {
        const fakeCity = faker.address.city();
        const fakeName = `${fakeCity} University`;
        const fakeAddress = faker.fake(
          `{{address.streetAddress}}\n${fakeCity}, {{address.stateAbbr}} {{address.zipCode}}`
        );
        const fakeImageURL = `${faker.image.lorempicsum.image()}?random=${SEED++}`;
        return new Campus({
          name: fakeName,
          address: fakeAddress,
          imageURL: fakeImageURL,
        });
      });
    db.sync({ force: true })
      .then(() => {
        console.log('db connected, now seeding . . . ');
        return Promise.all(seedCampus.map((campus) => campus.save()));
      })
      .then(() => {
        return Promise.all(
          seedCampus.map((campus) => {
            const seedStudents = Array(Math.floor(Math.random() * 501))
              .fill('')
              .map((e) => {
                const fakeName = faker.fake(
                  '{{name.firstName}} {{name.lastName}}'
                );
                const fakeImageURL = `${faker.image.lorempicsum.image()}?random=${SEED++}`;
                return new Student({ name: fakeName, imageURL: fakeImageURL });
              });
            return Promise.all(
              seedStudents.map((student) => {
                student.campusId = campus.id;
                student.save();
              })
            );
          })
        );
      })
      .then(() => {
        res();
        console.log('db seeded');
      })
      .catch((err) => rej(err));
  });
};

module.exports = { db, models: { Campus, Student }, syncAndSeed };
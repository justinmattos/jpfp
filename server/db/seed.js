const faker = require('faker/locale/en_US');
const {
  db,
  models: { Campus, Student },
} = require('./index');

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
    const seedStudents = seedCampus.map((campus) => {
      const seedCampusStudents = Array(Math.ceil(Math.random() * 499) + 1)
        .fill('')
        .map((e) => {
          const fakeFirstName = faker.name.firstName();
          const fakeLastName = faker.name.lastName();
          const fakeEmail = faker.internet.email();
          const fakeImageURL = `${faker.image.lorempicsum.image()}?random=${SEED++}`;
          return new Student({
            firstName: fakeFirstName,
            lastName: fakeLastName,
            email: fakeEmail,
            imageURL: fakeImageURL,
          });
        });
      return { campus, seedCampusStudents };
    });
    db.sync({ force: true })
      .then(() => {
        console.log('db connected, now seeding . . . ');
        return Promise.all(seedCampus.map((campus) => campus.save()));
      })
      .then(() => {
        return Promise.all(
          seedStudents.map(({ campus, seedCampusStudents }) => {
            seedCampusStudents.forEach((student) => {
              student.campusId = campus.id;
            });
            return Promise.all(
              seedCampusStudents.map((student) => student.save())
            );
          })
        );
      })
      .then(() => {
        db.close();
        console.log('db seeded');
        res();
      })
      .catch((err) => rej(err));
  });
};

syncAndSeed().catch((err) => {
  db.close();
  console.error(err);
});

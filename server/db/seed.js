const faker = require('faker/locale/en_US');
const {
  db,
  models: { Campus, Student },
} = require('./index');

const syncAndSeed = () => {
  return new Promise((res, rej) => {
    let SEED = 1729,
      num = 1;
    const seedCampus = Array(100 + Math.round(25 - Math.random() * 50))
      .fill('')
      .map((e) => {
        const fakeCity = faker.address.city();
        const fakeName = `${fakeCity} University`;
        const fakeAddress1 = faker.address.streetAddress();
        const fakeAddress2 = faker.fake(
          `${fakeCity}, {{address.stateAbbr}} {{address.zipCode}}`
        );
        const fakeImageURL = `${faker.image.lorempicsum.image()}?random=${SEED++}`;
        return new Campus({
          name: fakeName,
          address1: fakeAddress1,
          address2: fakeAddress2,
          imageURL: fakeImageURL,
        });
      });
    const seedStudents = seedCampus.map((campus) => {
      const seedCampusStudents = Array(
        100 + Math.round(25 - Math.random() * 50)
      )
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
          seedStudents.map(({ campus: { campusId }, seedCampusStudents }) => {
            seedCampusStudents.forEach((student) => {
              student.campusId = campusId;
            });
            return Promise.all(
              seedCampusStudents.map((student) => student.save())
            ).then(() =>
              console.log(
                `Campus #${num++} seeded with ${
                  seedCampusStudents.length
                } students`
              )
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

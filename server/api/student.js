const { Router, json } = require('express');
const { literal } = require('sequelize');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/student'

const router = Router();

router.use(json({ strict: false }));

//GET /api/student/:sort/:page/:size
router.get('/:sort/:page/:size', (req, res, next) => {
  const { sort, page, size } = req.params;
  const offset = page * size - size,
    limit = size;
  Student.findAndCountAll({
    include: { model: Campus, attributes: ['name'] },
    attributes: {
      exclude: ['email', 'campusId'],
    },
    order: sort === 'sortByGPA' ? [['GPA', 'DESC']] : ['lastName', 'firstName'],
    offset,
    limit,
  })
    .then(({ count, rows }) => {
      const maxPage = Math.ceil(count / size);
      res.send({ currentList: rows, maxPage });
    })
    .catch(next);
});

//POST /api/student
router.post('/', (req, res, next) => {
  const { firstName, lastName, email, imageURL, GPA, campusId } = req.body;
  const student = new Student({ firstName, lastName, imageURL, GPA, email });
  if (!!campusId) {
    student.campusId = campusId;
  }
  student
    .save()
    .then((data) => res.status(201).send(data))
    .catch(next);
});

//PUT /api/student/deregister/:studentId/:campusId
router.put('/deregister/:studentId/:campusId', (req, res, next) => {
  const { studentId, campusId } = req.params;
  Campus.findByPk(campusId)
    .then((campus) => {
      return campus.removeStudent(studentId);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});

//GET /api/student/:studentId
router.get('/:studentId', (req, res, next) => {
  const { studentId } = req.params;
  Student.findByPk(studentId, {
    include: {
      model: Campus,
      attributes: {
        include: [
          [
            literal(`(
            SELECT COUNT(*)
            FROM students
            WHERE
            students."campusId" = campus."campusId"
          )`),
            'students',
          ],
        ],
      },
    },
  })
    .then((data) => res.send(data))
    .catch(next);
});

//PUT /api/student/:studentId
router.put('/:studentId', (req, res, next) => {
  const { studentId } = req.params;
  const { firstName, lastName, email, imageURL, GPA, campusId } = req.body;
  const updatedStudent = { firstName, lastName, email, imageURL, GPA };
  updatedStudent.campusId = !!campusId ? campusId : null;
  Student.update(updatedStudent, { where: { studentId } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});

//DELETE /api/student/:studentId
router.delete('/:studentId', (req, res, next) => {
  const { studentId } = req.params;
  Student.findByPk(studentId)
    .then((student) => {
      return student.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;

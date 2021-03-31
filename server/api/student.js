const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/student'

const router = Router();

router.use(json({ strict: false }));

//GET /api/student
router.get('/', (req, res, next) => {
  Student.findAll({
    include: { model: Campus, attributes: ['name'] },
    attributes: {
      exclude: ['email', 'GPA', 'campusId'],
    },
    order: ['lastName', 'firstName'],
  })
    .then((data) => res.send(data))
    .catch(next);
});

//POST /api/student
router.post('/', (req, res, next) => {
  const student = new Student(req.body);
  student
    .save()
    .then(() => res.sendStatus(201))
    .catch(next);
});

//PUT /api/student/deregister/:studentId/:campusId
router.put('/deregister/:studentId/:campusId', (req, res, next) => {
  const { studentId, campusId } = req.params;
  console.log(studentId, campusId);
  Campus.findByPk(campusId)
    .then((campus) => {
      return campus.removeStudent(studentId * 1);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});

//GET /api/student/:studentId
router.get('/student/:studentId', (req, res, next) => {
  const { studentId } = req.params;
  Student.findByPk(studentId, {
    include: {
      model: Campus,
      include: { model: Student, attributes: ['id'] },
    },
  })
    .then((data) => res.send(data))
    .catch(next);
});

//PUT /api/student/:studentId
router.put('/student/:studentId', (req, res, next) => {
  const { studentId } = req.params;
  const updatedStudent = req.body;
  Student.update(updatedStudent, { where: { studentId } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});

//DELETE /api/student/:studentId
router.delete('/student/:studentId', (req, res, next) => {
  const { studentId } = req.params;
  Student.findByPk(studentId)
    .then((student) => {
      return student.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;

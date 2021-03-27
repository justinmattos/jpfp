const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/students'

const router = Router();

router.use(json({ strict: false }));

//GET /api/studentList
router.get('/', (req, res, next) => {
  Student.findAll({
    include: { model: Campus, attributes: ['name'] },
    attributes: {
      exclude: ['email', 'GPA', 'campusId'],
    },
    order: ['lastName'],
  })
    .then((data) => res.send(data))
    .catch(next);
});

//POST /api/studentList
router.post('/', (req, res, next) => {
  const student = new Student(req.body);
  student
    .save()
    .then(() => res.sendStatus(201))
    .catch(next);
});

//PUT /api/studentList/deregister/:id
router.put('/deregister/:studentId/:campusId', (req, res, next) => {
  const { studentId, campusId } = req.params;
  console.log(studentId, campusId);
  Campus.findByPk(campusId)
    .then((campus) => {
      return campus.removeStudent(studentId * 1);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
  // Student.findByPk(id, { include: { model: Campus } })
  //   .then((student) => {
  //     return student.campus.removeStudent(student);
  //   })
  //   .then(() => res.sendStatus(201))
  //   .catch(next);
});

//GET /api/studentList/student/:id
router.get('/student/:id', (req, res, next) => {
  const { id } = req.params;
  Student.findByPk(id, {
    include: {
      model: Campus,
    },
  })
    .then((data) => res.send(data))
    .catch(next);
});

//DELETE /api/studentList/student/:id
router.delete('/student/:id', (req, res, next) => {
  const { id } = req.params;
  Student.findByPk(id)
    .then((student) => {
      return student.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;

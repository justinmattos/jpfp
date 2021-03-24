const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/students'

const router = Router();

router.use(json({ strict: false }));

//GET /api/students
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

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Student.findByPk(id, {
    include: {
      model: Campus,
      include: {
        model: Student,
        attributes: ['id'],
      },
    },
  })
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = router;

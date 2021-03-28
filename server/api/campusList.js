const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/campusList'

const router = Router();

router.use(json({ strict: false }));

//GET /api/campusList
router.get('/', (req, res, next) => {
  Campus.findAll({
    include: {
      model: Student,
      attributes: ['id'],
    },
    order: ['name'],
    attributes: { exclude: ['address', 'description'] },
  })
    .then((data) => res.send(data))
    .catch(next);
});

//POST /api/campusList
router.post('/', (req, res, next) => {
  const campus = new Campus(req.body);
  campus
    .save()
    .then(() => res.sendStatus(201))
    .catch(next);
});

//GET /api/campusList/campus/:id/:sortStudentsBy
router.get('/campus/:id/:sortStudentsBy', (req, res, next) => {
  const { id, sortStudentsBy } = req.params;
  Campus.findByPk(id, {
    include: {
      model: Student,
    },
    order: [[Student, sortStudentsBy]],
  })
    .then((data) => res.send(data))
    .catch(next);
});

//PUT /api/campusList/campus/:id
router.put('/campus/:id', (req, res, next) => {
  const { id } = req.params;
  const updatedCampus = req.body;
  Campus.update(updatedCampus, { where: { id } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});

//DELETE /api/campusList/campus/:id
router.delete('/campus/:id', (req, res, next) => {
  const { id } = req.params;
  Campus.findByPk(id)
    .then((campus) => {
      return campus.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;

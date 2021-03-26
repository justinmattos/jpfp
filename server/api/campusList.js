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

//GET /api/campusList/campus/:id
router.get('/campus/:id', (req, res, next) => {
  const { id } = req.params;
  Campus.findByPk(id, {
    include: {
      model: Student,
    },
  })
    .then((data) => res.send(data))
    .catch(console.error);
});

module.exports = router;

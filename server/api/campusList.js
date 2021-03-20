const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/campusList'

const router = Router();

router.use(json({ strict: false }));

//GET /api/campusList
router.get('/', (req, res, next) => {
  Campus.findAll({ include: Student, order: ['name'] })
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = router;

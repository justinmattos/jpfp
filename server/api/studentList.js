const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/students'

const router = Router();

router.use(json({ strict: false }));

//GET /api/students
router.get('/', (req, res, next) => {
  Student.findAll()
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = router;

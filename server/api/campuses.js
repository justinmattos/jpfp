const { Router, json } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/campuses'

const router = Router();

router.use(json({ strict: false }));

//GET /api/campuses
router.get('/', (req, res, next) => {
  Campus.findAll()
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = router;

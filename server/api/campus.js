const { Router, json, urlencoded } = require('express');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/campus'

const router = Router();

router.use(json({ strict: false }));

//GET /api/campus
router.get('/', (req, res, next) => {
  let campusList = [];
  Campus.findAll({
    order: ['name'],
    attributes: { exclude: ['address', 'description'] },
  })
    .then((data) => {
      campusList = data;
      return Promise.all(
        campusList.map(({ campusId }) => {
          return Student.count({ where: { campusId } });
        })
      );
    })
    .then((data) => {
      console.log(data);
      data.forEach((val, idx) => {
        campusList[idx] = { ...campusList[idx].dataValues, students: val };
      });
      res.send(campusList);
    })
    .catch(next);
});

//POST /api/campus
router.post('/', (req, res, next) => {
  const campus = new Campus(req.body);
  campus
    .save()
    .then(() => res.sendStatus(201))
    .catch(next);
});

//GET /api/campus/:campusId
router.get('/:campusId', (req, res, next) => {
  const { campusId } = req.params;
  Campus.findByPk(campusId)
    .then((data) => res.send(data))
    .catch(next);
});

//PUT /api/campus/:campusId
router.put('/:campusId', (req, res, next) => {
  const { campusId } = req.params;
  const updatedCampus = req.body;
  Campus.update(updatedCampus, { where: { campusId } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});

//DELETE /api/campus/:campusId
router.delete('/:campusId', (req, res, next) => {
  const { campusId } = req.params;
  Campus.findByPk(campusId)
    .then((campus) => {
      return campus.destroy();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

//GET /api/campus/:campusId/students/:page/:size/:sort
router.get('/:campusId/students/:page/:size/:sort', (req, res, next) => {
  const { campusId, page, size, sort } = req.params;
  const offset = page * size - size,
    limit = size;
  Student.findAll({ where: { campusId }, offset, limit, order: [sort] })
    .then((students) => res.send(students))
    .catch(next);
});

module.exports = router;

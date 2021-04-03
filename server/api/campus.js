const { Router, json } = require('express');
const { literal } = require('sequelize');
const {
  models: { Campus, Student },
} = require('../db');

//This router is mounted at '/api/campus'

const router = Router();

router.use(json({ strict: false }));

//GET /api/campus/all
router.get('/all', (req, res, next) => {
  Campus.findAll({
    attributes: {
      include: ['name'],
    },
    order: ['name'],
  })
    .then((data) => res.send({ currentList: data, maxPage: 0 }))
    .catch(next);
});

//GET /api/campus/:sort/:page/:size
router.get('/:sort/:page/:size', (req, res, next) => {
  const { sort, page, size } = req.params;
  const offset = page * size - size,
    limit = size;
  Campus.findAndCountAll({
    attributes: {
      exclude: ['address', 'description'],
      include: [
        [
          literal(`(
                SELECT COUNT(*)
                FROM students
                WHERE
                students."campusId" = campuses."campusId"
                )`),
          'students',
        ],
      ],
    },
    order: [
      sort === 'sortByStudents'
        ? [literal('students'), 'DESC']
        : ['name', 'ASC'],
    ],
    offset,
    limit,
  })
    .then(({ count, rows }) => {
      const maxPage = Math.ceil(count / size);
      res.send({ currentList: rows, maxPage });
    })
    .catch(next);
});

//POST /api/campus
router.post('/', (req, res, next) => {
  const { name, address1, address2, imageURL, description } = req.body;
  const campus = new Campus({
    name,
    address1,
    address2,
    imageURL,
    description,
  });
  campus
    .save()
    .then((data) => res.status(201).send(data))
    .catch(next);
});

//GET /api/campus/:campusId
router.get('/:campusId', (req, res, next) => {
  const { campusId } = req.params;
  Campus.findByPk(campusId, {
    attributes: {
      include: [
        [
          literal(`(
        SELECT COUNT(*)
        FROM students
        WHERE
        students."campusId" = campuses."campusId"
      )`),
          'students',
        ],
      ],
    },
  })
    .then((data) => res.send(data))
    .catch(next);
});

//PUT /api/campus/:campusId
router.put('/:campusId', (req, res, next) => {
  const { campusId } = req.params;
  const { name, address1, address2, imageURL, description } = req.body;
  Campus.update(
    { name, address1, address2, imageURL, description },
    { where: { campusId } }
  )
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

//GET /api/campus/:campusId/students/:sort/:page/:size
router.get('/:campusId/students/:sort/:page/:size', (req, res, next) => {
  const { campusId, page, size, sort } = req.params;
  const offset = page * size - size,
    limit = size;
  Student.findAndCountAll({
    where: { campusId },
    offset,
    limit,
    order:
      sort === 'sortByName' ? ['lastName', 'firstName'] : [['GPA', 'DESC']],
  })
    .then(({ count, rows }) => {
      const maxPage = Math.ceil(count / size);
      res.send({ currentList: rows, maxPage });
    })
    .catch(next);
});

module.exports = router;

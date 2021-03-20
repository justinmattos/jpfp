const { Router } = require('express');
const router = Router();

router.use('/campusList', require('./campusList'));
router.use('/studentList', require('./studentList'));

module.exports = router;

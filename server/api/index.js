const { Router } = require('express');
const router = Router();

router.use('/campuses', require('./campuses'));
// router.use('/students', require('./students'));

module.exports = router;

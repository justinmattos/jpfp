const { Router } = require('express');
const router = Router();

router.use('/campus', require('./campus'));
router.use('/student', require('./student'));

module.exports = router;

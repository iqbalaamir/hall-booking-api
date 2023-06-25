const express = require('express');
const router = express.Router();

router.use('/', require('./roomRoutes'));
router.use('/', require('./bookingRoutes')); 

module.exports = router;

const express = require('express'),
    router = express.Router();
// Requiere controller modules
let front = require('../controller/frontCtrl'),
    // admin = require('../controller/adminCtrl'),
    auth = require('../controller/authCtrl');

/* General */
router.get('/', front.inicio);
router.get('/:xxx/:yyy', front.extV);

module.exports = router;
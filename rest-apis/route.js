var express = require('express');
var router = express.Router();

let { getAllVehicleTypes } = require('./controller');

router.get('/fetch/allVehicleTypes', getAllVehicleTypes)

module.exports = router;
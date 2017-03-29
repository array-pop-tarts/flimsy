/**
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var express = require('express');
var router = new express.Router();

var controller = require('./controller');

router.get('/', controller.index);

module.exports = router;
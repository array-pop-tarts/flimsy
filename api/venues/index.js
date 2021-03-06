/**
 * api/venues/index
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var express = require('express');
var router = new express.Router();

var controller = require('./controller');

router.get('/', controller.index)
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
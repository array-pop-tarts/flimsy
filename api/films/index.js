/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var express = require('express');
var router = new express.Router();

var controller = require('./controller');

router.get('/', controller.index);
router.get('/imdbIds', controller.findByImdbIds);
router.get('/:imdbId', controller.show);

router.post('/', controller.create);
router.put('/:id', controller.update);

router.post('/:id/screening', controller.createScreening);
router.post('/:id/medium', controller.createMedium);

module.exports = router;
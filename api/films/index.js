/**
 * Author: Barbara Goss
 * Created: 2017-03-12
 */

let express = require('express');
let router = new express.Router();

let controller = require('./controller');

router.get('/', controller.index);
router.get('/imdbIds', controller.findByImdbIds);
router.get('/:id', controller.show);

router.post('/', controller.create);

router.post('/:id/medium', controller.createMedium);
router.put('/:id/medium', controller.updateMedium);
router.put('/:id/media', controller.updateDeletedMedia);

module.exports = router;
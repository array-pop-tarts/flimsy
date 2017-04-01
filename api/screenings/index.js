/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-30
 */
let express = require('express');
let router = new express.Router();

let controller = require('./controller');

router.get('/', controller.index);

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
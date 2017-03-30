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

module.exports = router;
/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

var MediumSchema = new mongoose.Schema({
    type: String,
    acquired: Number
});

module.exports = mongoose.model('Medium', MediumSchema);
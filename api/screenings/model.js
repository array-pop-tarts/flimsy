/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

var ScreeningSchema = new mongoose.Schema({
    date: Number
});

module.exports = mongoose.model('Screening', ScreeningSchema);
/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

var MediumSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["BluRay", "DVD"]
    },
    acquired: Number
});

module.exports = MediumSchema;
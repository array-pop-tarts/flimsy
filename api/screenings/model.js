/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

var Venue = require('../venues/model');

var ScreeningSchema = new mongoose.Schema({
    date: Number,
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
});

module.exports = ScreeningSchema;
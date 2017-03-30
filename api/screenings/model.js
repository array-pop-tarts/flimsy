/**
 * Author: Barbara Goss
 * Created: 2017-03-30
 */

let mongoose = require('mongoose');

let Venue = require('../venues/model');
let Friend = require('../friends/model');

let ScreeningSchema = new mongoose.Schema({
    date: Number,
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Friend',
        default: []
    }
});

module.exports = mongoose.model('Screening', ScreeningSchema);
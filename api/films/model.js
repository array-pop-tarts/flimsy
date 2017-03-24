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

var Venue = require('../venues/model');
var User = require('../users/model');

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

var currentDate = new Date();
var currentYear = currentDate.getFullYear();

var FilmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    translation: String,
    released: {
        type: Number,
        required: true,
        min: 1888,
        max: currentYear
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    media: {
        type: [MediumSchema],
        default: []
    },
    screenings: {
        type: [ScreeningSchema],
        default: []
    }
});

module.exports = mongoose.model('Film', FilmSchema);
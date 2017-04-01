/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
let mongoose = require('mongoose');

let MediumSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["BluRay", "DVD"]
    },
    acquired: Number
});

let Screening = require('../screenings/model');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

let FilmSchema = new mongoose.Schema({
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
    imdbId: String,
    poster: String,
    screened: Number,
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Screening",
        default: []
    }
});

module.exports = mongoose.model('Film', FilmSchema);
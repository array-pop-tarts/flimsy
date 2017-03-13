/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

var FilmSchema = new mongoose.Schema({
    title: String,
    translation: String,
    released: Number,
    rating: Number,
    media: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Medium'
    }
});

module.exports = mongoose.model('Film', FilmSchema);
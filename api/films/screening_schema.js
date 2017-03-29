/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-29
 */
let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    date: Number,
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Friend',
        default: []
    }
});
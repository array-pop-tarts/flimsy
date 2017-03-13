/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Venue', VenueSchema);
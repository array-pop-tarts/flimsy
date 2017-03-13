/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Venue = require('./model');

exports.index = function (req, res) {
    Venue.find()
        .then(venues => res.send(venues))
        .catch(err => {
            res.status(404);
            res.send("Not found");
        });
};
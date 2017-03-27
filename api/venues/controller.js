/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Venue = require('./model');

exports.index = function (req, res) {
    let query = {};
    if (req.query.name) {
        query.name = {$regex: req.query.name, $options: 'i'};
    }

    Venue.find(query)
        .then(venues => res.send(venues))
        .catch(err => {
            res.status(404);
            res.send(err.message);
        });
};

exports.create = function (req, res) {
    let venue = new Venue();
    venue.name = req.body.name;
    venue.save()
        .then(venue => {
            res.send(venue);
        })
        .catch(err => {
            res.send(err.message);
        });
};
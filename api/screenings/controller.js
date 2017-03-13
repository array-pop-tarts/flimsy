/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Screening = require('./model');

exports.index = function (req, res) {
    Screening.find()
        .then(screenings => res.send(screenings))
        .catch(err => {
            res.status(404);
            res.send("Not found");
        });
};
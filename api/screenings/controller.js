/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-30
 */
let Screening = require('./model');

exports.index = function (req, res) {
    Screening.find()
        .then(screenings => res.send(JSON.stringify(screenings)))
        .catch(err => res.send(err));
};
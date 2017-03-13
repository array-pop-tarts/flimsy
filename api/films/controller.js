/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Film = require('./model');

exports.index = function (req, res) {
    Film.find()
        .then(films => res.send(films))
        .catch(err => {
            res.status(404);
            res.send("Not found");
        });
};
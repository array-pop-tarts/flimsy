/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Film = require('./model');

exports.index = function (req, res) {
    Film.find()
        .populate([
            { path: "screenings.venue", model: "Venue" },
            { path: "screenings.users", model: "User" }
        ])
        .then(films => res.send(films))
        .catch(err => {
            console.log(err);
            res.status(404);
            res.send("Not found");
        });
};
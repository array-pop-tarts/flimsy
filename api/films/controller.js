/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Film = require('./model');

exports.index = function (req, res) {
    Film.find().populate({
        path: "screenings",
        populate: [
            {path: "venue", model: "Venue"},
            {path: "users", model: "User"}
            ]}).exec()
        .then(films => res.send(films))
        .catch(err => {
            console.log(err);
            res.status(404);
            res.send("Not found");
        });
};
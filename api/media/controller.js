/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var Medium = require('./model');

exports.index = function (req, res) {
    Medium.find()
        .then(media => res.send(media))
        .catch(err => {
            res.status(404);
            res.send("Not found");
        });
};
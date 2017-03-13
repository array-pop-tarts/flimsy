/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var User = require('./model');

exports.index = function (req, res) {
    User.find()
        .then(users => res.send(users))
        .catch(err => {
            res.status(404);
            res.send("Not found");
        });
};
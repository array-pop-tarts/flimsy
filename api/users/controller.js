/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var User = require('./model');

exports.index = function (req, res) {
    let query = {};
    if (req.query.name) {
        query.name = {$regex: req.query.name, $options: 'i'};
    }

    User.find(query)
        .then(users => res.send(users))
        .catch(err => {
            res.send(err.message);
        });
};
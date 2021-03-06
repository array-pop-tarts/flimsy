/**
 * Author: Barbara Goss
 * Created: 2017-03-28
 */
let Friend = require('./model');

exports.index = function (req, res) {
    let query = {};
    if (req.query.name) {
        query.name = {$regex: req.query.name, $options: 'i'};
    }

    Friend.find(query)
        .then(friends => res.send(JSON.stringify(friends)))
        .catch(err => res.send(err));
};

exports.update = function (req, res) {
    Friend.findById(req.params.id)
        .then(friend => {
            friend.name = req.body.name;
            friend.save()
                .then()
                .catch(err => res.send(err));
        });
};
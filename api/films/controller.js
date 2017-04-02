/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */

let Film = require('./model');
let Screening = require('../screenings/model');
let Friend = require('../friends/model');

exports.index = function (req, res) {
    let query = {};
    if (req.query.search)
        query.title = { $regex: req.query.search, $options: 'i'};

    Film.find(query)
        .populate({
            path: "screenings",
            model: "Screening",
            populate: [
                {path: "venue", model: "Venue"},
                {path: "friends", model: "Friend"}
            ]
        })
        .then(films => res.send(films))
        .catch(err => res.send(err));
};

exports.show = function (req, res) {
    Film.findOne({imdbId: req.params.imdbId})
        .then(film => res.send(JSON.stringify(film)))
        .catch(err => res.send(err));
};

exports.create = function (req, res) {
    let film = new Film();
    film.title = req.body.title;
    film.released = req.body.released;
    film.imdbId = req.body.imdbId;
    film.poster = req.body.poster;
    film.save()
        .then(() => res.send(film))
        .catch(err => res.send(err));
};

exports.createMedium = function (req, res) {
    Film.findById(req.params.id)
        .then((film) => {
            film.media.push({
                acquired: req.body.acquired,
                type: req.body.type
            });
            film.save()
                .then((film) => {
                    res.send(film);
                })
                .catch((err) => {
                    res.status(422);
                    res.send(err);
                });
        })
        .catch((err) => res.send(err));
};

exports.updateDeletedMedia = function (req, res) {
    Film.findById(req.params.id)
        .then((film) => {
            film.media = req.body.media;
            film.save()
                .then(() => res.sendStatus(200))
                .catch(err => res.send(err));
        })
        .catch((err) => res.send(err));
};

exports.updateMedium = function(req, res) {
    Film.findById(req.params.id)
        .then(film => {
            let media = film.media.map(medium => {
                if (medium._id == req.body._id)
                    return {
                        _id: req.body._id,
                        type: req.body.type,
                        acquired: req.body.acquired
                    };
                else {
                    return medium;
                }
            });
            film.media = media;
            film.save()
                .then(film => res.send(film))
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
};

exports.findByImdbIds = function (req, res) {
    let imdbIds = req.query.imdbIds.split(",");
    Film.find({imdbId: imdbIds})
        .then(films => res.send(films))
        .catch(err => res.send(err));
};
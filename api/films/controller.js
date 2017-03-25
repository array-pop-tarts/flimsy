/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var mongoose = require('mongoose');

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

exports.create = function (req, res) {

};

exports.update = function (req, res) {
    Film.findById(req.params.id)
        .then((film) => {

        })
        .catch((err) => {
            res.status(404);
            res.send("Film not found")
        });
};

exports.createScreening = function (req, res) {
    Film.findById(req.params.id)
        .then((film) => {
            film.screenings.push({
                date: req.body.date,
                venue: req.body.venue,
                users: req.body.users
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
        .catch((err) => {
            res.status(404);
            res.send(err.message)
        });
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
        .catch((err) => {
            res.status(404);
            res.send(err.message)
        });
};
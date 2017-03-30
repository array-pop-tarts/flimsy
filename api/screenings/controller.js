/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-30
 */
let Screening = require('./model');
let Film = require('../films/model');

exports.index = function (req, res) {
    Screening.find()
        .then(screenings => res.send(JSON.stringify(screenings)))
        .catch(err => res.send(err));
};

exports.create = function (req, res) {
    let screening = new Screening();

    screening.user = req.body.user;
    screening.film = req.body.film;
    screening.date = req.body.date;
    screening.venue = req.body.venue;
    screening.friends = req.body.friends;

    screening.save()
        .then(screening => {
            Film.findById(screening.film)
                .then(film => {
                    film.screenings.push(screening._id);

                    let timestamp = new Date(screening.date);
                    let screeningYear = timestamp.getFullYear();
                    if (!(film.hasOwnProperty('screened')) || film.screened > screeningYear)
                        film.screened = screeningYear;

                    film.save(screening => res.send(screening));
                })
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
};
/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-30
 */
let Screening = require('./model');
let Film = require('../films/model');
let Venue = require('../venues/model');
let Friend = require('../friends/model');

exports.index = function (req, res) {
    Screening.find()
        .then(screenings => res.send(JSON.stringify(screenings)))
        .catch(err => res.send(err));
};

exports.create = function (req, res) {
    let screening = new Screening();

    //screening.user = req.body.user;
    screening.film = req.body.film;
    screening.date = req.body.date;

    let venue = req.body.venue;
    if (! venue.hasOwnProperty('_id')) {
        let newVenue = new Venue();
        venue._id = newVenue._id;

        newVenue.name = venue.name;
        newVenue.save()
            .then()
            .catch(err => res.send(err));
    }

    let friends = req.body.friends;
    if (friends.length > 0) {
        friends.map((friend, i) => {
            if (!friend.hasOwnProperty('_id')) {
                let newFriend = new Friend();
                friends[i]._id = newFriend._id;

                newFriend.name = friend.name;
                newFriend.save()
                    .then()
                    .catch(err => res.send(err));
            }
        });
    }

    screening.venue = venue;
    screening.friends = friends;

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
                });
        })
        .catch(err => res.send(err));
};

exports.update = function (req, res) {

};

exports.destroy = function (req, res) {
    Screening.findById(req.params.id)
        .then((screening) => {
            screening.remove();
            Film.findById(screening.film)
                .populate({path: "screenings", model: "Screening"})
                .then(film  => {
                    film.screenings.remove(screening._id);
                    if (film.screenings.length > 0) {
                        let minTimestamp = Math.min.apply(Math, film.screenings.map(screening => screening.date));
                        let minDate = new Date(minTimestamp);
                        let screenedYear = minDate.getFullYear();
                        film.screened = screenedYear;
                    }
                    else {
                        film.screened = null;
                    }
                    film.save()
                        .then(() => res.send(200))
                        .catch(err => res.send(err));
                })
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
};

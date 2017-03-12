/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';
import firebase from 'firebase';

import Film from './film';

class Films extends React.Component {

    constructor() {
        super();

        this.state = {
            films: [{}],
            screenings: {},
            venues: {},
            users: {},
            media: {},

            showFilmForm: false,

            loaded_screenings: false,
            loaded_films: false,
            loaded_venues: false,
            loaded_users: false,
            loaded_media: false
        };

        this.toggleFilmForm = this.toggleFilmForm.bind(this);

        this.getScreenings = this.getScreenings.bind(this);
        this.getVenueForScreening = this.getVenueForScreening.bind(this);
        this.getUsersForScreening = this.getUsersForScreening.bind(this);
    }

    render() {
        if (this.state.loaded_screenings
            && this.state.loaded_films
            && this.state.loaded_venues
            && this.state.loaded_users
            && this.state.loaded_media
        ) {
            return (
                <div className="masonry">
                    <div className="brick">
                        <div className="card film-card film-form-placeholder" onClick={ this.toggleFilmForm } >
                            <div className="card-block">
                                <i className="fa fa-plus fa-3x fa-inverse"></i>
                            </div>
                        </div>
                    </div>
                    {this.state.films.map((film, i) => {
                        return (
                            <Film film={ film }
                                  key={ i }
                                  i={ i }
                                  screeningsInfo={ this.getScreenings(film) }
                                  mediaInfo={ this.getMedia(film) }
                                  venuesList={ this.state.venues }
                            />
                        );
                    })}
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }

    toggleFilmForm() {
        let showFilmForm = ! this.state.showFilmForm;
        this.setState({showFilmForm: showFilmForm});
    }

    getScreenings(film) {
        if (!film.screenings) { return []; }
        let filmScreenings = [];
        Object.keys(this.state.screenings).forEach(function(id) {
            if (film.screenings[id] !== undefined) {
                let screening = this.state.screenings[id];
                screening.key = id;
                screening.venueInfo = this.getVenueForScreening(screening);
                screening.usersInfo = this.getUsersForScreening(screening);
                filmScreenings.push(screening);
            }
        }, this);

        filmScreenings.reverse();
        return filmScreenings;
    }

    getVenueForScreening(screening) {
        return this.state.venues[screening.venue];
    }

    getUsersForScreening(screening) {
        if (!screening.users) { return []; }
        return Object.keys(screening.users).map(id => {
            let user = this.state.users[id];
            user.key = id;
            return user;
        });
    }

    getMedia(film) {
        if (!film.media) { return []; }
        return Object.keys(film.media).map(id => {
            let medium = this.state.media[id];
            medium.key = id;
            return medium;
        });
    }

    componentDidMount() {
        let fireFilms = firebase.database().ref('films');

        fireFilms.on('child_added', (snapshot) => {
            const film = snapshot.val();
            film.id = snapshot.key;

            this.setState({
                films: [...this.state.films, film],
                loaded_films: true
            });
        });

        fireFilms.on('child_changed', (snapshot) => {
            const films = this.state.films.map(film => {
                if (film.id !== snapshot.key) {
                    return film;
                }
                else {
                    let newFilm = snapshot.val();
                    newFilm.id = snapshot.key;
                    return newFilm;
                }
            });

            this.setState({films: films});
        });

        let fireScreenings = firebase.database().ref('screenings');
        fireScreenings.orderByChild("date").on('value', snapshot => {
            let screenings = {};
            snapshot.forEach(function (screening) {
                screenings[screening.key] = screening.val();
            });
            this.setState({
                screenings: screenings,
                loaded_screenings: true
            });
        });

        let fireVenues = firebase.database().ref('venues');
        fireVenues.orderByChild('name').on('value', snapshot => {
            this.setState({
                venues: snapshot.val(),
                loaded_venues: true
            });
        });

        let fireUsers = firebase.database().ref('users');
        fireUsers.on('value', snapshot => {
            this.setState({
                users: snapshot.val(),
                loaded_users: true
            });
        });

        let fireMedia = firebase.database().ref('media');

        fireMedia.on('value', snapshot => {
            this.setState({
                media: snapshot.val(),
                loaded_media: true
            });
        });
    }
}

export default Films;
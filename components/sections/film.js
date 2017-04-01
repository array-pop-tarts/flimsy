/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';
import firebase from 'firebase';

import FilmInfo from './film/film-info';

import Rating from './film/rating';
import Screenings from './film/screenings';
import AddScreeningButton from './film/add-screening-button';
import ScreeningForm from './film/screening-form';

import AvailableMedia from './film/available_media';
import AddMediaButton from './film/add-media-button';
import MediaForm from './film/media-form';

class Film extends React.Component {

    constructor() {
        super();

        this.state = {
            showForms: {
                Screening: false,
                Media: false
            },
            rating: null
        };

        this.renderPoster = this.renderPoster.bind(this);
        this.renderRating = this.renderRating.bind(this);
        this.renderScreenings = this.renderScreenings.bind(this);
        this.renderMedia = this.renderMedia.bind(this);

        this.highlightRating = this.highlightRating.bind(this);
        this.changeRating = this.changeRating.bind(this);

        this.toggleScreeningForm = this.toggleScreeningForm.bind(this);
        this.toggleMediaForm = this.toggleMediaForm.bind(this);

        this.addToMyFilms = this.addToMyFilms.bind(this);
    }

    render() {

        let film = this.props.film;
        let ratedClass = (film.rating) ? "" : "unrated";

        let isMyFilm = false;
        if (this.props.film.hasOwnProperty('_id') ||
            this.props.film.hasOwnProperty('isMyFilm') &&
            this.props.film.isMyFilm)
            isMyFilm = true;

        return (
            <div className="brick">
                <div className="card film-card">
                    { this.renderPoster() }
                    <div className="card-header">
                        <FilmInfo title={this.props.film.title}
                                  translation={this.props.film.translation}
                                  released={this.props.film.released}
                                  isMyFilm={ isMyFilm }
                                  onAddToMyFilms={ this.addToMyFilms }
                        />
                        <div className={ "rating h6 " + ratedClass }>
                            { this.renderRating(film.rating) }
                        </div>
                    </div>

                    <div className="card-block film-media">
                        { this.renderMedia() }
                        { this.state.showForms.Media ?
                            <MediaForm filmId={this.props.film._id}
                                       onRefresh={ this.props.onRefresh } /> :
                            null }
                    </div>
                    <div className="film-screenings">
                        { this.renderScreenings() }
                        { this.state.showForms.Screening ?
                            <ScreeningForm filmId={this.props.film._id}
                                           onRefresh={ this.props.onRefresh } /> :
                            null }
                    </div>
                </div>
            </div>
        );
    }

    renderPoster() {
        if (this.props.film.poster) {
            return (
                <div className="card-block film-poster">
                    <img src={ this.props.film.poster } />
                </div>
            );
        }
    }

    renderRating(rating) {

        if (rating === undefined)
            rating = 0;

        let ratingLinks = [];
        let selected = false;

        for (let i = 1; i <= 10; i++) {
            selected = i <= rating;

            ratingLinks.push(
                <Rating selected={selected}
                        key={i}
                        index={i}
                        highlightRating={ (rating) => this.highlightRating(rating) }
                        changeRating={ (rating) => this.changeRating(rating) } />
            );
        }
        return ratingLinks;
    }

    renderScreenings() {
        if (this.props.film.hasOwnProperty('screenings') && this.props.film.screenings.length) {
            return (
                <div>
                    <Screenings screeningsInfo={ this.props.film.screenings } />
                    <AddScreeningButton
                        expanded={true}
                        onToggleForm={ (e) => this.toggleScreeningForm }
                    />
                </div>
            )
        }
        else {
            return (
                <AddScreeningButton
                    expanded={true}
                    onToggleForm={ (e) => this.toggleScreeningForm }
                />
            );
        }
    }

    renderMedia() {
        if (this.props.film.hasOwnProperty('media') && this.props.film.media.length) {
            return (
                <div className="available-media">
                    <AvailableMedia mediaInfo={ this.props.film.media } />
                    <AddMediaButton
                        expanded={false}
                        onToggleForm={ (e) => this.toggleMediaForm }
                    />
                </div>
            )
        }
        else
            return (
                <div className="text-center">
                    <AddMediaButton
                        expanded={true}
                        onToggleForm={ (e) => this.toggleMediaForm }
                    />
                </div>
            );
    }

    highlightRating(rating) {
        this.setState({rating: rating});
        this.renderRating(rating);
    }

    changeRating(rating) {
        const fireFilmRating = firebase.database().ref('films/' + this.props.film.id + '/rating');
        fireFilmRating.set(rating);
    }

    toggleScreeningForm() {
        let showForms = this.state.showForms;
        showForms.Screening = (!this.state.showForms.Screening);
        this.setState({showForms: showForms});
    }
    toggleMediaForm() {
        let showForms = this.state.showForms;
        showForms.Media = (!this.state.showForms.Media);
        this.setState({showForms: showForms});
    }

    addToMyFilms() {
        let film = this.props.film;
        delete film.isMyFilm;
        fetch('/api/films', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(film)
        })
            .then(film => {
                // refresh the omdb fetch?
            });
    }

}

export default Film;
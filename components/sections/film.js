/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';
import firebase from 'firebase';

import FilmInfo from './film/film-info';
import FilmForm from './film/film-form';

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

        this.renderFilm = this.renderFilm.bind(this);
        this.renderRating = this.renderRating.bind(this);
        this.renderScreenings = this.renderScreenings.bind(this);
        this.renderMedia = this.renderMedia.bind(this);

        this.highlightRating = this.highlightRating.bind(this);
        this.changeRating = this.changeRating.bind(this);

        this.toggleScreeningForm = this.toggleScreeningForm.bind(this);
        this.toggleMediaForm = this.toggleMediaForm.bind(this);
    }

    render() {

        let film = this.props.film;
        let ratedClass = (film.rating) ? "" : "unrated";


        return (
            <div className="brick">
                <div className="card film-card">
                    <div className="card-header">
                        { this.renderFilm() }
                        <div className={ "rating h6 " + ratedClass }>
                            { this.renderRating(film.rating) }
                        </div>
                    </div>

                    <div className="card-block film-media">
                        { this.renderMedia() }
                        { this.state.showForms.Media ? <MediaForm filmId={this.props.film.id} /> : null }
                    </div>
                    <div className="film-screenings">
                        { this.renderScreenings() }
                        { this.state.showForms.Screening ? <ScreeningForm filmId={this.props.film.id} venuesList={ this.props.venuesList } /> : null }
                    </div>
                </div>
            </div>
        );
    }

    renderFilm() {
        if (this.props.i == 0) {
            return <FilmForm />
        }
        else if (this.props.i >= 1) {
            return (
                <FilmInfo title={this.props.film.title}
                          translation={this.props.film.translation}
                          released={this.props.film.released}
                />
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
        if (this.props.screeningsInfo.length) {
            return (
                <div>
                    <Screenings screeningsInfo={ this.props.screeningsInfo } />
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
        if (this.props.mediaInfo.length) {
            return (
                <div className="available-media">
                    <AvailableMedia mediaInfo={ this.props.mediaInfo } />
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


}

export default Film;
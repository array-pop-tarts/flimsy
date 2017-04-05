/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';

import FilmInfo from './film/film-info';

import Rating from './film/rating';
import Screenings from './film/screenings';
import AddScreeningButton from './film/add-screening-button';
import ScreeningForm from './film/screening-form';

import Media from './film/media';
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
            showFormButtons: {
                Screening: true,
                Media: true
            },
            formScreening: {},
            formMedium: {},

            hoverRating: null
        };

        this.renderRating = this.renderRating.bind(this);

        this.renderMedia = this.renderMedia.bind(this);
        this.renderAddMediaButton = this.renderAddMediaButton.bind(this);
        this.renderScreenings = this.renderScreenings.bind(this);
        this.renderAddScreeningButton = this.renderAddScreeningButton.bind(this);

        this.highlightRating = this.highlightRating.bind(this);
        this.saveRating = this.saveRating.bind(this);
        this.ratingMouseEnter = this.ratingMouseEnter.bind(this);
        this.ratingMouseLeave = this.ratingMouseLeave.bind(this);

        this.toggleScreeningForm = this.toggleScreeningForm.bind(this);
        this.toggleMediaForm = this.toggleMediaForm.bind(this);

        this.addToMyFilms = this.addToMyFilms.bind(this);

        this.editScreening = this.editScreening.bind(this);
        this.editMedium = this.editMedium.bind(this);
        this.deleteMedium = this.deleteMedium.bind(this);
    }

    render() {

        let ratedClass = "unrated";
        if (this.props.film.rating || this.state.hoverRating)
            ratedClass = "";

        return (
            <div className="brick">
                <div className="card film-card">

                    { (this.props.film.poster) ?
                        <div className="card-block film-poster">
                            <img src={ this.props.film.poster } />
                        </div> :
                        null }

                    <div className="card-header">
                        <FilmInfo title={this.props.film.title}
                                  translation={this.props.film.translation}
                                  released={this.props.film.released}
                                  isMyFilm={ this.props.film.isMyFilm }
                                  onAddToMyFilms={ this.addToMyFilms }
                        />
                        { (this.props.film.hasOwnProperty('_id')) ?
                            <div className={ "rating h6 " + ratedClass }
                                 onMouseEnter={ this.ratingMouseEnter }
                                 onMouseLeave={ this.ratingMouseLeave }
                            >
                                { this.renderRating() }
                            </div> :
                            null }
                    </div>

                    { (this.props.film.hasOwnProperty('_id')) ?
                        <div className="card-block film-media">
                            { this.renderMedia() }
                            { this.state.showForms.Media ?
                                <MediaForm filmId={this.props.film._id}
                                           medium={ this.state.formMedium }
                                           onCloseForm={ this.toggleMediaForm }
                                           refreshFilm={ this.props.refreshFilm }/> :
                                null }
                        </div> :
                        null }

                    { (this.props.film.hasOwnProperty('_id')) ?
                        <div className="film-screenings">
                            { this.renderScreenings() }
                            <div className="card-block">
                                { this.state.showFormButtons.Screening ? this.renderAddScreeningButton() : null }
                                { this.state.showForms.Screening ?
                                    <ScreeningForm filmId={this.props.film._id}
                                                   screening={ this.state.formScreening }
                                                   onCloseForm={ this.toggleScreeningForm }
                                                   refreshFilm={ this.props.refreshFilm } /> :
                                    null }
                            </div>
                        </div> :
                        null }
                </div>
            </div>
        );
    }

    renderRating() {
        let rating;
        if (this.state.hoverRating)
            rating = this.state.hoverRating;
        else
            rating = this.props.film.rating;

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
                        saveRating={ this.saveRating } />
            );
        }
        return ratingLinks;
    }

    renderScreenings() {
        if (this.props.film.hasOwnProperty('screenings') && this.props.film.screenings.length) {
            return (
                <Screenings
                    screeningsInfo={ this.props.film.screenings }
                    onEditScreening={ (screening) => this.editScreening(screening) }
                    refreshFilm={ this.props.refreshFilm }
                />
            )
        }
    }

    renderAddScreeningButton() {
        return (
            <AddScreeningButton
                expanded={true}
                onToggleForm={ (e) => this.toggleScreeningForm }
            />
        );
    }

    renderMedia() {
        if (this.props.film.hasOwnProperty('media') && this.props.film.media.length) {
            return (
                <div className="available-media">
                    <Media
                        mediaInfo={ this.props.film.media }
                        onEditMedium={this.editMedium}
                        onDeleteMedium={this.deleteMedium}
                    />
                    { this.state.showFormButtons.Media ? this.renderAddMediaButton(false) : null }
                </div>
            );
        }
        else
            return (
                <div className="text-center">
                    { this.state.showFormButtons.Media ? this.renderAddMediaButton(true) : null }
                </div>
            );
    }

    renderAddMediaButton(expanded) {
        return (
            <AddMediaButton
                expanded={expanded}
                onToggleForm={ (e) => this.toggleMediaForm }
            />
        );
    }

    ratingMouseEnter() {
        this.setState({
            hoverRating: this.props.film.rating
        });
    }

    ratingMouseLeave() {
        this.setState({
            hoverRating: null
        });
    }

    highlightRating(rating) {
        this.setState({hoverRating: rating});
    }

    saveRating() {
        fetch(`/api/films/${this.props.film._id}/rating`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({rating: this.state.hoverRating})
        })
            .then(() => {
                this.props.refreshFilm({
                    idType: 'filmId',
                    id: this.props.film._id
                });
            });
    }

    toggleScreeningForm() {
        let showForms = this.state.showForms;
        showForms.Screening = (!this.state.showForms.Screening);
        let showFormButtons = this.state.showFormButtons;
        showFormButtons.Screening = (!this.state.showFormButtons.Screening);
        this.setState({
            showForms: showForms,
            showFormButtons: showFormButtons
        });
    }
    toggleMediaForm() {
        let showForms = this.state.showForms;
        showForms.Media = (!this.state.showForms.Media);
        let showFormButtons = this.state.showFormButtons;
        showFormButtons.Media = (!this.state.showFormButtons.Media);
        this.setState({
            showForms: showForms,
            showFormButtons: showFormButtons
        });
    }

    addToMyFilms() {
        let film = this.props.film;
        delete film.isMyFilm;
        fetch('/api/films', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(film)
        })
            .then(res => res.json())
            .then(film => {
                this.props.refreshFilm({
                    idType: 'imdbId',
                    id: film.imdbId
                });
            });
    }

    editScreening(screening) {
        this.setState({
            formScreening: screening
        }, this.toggleScreeningForm);
    }

    editMedium(medium) {
        this.setState({
            formMedium: medium
        }, this.toggleMediaForm);
    }

    deleteMedium(medium) {
        let film = this.props.film;
        film.media = film.media.filter(existing => existing._id != medium._id);
        fetch(`/api/films/${this.props.film._id}/media`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(film)
        })
            .then(() => {
                this.props.refreshFilm({
                    idType: 'filmId',
                    id: this.props.film._id
                });
            });
    }

}

export default Film;
/**
 * film-info
 * Author: Barbara Goss
 * Created: 2017-03-02
 */
import React from 'react';

import ReleasedYear from './released_year';

class FilmInfo extends React.Component {
    constructor() {
        super();
        this.renderIsMyField = this.renderIsMyField.bind(this);
    }

    render() {
        return (
            <div className="d-flex justify-content-start">
                <div>
                    <ReleasedYear year={ this.props.released } />
                    <h3 className="mt-2">{ this.props.title }</h3>
                </div>
                <div className="is-my-film ml-auto">
                    { this.renderIsMyField() }
                </div>
            </div>
        );
    }

    renderIsMyField() {
        if (this.props.isMyFilm) {
            return (
                <span className="text-warning">
                    <i className="fa fa-star fa-2x"></i>
                </span>
            );

        } else {
            return (
                <button title="Add to My Films"
                        className="btn text-muted"
                        onClick={ this.props.onAddToMyFilms }
                >
                    <i className="fa fa-star-o fa-2x"></i>
                </button>
            );
        }
    }
}

export default FilmInfo;
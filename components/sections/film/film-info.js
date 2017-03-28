/**
 * film-info
 * Author: Barbara Goss
 * Created: 2017-03-02
 */
import React from 'react';

import ReleasedYear from './released_year';

class FilmInfo extends React.Component {
    render() {
        let starClass, starColour;
        if (this.props.isMyFilm) {
            starClass = "star";
            starColour = "warning";
        } else {
            starClass = "star-o";
            starColour = "muted";
        }

        return (
            <div className="d-flex justify-content-start">
                <div>
                    <ReleasedYear year={ this.props.released } />
                    <h3>{ this.props.title }</h3>
                </div>
                <div className="is-my-film ml-auto">
                    <button title="Add to My Films"
                            className={ `btn text-${starColour}`}
                            onClick={ this.props.onAddToMyFilms }
                    >
                        <i className={ `fa fa-${starClass} fa-2x` }></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default FilmInfo;
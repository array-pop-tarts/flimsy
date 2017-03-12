/**
 * film-info
 * Author: Barbara Goss
 * Created: 2017-03-02
 */
import React from 'react';

import ReleasedYear from './released_year';

class FilmInfo extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-start">
                <div>
                    <h3>{ this.props.title }</h3>
                    <h4>{ this.props.translation }</h4>
                </div>
                <div className="ml-auto">
                    <ReleasedYear year={ this.props.released } />
                </div>
            </div>
        );
    }
}

export default FilmInfo;
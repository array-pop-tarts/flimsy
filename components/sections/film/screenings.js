/**
 * screenings
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';

import Screening from './screening';

class Screenings extends React.Component {
    render() {
        return (
            <ul className="list-group list-group-flush">
                {
                   this.props.screeningsInfo.map((screening, i) => {
                       return <Screening
                           screening={ screening }
                           key={ i }
                           onEditScreening={ () => this.props.onEditScreening(screening) }
                           refreshFilm={ this.props.refreshFilm }
                       />
                    })
                }
            </ul>
        );
    }
}

export default Screenings;
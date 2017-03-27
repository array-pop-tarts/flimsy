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
                   this.props.screeningsInfo.map((screening) => {
                       if (!screening.hasOwnProperty('users'))
                           screening.users = [];
                       return <Screening screening={ screening } key={ screening._id }/>
                    })
                }
            </ul>
        );
    }
}

export default Screenings;
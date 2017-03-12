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
                        return <Screening screening={ screening } key={ screening.key }/>
                    })
                }
            </ul>
        );
    }
}

export default Screenings;
/**
 * venue
 * Author: Barbara Goss
 * Created: 2017-02-21
 */
import React from 'react';

class Venue extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <span>
                { this.props.venue.name }
            </span>
        );
    }

}

export default Venue;
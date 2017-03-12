/**
 * venues-helper-item
 * Author: Barbara Goss
 * Created: 2017-02-28
 */
import React from 'react';

class VenuesHelperItem extends React.Component {

    constructor() {
        super();
        this.whatever = this.whatever.bind(this);
    }

    render() {
        return (
            <a href="#"
               className="list-group-item list-group-item-action"
               onClick={ this.props.selectedVenue() }
            >
                { this.props.venue.name }
            </a>
        );
    }

    whatever(e) {
        e.preventDefault();
        console.log(this.props.venue.id);
    }
}

export default VenuesHelperItem;
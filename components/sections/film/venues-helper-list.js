/**
 * venues-helper-list
 * Author: Barbara Goss
 * Created: 2017-02-28
 */
import React from 'react';

import VenuesHelperItem from './venues-helper-item';

class VenuesHelperList extends React.Component {

    constructor() {
        super();
        this.stuff = this.stuff.bind(this);
    }

    render() {
        return (
            <div className="list-group">
                {
                    this.props.venues.map((venue, i) => {
                        return <VenuesHelperItem venue={venue}
                                                 key={i}
                                                 selectedVenue={ (e) => this.stuff }
                        />
                    })
                }
            </div>
        );
    }

    stuff() {
        e.preventDefault();
        console.log(id);
        console.log(e);
    }
}

export default VenuesHelperList;
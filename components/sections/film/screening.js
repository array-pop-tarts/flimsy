/**
 * screening
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';
import moment from 'moment';

import Venue from './venue';

class Screening extends React.Component {

    constructor() {
        super();

        this.renderDate = this.renderDate.bind(this);
        this.renderFriends = this.renderFriends.bind(this);
    }

    render() {
        console.log(this.props.screening);
        return (
            <li className="list-group-item  justify-content-between">
                <div>
                    { this.renderDate() } @ <Venue venue={this.props.screening.venue } />
                </div>
                <div className="screening-friends">
                    { this.renderFriends(this.props.screening.friends) }
                </div>
            </li>
        );
    }

    renderDate() {
        return moment(this.props.screening.date).format('YYYY-MM-DD');
    }

    renderFriends(friends) {
        if (friends.length > 0) {
            let names = friends.map(friend => {
                return friend.name;
            });
            return names.join(', ');
        } else
            return "";
    }

}

export default Screening;
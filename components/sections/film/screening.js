/**
 * screening
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';
import moment from 'moment';

import Venue from './venue';
import User from './user';

class Screening extends React.Component {

    constructor() {
        super();

        this.renderDate = this.renderDate.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    render() {
        return (
            <li className="list-group-item  justify-content-between">
                <div>
                    { this.renderDate() } @ <Venue venue={this.props.screening.venueInfo } />
                </div>
                <div className="screening-friends">
                    { this.renderUsers(this.props.screening.usersInfo)}
                </div>
            </li>
        );
    }

    renderDate() {
        return moment(this.props.screening.date).format('YYYY-MM-DD');
    }

    renderUsers(users) {
        let names = users.map(user => {
            return user.name;
        });
        return names.join(', ');
    }

}

export default Screening;
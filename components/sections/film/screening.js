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

        this.editScreening = this.editScreening.bind(this);
        this.deleteScreening = this.deleteScreening.bind(this);
    }

    render() {
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="screening-details col-20">
                        { this.renderDate() } @ <Venue venue={ this.props.screening.venue } />
                        <div className="screening-friends">
                            { this.renderFriends() }
                        </div>
                    </div>
                    <div className="screening-actions col-4">
                        <button className="button-transparent"
                                title="Edit"
                                onClick={ this.editScreening }>
                            <i className="fa fa-gear"></i>
                        </button>
                        <button className="button-transparent"
                                title="Delete"
                                onClick={ this.deleteScreening }>
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            </li>
        );
    }

    renderDate() {
        return moment(this.props.screening.date).format('YYYY-MM-DD');
    }

    renderFriends() {
        if (this.props.screening.friends.length > 0) {
            let names = this.props.screening.friends.map(friend => {
                return friend.name;
            });
            return names.join(', ');
        } else
            return "";
    }

    editScreening() {

    }

    deleteScreening() {
        fetch(`/api/screenings/${this.props.screening._id}`, {
            method: 'DELETE'
        })
            .then(() => [
                // refresh
            ]);
    }

}

export default Screening;
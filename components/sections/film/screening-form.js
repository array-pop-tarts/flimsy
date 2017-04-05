/**
 * screening-form
 * Author: Barbara Goss
 * Created: 2017-02-26
 */
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import FormHeading from './form-heading';

class ScreeningForm extends React.Component {

    constructor() {
        super();

        this.state = {
            venuesList: [],
            friendsList: [],

            screening: {
                date: moment(),
                venue: {},
                friends: []
            },

            friendInput: "",
            newVenue: {},
            newFriends: [],

            showHelpers: {
                Venues: false,
                Friends: false
            },

            errors: {
                date: false,
                venue: false,
                friends: false
            }
        };

        this.toggleVenuesHelper = this.toggleVenuesHelper.bind(this);
        this.toggleNewVenueButton = this.toggleNewVenueButton.bind(this);
        this.renderVenuesHelper = this.renderVenuesHelper.bind(this);
        this.selectVenue = this.selectVenue.bind(this);

        this.toggleFriendsHelper = this.toggleFriendsHelper.bind(this);
        this.toggleNewFriendButton = this.toggleNewFriendButton.bind(this);
        this.renderFriendsHelper = this.renderFriendsHelper.bind(this);
        this.selectFriend = this.selectFriend.bind(this);
        this.renderSelectedFriends = this.renderSelectedFriends.bind(this);
        this.deselectFriend = this.deselectFriend.bind(this);

        this.onDateChange = this.onDateChange.bind(this);
        this.onVenueChange = this.onVenueChange.bind(this);
        this.onFriendsChange = this.onFriendsChange.bind(this);
    }

    render() {
        return (
            <form className="add-screening" onSubmit={ (e) => this.onSaveScreening(e)}>
                <FormHeading formType="Screening" onCloseForm={ this.props.onCloseForm }/>
                <div className="row">
                    <div className="col">
                        <DatePicker selected={ this.state.screening.date }
                                    className="form-control form-control-sm"
                                    dateFormat="YYYY-MM-DD"
                                    onChange={ this.onDateChange }
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                               className="form-control form-control-sm"
                               placeholder="Where'd you see it?"
                               value={ this.state.screening.venue.hasOwnProperty('name') ? this.state.screening.venue.name : "" }
                               onChange={ this.onVenueChange }
                        />
                        { this.state.showHelpers.Venues ? this.renderVenuesHelper() : null}
                    </div>
                </div>
                <div>
                    { this.state.screening.friends.length > 0 ? this.renderSelectedFriends() : null }
                    <input type="text"
                           className="form-control form-control-sm"
                           placeholder="Did you got to the movies by yourself again?"
                           value={ this.state.friendInput }
                           onChange={ this.onFriendsChange }
                    />
                    { this.state.showHelpers.Friends ? this.renderFriendsHelper() : null}
                </div>
                <button className="btn btn-sm btn-success" type="submit">
                    <i className="fa fa-check"></i> Save
                </button>
            </form>
        );
    }

    onDateChange(date) {
        let screening = this.state.screening;
        screening.date = date;
        this.setState({ screening: screening });
    }

    onVenueChange(e) {
        fetch(`/api/venues/?name=${e.target.value}`)
            .then(res => res.json())
            .then(venues => {
                this.setState({
                    venuesList: venues
                }, function () {
                    if (! this.state.showHelpers.Venues) {
                        let showHelpers = this.state.showHelpers;
                        showHelpers.Venues = true;
                        this.setState({
                            showHelpers: showHelpers
                        });
                    }
                });
            });

        let screening = this.state.screening;
        screening.venue.name = e.target.value;
        this.setState({
            screening: screening
        });
    }

    toggleVenuesHelper() {
        let showHelpers = this.state.showHelpers;
        showHelpers.Venues = (! this.state.showHelpers.Venues);
        this.setState({showHelpers: showHelpers});
    }

    toggleNewVenueButton() {
        if (this.state.screening.venue.name.length >= 1) {
            return (
                <button
                    className="list-group-item list-group-item-action"
                    onClick={(e) => this.selectVenue({name: this.state.screening.venue.name}, e)}
                >
                    Add new venue: { this.state.screening.venue.name }
                </button>
            );
        }
    }

    renderVenuesHelper() {
        return (
            <div className="list-group">
                {
                    this.state.venuesList.map((venue, i) => {
                        return (
                            <button
                               className="list-group-item list-group-item-action"
                               key={i}
                               onClick={ (e) => this.selectVenue(venue, e) }
                            >
                                { venue.name }
                            </button>
                        )
                    })
                }
                { this.toggleNewVenueButton() }
                <button
                   className="list-group-item list-group-item-action text-center"
                   onClick={ this.toggleVenuesHelper }
                >
                    <small>close</small>
                </button>
            </div>
        );
    }

    selectVenue(venue, e) {
        e.preventDefault();

        let screening = this.state.screening;
        screening.venue.name = venue.name;
        if (venue.hasOwnProperty('_id'))
            screening.venue._id = venue._id;
        else {
            delete screening.venue._id;
        }

        this.setState({
            screening: screening
        });
        this.toggleVenuesHelper();
    }

    onFriendsChange(e) {
        fetch(`/api/friends/?name=${e.target.value}`)
            .then(res => res.json())
            .then(friends => {
                this.setState({
                    friendsList: friends
                }, function () {
                    if (! this.state.showHelpers.Friends) {
                        let showHelpers = this.state.showHelpers;
                        showHelpers.Friends = true;
                        this.setState({
                            showHelpers: showHelpers
                        });
                    }
                });
            });

        this.setState({ friendInput: e.target.value });
    }

    toggleFriendsHelper() {
        let showHelpers = this.state.showHelpers;
        showHelpers.Friends = (! this.state.showHelpers.Friends);
        this.setState({showHelpers: showHelpers});
    }

    toggleNewFriendButton() {
        if (this.state.friendInput.length >= 1) {
            return (
                <button
                    className="list-group-item list-group-item-action"
                    onClick={(e) => this.selectFriend({ name: this.state.friendInput }, e)}
                >
                    Add new friend: { this.state.friendInput }
                </button>
            );
        }
    }

    renderFriendsHelper() {
        return (
            <div className="list-group">
                {
                    this.state.friendsList.map((friend, i) => {
                        return (
                            <button
                                className="list-group-item list-group-item-action"
                                key={i}
                                onClick={ (e) => this.selectFriend(friend, e) }
                            >
                                { friend.name }
                            </button>
                        )
                    })
                }
                { this.toggleNewFriendButton() }
                <button
                    className="list-group-item list-group-item-action text-center"
                    onClick={ this.toggleFriendsHelper }
                ><small>close</small></button>
            </div>
        );
    }

    selectFriend(friend, e) {
        e.preventDefault();

        let screening = this.state.screening;
        let selectedFriend = {};
        selectedFriend.name = friend.name;
        if (friend.hasOwnProperty('_id'))
            selectedFriend._id = friend._id;
        else
            delete selectedFriend._id;

        screening.friends.push(selectedFriend);

        this.setState({
            screening: screening,
            friendInput: ""
        });

        this.toggleFriendsHelper();
    }

    renderSelectedFriends() {
        return (
            <div>
                <ul className="list-inline">
                    {
                        this.state.screening.friends.map((friend, i) => {
                            return (
                                <li className="list-inline-item" key={ i }>
                                    <button className="btn btn-danger btn-sm"
                                            type="button"
                                            onClick={ () => this.deselectFriend(i) }
                                    >
                                        { friend.name } <i className="fa fa-times"></i>
                                </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    deselectFriend(key) {
        let screening = this.state.screening;
        screening.friends.splice(key, 1);
        this.setState({ screening: screening });
    }

    onSaveScreening(e) {
        e.preventDefault();

        let url = '/api/screenings';
        let method = 'POST';

        if (this.state.screening.hasOwnProperty('_id')) {
            url = `/api/screenings/${this.state.screening._id}`;
            method = 'PUT';
        }

        let selectedDate = this.state.screening.date;
        let dateTimestamp = selectedDate._d.getTime();

        let screening = {
            //user: req.user,
            film: this.props.filmId,
            date: dateTimestamp,
            venue: this.state.screening.venue,
            friends: this.state.screening.friends
        };

        fetch(url, {
            method: method,
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(screening)
        })
            .then(() => {
                this.setState({
                    screening: {
                        date: moment(),
                        venue: {},
                        friends: []
                    }
                }, () => {
                    this.props.onCloseForm();
                    this.props.refreshFilm({
                        idType: 'filmId',
                        id: this.props.filmId
                    });
                })
            });
    }

    componentDidMount() {
        if (this.props.screening.hasOwnProperty('_id')) {

            let screening = this.props.screening;
            let timestamp = screening.date;
            screening.date = moment(timestamp);

            this.setState({screening: screening});
        }
    }
}

export default ScreeningForm;
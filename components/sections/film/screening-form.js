/**
 * screening-form
 * Author: Barbara Goss
 * Created: 2017-02-26
 */
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ScreeningForm extends React.Component {

    constructor() {
        super();
        this.state = {
            venuesList: [],
            friendsList: [],

            selectedDate: moment(),
            selectedVenue: {},
            friendInput: "",
            selectedFriends: [],

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
            <form className="add-screening m-2" onSubmit={ (e) => this.onSaveScreening(e)}>
                <div className="row">
                    <div className="col has-danger">
                        <DatePicker selected={ this.state.selectedDate }
                                    className="form-control form-control-sm"
                                    dateFormat="YYYY-MM-DD"
                                    onChange={ this.onDateChange }
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                               className="form-control form-control-sm"
                               placeholder="Where'd you see it?"
                               value={ this.state.selectedVenue.name || "" }
                               onChange={ this.onVenueChange }
                        />
                        { this.state.showHelpers.Venues ? this.renderVenuesHelper() : null}
                    </div>
                </div>
                <div>
                    { this.state.selectedFriends.length > 0 ? this.renderSelectedFriends() : null }
                    <input type="text"
                           className="form-control form-control-sm"
                           placeholder="Did you got to the movies by yourself again?"
                           value={ this.state.friendInput }
                           onChange={ this.onFriendsChange }
                    />
                    { this.state.showHelpers.Friends ? this.renderFriendsHelper() : null}
                </div>
                <button className="btn btn-sm btn-success">
                    <i className="fa fa-check"></i>
                </button>
            </form>
        );
    }

    onDateChange(date) {
        this.setState({ selectedDate: date });
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

        let selectedVenue = {
            name: e.target.value
        };
        this.setState({
            selectedVenue: selectedVenue
        });
    }

    toggleVenuesHelper() {
        let showHelpers = this.state.showHelpers;
        showHelpers.Venues = (! this.state.showHelpers.Venues);
        this.setState({showHelpers: showHelpers});
    }

    toggleNewVenueButton() {
        if (this.state.selectedVenue.name.length >= 1) {
            return (
                <button
                    className="list-group-item list-group-item-action"
                    onClick={(e) => this.selectVenue({name: this.state.selectedVenue.name}, e)}
                >
                    Add new venue: { this.state.selectedVenue.name }
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
        let selectedVenue = {
            name: venue.name
        };
        if (venue.hasOwnProperty('_id'))
            selectedVenue.id = venue._id;

        this.setState({
            selectedVenue: selectedVenue
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

        let selectedFriends = this.state.selectedFriends;
        let selectedFriend = {
            id: friend._id,
            name: friend.name
        };

        selectedFriends.push(selectedFriend);

        this.setState({
            selectedFriends: selectedFriends,
            friendInput: ""
        });

        this.toggleFriendsHelper();
    }

    renderSelectedFriends() {
        return (
            <div>
                <ul className="list-inline">
                    {
                        this.state.selectedFriends.map((friend, i) => {
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
        let selectedFriends = this.state.selectedFriends;
        selectedFriends.splice(key, 1);
        this.setState({ selectedFriends: selectedFriends });
    }

    onSaveScreening(e) {
        e.preventDefault();

        if (! this.state.selectedVenue.hasOwnProperty('id')) {
            fetch('/api/venues', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ name: this.state.selectedVenue.name })
            })
                .then((venue) => {
                    let selectedVenue = this.state.selectedVenue;
                    selectedVenue.id = venue._id;
                    this.setState({
                        selectedVenue: selectedVenue
                    });
                });
        }

        let selectedDate = this.state.selectedDate;
        let dateTimestamp = selectedDate._d.getTime();

        let friendIds = this.state.selectedFriends.map(friend => {
            return friend.id;
        });

        let screening = {
            date: dateTimestamp,
            venue: this.state.selectedVenue.id,
            friends: friendIds
        };

        fetch(`/api/films/${this.props.filmId}/screening`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(screening)
        })
            .then(() => {
                this.setState({
                    selectedVenue: {},
                    selectedFriends: {}
                }, this.props.onRefresh);
            });
    }
}

export default ScreeningForm;
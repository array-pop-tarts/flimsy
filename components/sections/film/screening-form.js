/**
 * screening-form
 * Author: Barbara Goss
 * Created: 2017-02-26
 */
import React from 'react';
import firebase from 'firebase';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import VenuesHelperList from './venues-helper-list';

class ScreeningForm extends React.Component {

    constructor() {
        super();
        this.state = {
            venuesList: [],
            usersList: [],

            selectedDate: moment(),
            selectedVenue: {},
            userInput: "",
            selectedUsers: [],

            showHelpers: {
                Venues: false,
                Users: false
            },

            errors: {
                date: false,
                venue: false,
                users: false
            }
        };

        this.toggleVenuesHelper = this.toggleVenuesHelper.bind(this);
        this.toggleNewVenueButton = this.toggleNewVenueButton.bind(this);
        this.renderVenuesHelper = this.renderVenuesHelper.bind(this);
        this.selectVenue = this.selectVenue.bind(this);

        this.toggleUsersHelper = this.toggleUsersHelper.bind(this);
        this.renderUsersHelper = this.renderUsersHelper.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.renderSelectedUsers = this.renderSelectedUsers.bind(this);

        this.onDateChange = this.onDateChange.bind(this);
        this.onVenueChange = this.onVenueChange.bind(this);
        this.onUsersChange = this.onUsersChange.bind(this);
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
                    { this.state.selectedUsers.length > 0 ? this.renderSelectedUsers() : null }
                    <input type="text"
                           className="form-control form-control-sm"
                           placeholder="Did you got to the movies by yourself again?"
                           value={ this.state.userInput }
                           onChange={ this.onUsersChange }
                    />
                    { this.state.showHelpers.Users ? this.renderUsersHelper() : null}
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

    onUsersChange(e) {
        fetch(`/api/users/?name=${e.target.value}`)
            .then(res => res.json())
            .then(users => {
                this.setState({
                    usersList: users
                }, function () {
                    if (! this.state.showHelpers.Users) {
                        let showHelpers = this.state.showHelpers;
                        showHelpers.Users = true;
                        this.setState({
                            showHelpers: showHelpers
                        });
                    }
                });
            });

        this.setState({ userInput: e.target.value });
    }

    toggleUsersHelper() {
        let showHelpers = this.state.showHelpers;
        showHelpers.Users = (! this.state.showHelpers.Users);
        this.setState({showHelpers: showHelpers});
    }

    renderUsersHelper() {
        return (
            <div className="list-group">
                {
                    this.state.usersList.map((user, i) => {
                        return (
                            <button
                                className="list-group-item list-group-item-action"
                                key={i}
                                onClick={ (e) => this.selectUser(user, e) }
                            >
                                { user.name }
                            </button>
                        )
                    })
                }
                <button
                    className="list-group-item list-group-item-action text-center"
                    onClick={ this.toggleUsersHelper }
                ><small>close</small></button>
            </div>
        );
    }

    selectUser(user, e) {
        e.preventDefault();

        let selectedUsers = this.state.selectedUsers;
        let selectedUser = {
            id: user._id,
            name: user.name
        };

        selectedUsers.push(selectedUser);

        this.setState({
            selectedUsers: selectedUsers,
            userInput: ""
        });

        this.toggleUsersHelper();
    }

    renderSelectedUsers() {
        return (
            <div>
                <ul className="list-inline">
                    {
                        this.state.selectedUsers.map((user, i) => {
                            return (
                                <li className="list-inline-item" key={ i }>
                                    { user.name } <button>x</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
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

        let userIds = this.state.selectedUsers.map(user => {
            return user.id;
        });

        let screening = {
            date: dateTimestamp,
            venue: this.state.selectedVenue.id,
            users: userIds
        };

        fetch(`/api/films/${this.props.filmId}/screening`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(screening)
        })
            .then(() => {
                this.setState({
                    selectedVenue: {},
                    selectedUsers: {}
                }, this.props.onRefresh);
            });
    }
}

export default ScreeningForm;
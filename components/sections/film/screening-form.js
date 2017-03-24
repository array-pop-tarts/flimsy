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
            selectedDate: moment(),
            selectedVenue: {},
            selectedUsers: {},

            showHelpers: {
                Venues: false,
                Users: false
            },

            errors: {
                date: false,
                venue: false,
                users: false
            },
        };

        this.toggleVenuesHelper = this.toggleVenuesHelper.bind(this);
        this.renderVenuesHelper = this.renderVenuesHelper.bind(this);
        this.selectVenue = this.selectVenue.bind(this);

        this.toggleUsersHelper = this.toggleUsersHelper.bind(this);
        this.renderUsersHelper = this.renderUsersHelper.bind(this);
        this.selectUser = this.selectUser.bind(this);

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
                               onMouseOver={ this.toggleVenuesHelper }
                               onChange={ this.onVenueChange }
                        />
                        { this.state.showHelpers.Venues ? this.renderVenuesHelper() : null}
                    </div>
                </div>
                <input type="text"
                       className="form-control form-control-sm"
                       placeholder="Did you got to the movies by yourself again?"
                       value={ this.state.selectedUsers.names || "" }
                       onMouseOver={ this.toggleUsersHelper }
                       onChange={ this.onUsersChange }
                />
                { this.state.showHelpers.Users ? this.renderUsersHelper() : null}
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

    renderVenuesHelper() {
        return (
            <div className="list-group">
                {
                    this.props.venues.map((venue, i) => {
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
                <button
                   className="list-group-item list-group-item-action text-center"
                   onClick={ this.toggleVenuesHelper }
                ><small>close</small></button>
            </div>
        );
    }

    selectVenue(venue, e) {
        e.preventDefault();
        let selectedVenue = {
            id: venue._id,
            name: venue.name
        };
        this.setState({
            selectedVenue: selectedVenue
        });
        this.toggleVenuesHelper();
    }

    onUsersChange(e) {
        let selectedUsers = this.state.selectedUsers;
        let selectedUsersNames = e.target.value;
        selectedUsers.names = selectedUsersNames;
        this.setState({ selectedUsers: selectedUsers });
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
                    this.props.users.map((user, i) => {
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

        let selectedUsersNames = this.state.selectedUsers.names || "";
        selectedUsersNames = (selectedUsersNames).length > 0 ?
            selectedUsersNames + ", " + user.name :
            user.name;

        let selectedUsers = this.state.selectedUsers.users || [];
        let selectedUser = user._id;

        selectedUsers.push(selectedUser);

        this.setState({
            selectedUsers: {
                names: selectedUsersNames,
                users: selectedUsers
            }
        });

        this.toggleUsersHelper();
    }

    onSaveScreening(e) {
        e.preventDefault();

        let selectedDate = this.state.selectedDate;
        let dateTimestamp = selectedDate._d.getTime();

        const screening = {
            date: dateTimestamp,
            venue: this.state.selectedVenue.id,
            users: this.state.selectedUsers.users
        };

        let fullDate = new Date(dateTimestamp);
        let newScreenedYear = fullDate.getFullYear();

        fetch(`/api/films/${this.props.filmId}/screening`, {
            method: 'POST',
            body: JSON.stringify(screening)
        })
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                loaded_films: true
            }));

        this.setState({
            selectedVenue: {},
            selectedUsers: {}
        });
    }
}

export default ScreeningForm;
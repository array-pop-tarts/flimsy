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

            venuesList: [],
            usersList: []
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
            id: venue.id,
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

        let selectedUsersNames = this.state.selectedUsers.names || "";
        selectedUsersNames = (selectedUsersNames).length > 0 ? selectedUsersNames + ", " + user.name : user.name;

        let selectedUsers = this.state.selectedUsers.users || [];
        let selectedUser = {
            id: user.id,
            name: user.name
        };
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

        const db = firebase.database();

        let selectedDate = (this.state.selectedDate);
        let dateTimestamp = selectedDate._d.getTime();

        let users = {};
        this.state.selectedUsers.users.map(user => {
            users[user.id] = true;
        });

        const screening = {
            date: dateTimestamp,
            venue: this.state.selectedVenue.id,
            users: users
        };

        let fullDate = new Date(dateTimestamp);
        let newScreenedYear = fullDate.getFullYear();

        let savedScreenedYearRef = db.ref('/films/' + this.props.filmId + '/screened');
        let savedScreenedYear = null;
        savedScreenedYearRef.on('value', snapshot => {
            savedScreenedYear = snapshot.val();
        });

        let newScreening = {};
        if (! savedScreenedYear || (newScreenedYear < savedScreenedYear)) {
            newScreening['/films/' + this.props.filmId + '/screened'] = newScreenedYear;
        }

        const fireScreenings = db.ref('screenings');
        let newFireScreening = fireScreenings.push(screening);

        newScreening['/films/' + this.props.filmId + '/screenings/' + newFireScreening.key] = true;

        db.ref().update(newScreening);

        this.setState({
            selectedVenue: {},
            selectedUsers: {}
        });
    }

    componentDidMount() {
        let db = firebase.database();

        let fireVenues = db.ref('venues');
        fireVenues.orderByChild('name').on('child_added', snapshot => {
            this.setState(currentState => {
                const newState = Object.assign({}, currentState);
                newState.venuesList = newState.venuesList.concat({
                    id: snapshot.key,
                    name: snapshot.val().name
                });
                return newState;
            });
        });

        let fireUsers = db.ref('users');
        fireUsers.orderByChild('name').on('child_added', snapshot => {
            this.setState(currentState => {
                const newState = Object.assign({}, currentState);
                newState.usersList = newState.usersList.concat({
                    id: snapshot.key,
                    name: snapshot.val().name
                });
                return newState;
            });
        });
    }
}

export default ScreeningForm;
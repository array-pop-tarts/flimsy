/**
 * media-form
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
 
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import FormHeading from './form-heading';

class MediaForm extends React.Component {

    constructor() {
        super();
        this.state = {
            medium: {
                acquired: moment(),
                type: ""
            }
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onSaveMedia = this.onSaveMedia.bind(this);
    }

    render() {

        return (
            <form className="add-media" onSubmit={ (e) => this.onSaveMedia(e) }>
                <FormHeading formType="Media"
                             formMode={ this.state.medium.hasOwnProperty('_id') ? 'Edit' : 'Add New' }
                             onCloseForm={ this.props.onCloseForm }
                />
                <div className="row">
                    <div className="col">
                        <DatePicker selected={ this.state.medium.acquired }
                                    className="form-control form-control-sm"
                                    dateFormat="YYYY-MM-DD"
                                    onChange={ this.onDateChange }
                        />
                    </div>
                    <div className="col">
                        <select className="form-control form-control-sm"
                                value={this.state.medium.type}
                                onChange={ this.onTypeChange }
                        >
                            <option value="">- What kind? -</option>
                            <option value="DVD">DVD</option>
                            <option value="BluRay">BluRay</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-sm btn-success" type="submit">
                    <i className="fa fa-check"></i> Save
                </button>
            </form>
        );
    }

    onDateChange(acquired) {
        let medium = this.state.medium;
        medium.acquired = acquired;
        this.setState({ medium: medium });
    }

    onTypeChange(e) {
        let medium = this.state.medium;
        medium.type = e.target.value;
        this.setState({ medium: medium });
    }

    onSaveMedia(e) {
        e.preventDefault();

        let selectedDate = (this.state.medium.acquired);
        let acquired = selectedDate._d.getTime();

        let medium = {
            acquired: acquired,
            type: this.state.medium.type
        };

        let url = `/api/films/${this.props.filmId}/medium`;
        let method = 'POST';

        if (this.state.medium.hasOwnProperty('_id')) {
            url = `/api/films/${this.props.filmId}/medium`;
            method = 'PUT';
            medium._id = this.state.medium._id;
        }

        fetch(url, {
            method: method,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(medium)
        })
            .then((res) => {
                this.setState({
                    medium: {
                        type: "",
                        acquired: moment()
                    }
                }, () => {
                    this.props.onCloseForm();
                    this.props.refreshFilm({
                        idType: 'filmId',
                        id: this.props.filmId
                    });
                });
            });
    }

    componentDidMount() {
        if (this.props.medium.hasOwnProperty('_id')) {

            let medium = this.props.medium;
            let timestamp = medium.acquired;
            medium.acquired = moment(timestamp);

            this.setState({medium: medium});
        }
    }
}

export default MediaForm;
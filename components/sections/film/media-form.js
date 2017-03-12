/**
 * media-form
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
 
import React from 'react';
import firebase from 'firebase';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class MediaForm extends React.Component {

    constructor() {
        super();
        this.state = {
            date: moment(),
            type: ""
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onSaveMedia = this.onSaveMedia.bind(this);
    }

    render() {

        return (
            <form className="add-media" onSubmit={ (e) => this.onSaveMedia(e) }>
                <div className="row">
                    <div className="col">
                        <DatePicker selected={ this.state.date }
                                    className="form-control form-control-sm"
                                    dateFormat="YYYY-MM-DD"
                                    onChange={ this.onDateChange }
                        />
                    </div>
                    <div className="col">
                        <select className="form-control form-control-sm"
                                value={this.state.type}
                                onChange={ this.onTypeChange }
                        >
                            <option value="">--</option>
                            <option value="DVD">DVD</option>
                            <option value="BluRay">BluRay</option>
                        </select>
                    </div>
                    <button className="btn btn-sm btn-success">
                        <i className="fa fa-check"></i>
                    </button>
                </div>
            </form>
        );
    }

    onDateChange(date) {
        this.setState({ date: date });
    }

    onTypeChange(e) {
        this.setState({ type: e.target.value });
    }

    onSaveMedia(e) {
        e.preventDefault();
        const fireMedia = firebase.database().ref('media');
        let selectedDate = (this.state.date);
        let acquired = selectedDate._d.getTime();
        const medium = {
            acquired: acquired,
            type: this.state.type
        };
        let newFireMedium = fireMedia.push(medium);

        let newMedium = {};
        newMedium['/films/' + this.props.filmId + '/media/' + newFireMedium.key] = true;

        firebase.database().ref().update(newMedium);
    }
}

export default MediaForm;
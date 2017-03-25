/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';
import firebase from 'firebase';

import Film from './film';

class Films extends React.Component {

    constructor() {
        super();

        this.state = {
            films: [{}],
            users: [],
            venues: [],

            showFilmForm: false,

            loaded_films: false,
            loaded_users: false,
            loaded_venues: false
        };

        this.toggleFilmForm = this.toggleFilmForm.bind(this);
    }

    render() {
        if (this.state.loaded_films) {
            return (
                <div className="masonry">
                    <div className="brick">
                        <div className="card film-card film-form-placeholder" onClick={ this.toggleFilmForm } >
                            <div className="card-block">
                                <i className="fa fa-plus fa-3x fa-inverse"></i>
                            </div>
                        </div>
                    </div>
                    {this.state.films.map((film, i) => {
                        return (
                            <Film film={ film }
                                  key={ i }
                                  i={ i }
                                  users={ this.state.users }
                                  venues={ this.state.venues }
                            />
                        );
                    })}
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }

    toggleFilmForm() {
        let showFilmForm = ! this.state.showFilmForm;
        this.setState({showFilmForm: showFilmForm});
    }

    componentDidMount() {
        fetch('/api/films')
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                loaded_films: true
            }));

        fetch('/api/users')
            .then(res => res.json())
            .then(json => this.setState({
                users: json,
                loaded_users: true
            }));

        fetch('/api/venues')
            .then(res => res.json())
            .then(json => this.setState({
                venues: json,
                loaded_venues: true
            }));
    }
}

export default Films;
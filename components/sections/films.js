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
            films: [],
            showFilmForm: false,
            loaded_films: false
        };

        this.toggleFilmForm = this.toggleFilmForm.bind(this);

        this.refresh = this.refresh.bind(this);
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
                                  onRefresh={ this.refresh() }
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

    refresh() {
        /*
        fetch('/api/films')
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                loaded_films: true
            }));
        */
    }

    componentDidMount() {
        fetch('/api/films')
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                loaded_films: true
            }));
    }

}

export default Films;
/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-02
 */
import React from 'react';

import Header from './layout/header';
import Films from './sections/films';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            search: "",
            myFilm: false,

            imdbFilms: []
        };

        this.updateSearchInput = this.updateSearchInput.bind(this);
        this.updateMyFilmsCheckbox = this.updateMyFilmsCheckbox.bind(this);
        this.search = this.search.bind(this);
    }

    render() {
        return (
            <div className="container-fluid">
                <Header/>
                <div className="input-group">
                    <input className="form-control"
                           type="text"
                           placeholder="Search for films..."
                           value={ this.state.search }
                           onChange={ (e) => this.updateSearchInput(e) }
                    />
                    <span className="input-group-addon">
                        <input type="checkbox"
                               aria-label="Checkbox selects whether to search only within my films"
                               value={ this.state.myFilm }
                               onChange={ (e) => this.updateMyFilmsCheckbox(e) }
                        />
                    </span>
                    <span className="input-group-addon">My Films</span>
                     <span className="input-group-btn">
                        <button className="btn btn-success"
                                type="button"
                                onClick={ this.search }
                        >Search</button>
                     </span>
                </div>
                <Films films={ this.state.imdbFilms } />
            </div>
        );
    }

    updateSearchInput(e) {
        this.setState({
            search: e.target.value
        });
    }

    updateMyFilmsCheckbox(e) {
        this.setState({
            myFilms: e.target.value
        });
    }

    search() {
        fetch(`http://www.omdbapi.com/?s=${ this.state.search }&type=movie`)
            .then(res => res.json())
            .then(json =>  {
                if (json.Response === "True") {
                    let films = json.Search.map(film => {
                        return {
                            title: film.Title,
                            released: film.Year,
                            imdbId: film.imdbID
                        };
                    });
                    this.setState({
                        imdbFilms: films
                    });
                }
            });
    }

}

export default App;
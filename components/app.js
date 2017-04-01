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
            searchMyFilmsOnly: true,

            films: []
        };

        this.updateSearchInput = this.updateSearchInput.bind(this);
        this.updateMyFilmsCheckbox = this.updateMyFilmsCheckbox.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
        this.searchMyFilms = this.searchMyFilms.bind(this);
        this.searchImdbFilms = this.searchImdbFilms.bind(this);
    }

    render() {
        return (
            <div className="container-fluid">
                <Header/>
                <form className="search-films" onSubmit={ (e) => this.handleSearch(e) } >
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
                                   checked={ this.state.searchMyFilmsOnly }
                                   onChange={ (e) => this.updateMyFilmsCheckbox(e) }
                            />
                        </span>
                        <span className="input-group-addon">My Films</span>
                         <span className="input-group-btn">
                            <button className="btn btn-success"
                                    type="submit"
                            >Search</button>
                         </span>
                    </div>
                </form>
                <Films films={ this.state.films } />
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
            searchMyFilmsOnly: e.target.checked
        });
    }

    handleSearch(e) {
        e.preventDefault();

        if (this.state.searchMyFilmsOnly)
            this.searchMyFilms();
        else
            this.searchImdbFilms();
    }

    searchMyFilms() {
        fetch(`/api/films?search=${ this.state.search }`)
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                //loaded_films: true
            }));
    }

    searchImdbFilms() {
        let imdbFilms;

        fetch(`http://www.omdbapi.com/?s=${ this.state.search }&type=movie`)
            .then(res => res.json())
            .then(json => {
                if (json.Response === "True") {
                    imdbFilms = json;
                    let queryImdbFilms = imdbFilms.Search.map(film => film.imdbID).join(",");
                    return fetch(`/api/films/imdbIds?imdbIds=${queryImdbFilms}`);
                }
            })
            .then(res => res.json())
            .then(myFilms => {
                let films = imdbFilms.Search.map(film => {
                    let isMyFilm = false;
                    if (myFilms.length > 0 && myFilms.find(myFilm => myFilm.imdbId == film.imdbID))
                        isMyFilm = true;
                    let poster = (film.Poster == "N/A" ? "" : film.Poster);
                    return {
                        title: film.Title,
                        released: film.Year,
                        imdbId: film.imdbID,
                        poster: poster,
                        isMyFilm: isMyFilm
                    };
                });

                this.setState({
                    films: films
                });
            });
    }

    componentDidMount() {
        this.searchMyFilms();
    }
}

export default App;
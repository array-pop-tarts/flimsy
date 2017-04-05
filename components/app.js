/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-02
 */
import React from 'react';
import $ from 'jquery';

import Header from './layout/header';
import Search from './layout/search';
import Login from './sections/auth/login';
import Films from './sections/films';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
            userIsLoaded: false,
            films: []
        };

        this.userLoggedIn = this.userLoggedIn.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
        this.searchMyFilms = this.searchMyFilms.bind(this);
        this.searchImdbFilms = this.searchImdbFilms.bind(this);

        this.refreshFilm = this.refreshFilm.bind(this);
    }

    render() {
        console.log(this.state.user);
        return (
            <div className="container-fluid">
                <Header/>
                <Search handleSearch={ (search) => this.handleSearch(search) } />
                {
                    (this.state.user !== null) ?
                        <Films films={ this.state.films }
                               refreshFilm={ this.refreshFilm }
                        /> :
                        <Login onLogin={ this.userLoggedIn } />
                }
            </div>
        );
    }

    userLoggedIn(user) {
        this.setState({
            user: user
        }, this.searchMyFilms(""));
    }

    handleSearch(search) {
        if (search.searchMyFilmsOnly)
            this.searchMyFilms(search.text);
        else
            this.searchImdbFilms(search.text);
    }

    searchMyFilms(text) {
        fetch(`/api/films?search=${ text }`)
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                //loaded_films: true
            }));
    }

    searchImdbFilms(text) {
        let imdbFilms;

        fetch(`http://www.omdbapi.com/?s=${ text }&type=movie`)
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

    refreshFilm(filmId) {
        fetch(`/api/films/${filmId}`)
            .then(res => res.json())
            .then(film => {
                let films = this.state.films.map(current => {
                    if (current._id === film._id) {
                        return film;
                    }
                    return current;
                });
                this.setState({films: films});
            });
    }

/*
    componentDidMount() {
        fetch('/api/me')
            .then(res => {
                console.log(res);
                if (res.success) {
                    return res.json()
                } else {
                    throw new Error("Not logged in")
                }
            })
            .then(user => {
                console.log("mount", user);
                this.setState({
                    userIsLoaded: true
                });
                if (user)
                    this.userLoggedIn(user);
            });

    }
*/
    componentDidMount() {
        $.getJSON('/api/me', (user) => {
            if (user !== null) {
                this.userLoggedIn(user);
            }
        })
    }

}

export default App;
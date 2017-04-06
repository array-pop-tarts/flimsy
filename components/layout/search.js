/**
 * search
 * Author: Barbara Goss
 * Created: 2017-04-04
 */
import React from 'react';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchInput: "",
            searchMyFilmsOnly: true,
        };

        this.updateSearchInput = this.updateSearchInput.bind(this);
        this.updateMyFilmsCheckbox = this.updateMyFilmsCheckbox.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    render() {
        return (
            <form className="search-films col-12" onSubmit={ (e) => this.handleSearch(e) } >
                <div className="input-group">
                    <input className="form-control"
                           type="text"
                           name="search_films"
                           placeholder="Search for films..."
                           value={ this.state.searchInput }
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
        );
    }

    updateSearchInput(e) {
        this.setState({
            searchInput: e.target.value
        });
    }

    updateMyFilmsCheckbox(e) {
        this.setState({
            searchMyFilmsOnly: e.target.checked
        });
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch({
            text: this.state.searchInput,
            searchMyFilmsOnly: this.state.searchMyFilmsOnly
        }, this.setState({searchInput: ""}));
    }

}

export default Search;
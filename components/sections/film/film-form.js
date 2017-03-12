/**
 * film-form
 * Author: Barbara Goss
 * Created: 2017-03-02
 */
import React from 'react';

class FilmForm extends React.Component {
    constructor() {
        super();

        this.state = {
            title: "",
            translation: "",
            released: null,
            rating: null
        };

        this.onChangeReleased = this.onChangeReleased.bind(this);

    }

    render() {
            let now = new Date();
            let currentYear = now.getFullYear();
            let yearOptions = [];

            for (let year = (currentYear + 1); year >= 1888; year--) {
                yearOptions.push(year);
            }
        return (
            <div>
                <div className="d-flex">
                        <input type="text"
                               value={ this.state.title }
                               name="title"
                               className="form-control"
                               placeholder="Original title"
                               style={ {flexGrow: 3 } }
                        />
                        <select name="released"
                                value={ this.state.released || currentYear }
                                className="form-control"
                                onChange={ this.onChangeReleased }
                                style={ {flexGrow: 1 } }
                        >
                            {
                                yearOptions.map((year, i) => {
                                    return <option value={ year } key={i} >{ year }</option>
                                })
                            }
                        </select>
                </div>
                <input type="text"
                       value={ this.state.translation }
                       name="translation"
                       className="form-control form-control-sm"
                       placeholder="English translation"
                />
            </div>
        );
    }

    onChangeReleased(e) {
        let selectedYear = parseInt(e.target.value);
        this.setState({released: selectedYear});
    }

}

export default FilmForm;
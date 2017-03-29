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
            loaded_films: false
        };

        //this.refresh = this.refresh.bind(this);
    }

    render() {
        //if (this.state.loaded_films) {
            return (
                <div className="masonry">
                    {this.props.films.map((film, i) => {
                        return (
                            <Film film={ film }
                                  key={ i }
                                  i={ i }
                                  //onRefresh={ this.refresh() }
                            />
                        );
                    })}
                </div>
            );
/*
        } else {
            return <div>Loading...</div>;
        }
*/
    }
}

export default Films;
/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';

import Film from './film';

class Films extends React.Component {

    render() {
        return (
            <div className="masonry">
                {this.props.films.map((film, i) => {
                    return (
                        <Film film={ film }
                              key={ film._id || i }
                              refreshFilm={ this.props.refreshFilm }
                        />
                    );
                })}
            </div>
        );
    }
}

export default Films;
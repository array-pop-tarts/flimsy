/**
 * released_year
 * Author: Barbara Goss
 * Created: 2017-02-25
 */
import React from 'react';

class ReleasedYear extends React.Component {
    render() {
        return (
            <a className="btn btn-sm btn-success">
                { this.props.year }
            </a>
        );
    }
}

export default ReleasedYear;
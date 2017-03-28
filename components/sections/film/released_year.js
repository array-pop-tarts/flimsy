/**
 * released_year
 * Author: Barbara Goss
 * Created: 2017-02-25
 */
import React from 'react';

class ReleasedYear extends React.Component {
    render() {
        return (
            <span className="badge badge-success">
                { this.props.year }
            </span>
        );
    }
}

export default ReleasedYear;
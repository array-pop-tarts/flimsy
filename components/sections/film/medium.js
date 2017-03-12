/**
 * medium
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';

class Medium extends React.Component {
    render() {
        return (
            <a className="btn btn-sm btn-secondary">
                { this.props.medium.type }
            </a>
        );
    }
}

export default Medium;
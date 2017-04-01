/**
 * medium
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';

class Medium extends React.Component {
    render() {
        return (
            <li className="list-inline-item">
                { this.props.medium.type }
            </li>
        );
    }
}

export default Medium;
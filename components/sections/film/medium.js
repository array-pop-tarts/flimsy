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
                <button className="button-transparent"
                        title="Edit"
                        onClick={ this.props.onEditMedium }>
                    <i className="fa fa-gear"></i>
                </button>
                <button className="button-transparent"
                        title="Delete"
                        onClick={ this.props.onDeleteMedium }>
                    <i className="fa fa-times"></i>
                </button>
            </li>
        );
    }
}

export default Medium;
/**
 * add-media-button
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
 
import React from 'react';

class AddMediaButton extends React.Component {
    render() {
        return (
            <button className="btn btn-primary btn-sm"
                    aria-label="Add More Media for this Film"
                    onClick={ this.props.onToggleForm() }
            >
                <i className="fa fa-plus"></i>
                { (this.props.expanded) ? " Add Media" : "" }
            </button>
        );
    }
}

export default AddMediaButton;
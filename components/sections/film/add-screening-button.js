/**
 * add-screening-button
 * Author: Barbara Goss
 * Created: 2017-02-25
 */
import React from 'react';

class AddScreeningButton extends React.Component {
    render() {
        return (
            <div className="text-center">
                <button className="btn btn-primary btn-sm m-3"
                        aria-label="Add More Screenings for this Film"
                        onClick={ this.props.onToggleForm() }
                >
                    <i className="fa fa-plus"></i>
                    { (this.props.expanded) ? " Add Screening" : "" }
                </button>
            </div>
        );
    }
}

export default AddScreeningButton;
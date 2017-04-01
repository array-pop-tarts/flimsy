/**
 * form-heading
 * Author: Barbara Goss
 * Created: 2017-04-01
 */
import React from 'react';

class FormHeading extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-18">
                    <h3>Add New { this.props.formType }</h3>
                </div>
                <div className="col-6 screening-actions">
                    <button type="button"
                            className="button-transparent"
                            onClick={ this.props.onCloseForm }>
                        cancel
                    </button>
                </div>
            </div>
        );
    }
}

export default FormHeading;
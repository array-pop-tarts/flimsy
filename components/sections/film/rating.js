/**
 * Author: Barbara Goss
 * Created: 2017-02-20
 */
import React from 'react';

class Rating extends React.Component {
    render() {
        let selectedClass = (this.props.selected) ? "" : "-o";
        return (
            <button className="btn"
                    onMouseOver={ (e) => this.props.highlightRating(this.props.index) }
                    onClick={ this.props.changeRating } >
                <i className={ "fa fa-circle" + selectedClass }></i>
            </button>
        );
    }
}
export default Rating;
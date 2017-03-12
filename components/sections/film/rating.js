/**
 *
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
                    onClick={ (e) => this.props.changeRating(this.props.index) } >
                <i className={ "fa fa-circle" + selectedClass }></i>
            </button>
        );
    }
}
export default Rating;
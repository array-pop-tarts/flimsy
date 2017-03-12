/**
 * user
 * Author: Barbara Goss
 * Created: 2017-02-23
 */
import React from 'react';

class User extends React.Component {
    render() {
        return (
            <div>
                { this.props.user.name }
            </div>
        );
    }
}

export default User;
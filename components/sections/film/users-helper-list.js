/**
 * users-helper-list
 * Author: Barbara Goss
 * Created: 2017-03-01
 */
import React from 'react';

class UsersHelperList extends React.Component {
    render() {
        return (
            <div className="list-group">
                {
                    this.props.users.map((user, i) => {
                        return <VenuesHelperItem user={user}
                                                 key={i}
                                                 selectedVenue={ (e) => this.stuff }
                        />
                    })
                }
            </div>
        );
    }
}

export default UsersHelperList;
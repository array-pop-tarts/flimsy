/**
 * media
 * Author: Barbara Goss
 * Created: 2017-02-20
 */

import React from 'react';

import Medium from './medium';

class Media extends React.Component
{
    render()
    {
        return (
            <ul className="list-inline">
                {
                    this.props.mediaInfo.map((medium, i) => {
                        return (
                            <Medium
                                medium={ medium }
                                key={ i }
                                onEditMedium={ () => this.props.onEditMedium(medium) }
                                onDeleteMedium={ () => this.props.onDeleteMedium(medium) }
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default Media;
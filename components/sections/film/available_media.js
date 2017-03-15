/**
 * available_media
 * Author: Barbara Goss
 * Created: 2017-02-20
 */

import React from 'react';

import Medium from './medium';

class AvailableMedia extends React.Component
{
    render()
    {
        return (
            <span>
                {
                    this.props.mediaInfo.map((medium, i) => {
                        return <Medium medium={ medium } key={ i }/>
                    })
                }
            </span>
        );
    }
}

export default AvailableMedia;
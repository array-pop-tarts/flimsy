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
                    this.props.mediaInfo.map((medium) => {
                        return <Medium medium={ medium } key={ medium.key }/>
                    })
                }
            </span>
        );
    }
}

export default AvailableMedia;
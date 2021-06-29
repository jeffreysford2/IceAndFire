import { Icon } from '@iconify/react'
import fireIcon from '@iconify/icons-mdi/fire-alert'
import snowflakeIcon from '@iconify/icons-mdi/snowflake'


import { InlineIcon } from '@iconify/react';
import hurricaneIcon from '@iconify-icons/bi/hurricane';



const LocationMarker = ({ eventType, lat, lng, onClick }) => {

    return (
        <div className="location-marker" onClick={onClick}>
            {eventType === 8 ?
                <Icon icon={fireIcon} className="fire-icon" />
                :
                eventType === 10 ?
                    <Icon icon={hurricaneIcon} className="hurricaneIcon" />
                    :
                    <Icon icon={snowflakeIcon} className="snowflake-icon" />
            }
        </div>
    )
}

export default LocationMarker
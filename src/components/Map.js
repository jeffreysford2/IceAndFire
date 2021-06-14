import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
const API_KEY = process.env.REACT_APP_API_KEY

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const markers = eventData.map(ev => {
        if (ev.categories[0].id === 8 || ev.categories[0].id === 15) {
            return <LocationMarker key={ev.id} eventType={ev.categories[0].id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title, eventType: ev.categories[0].title })} />
        }
        return null
    })

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 39,
        lng: -110
    },
    zoom: 6
}

export default Map
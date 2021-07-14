import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
require('dotenv').config()
const API_KEY = process.env.REACT_APP_API_KEY

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    useEffect(() => {
        const listener = e => {
            if (e.key === 'Escape' || e.target.nodeName === 'DIV') {
                setLocationInfo(null)
            }
        };
        window.addEventListener('keydown', listener);
        window.addEventListener('click', listener)
        return () => {
            window.removeEventListener('keydown', listener);
            window.removeEventListener('click', listener)
        }
    }, [])

    const markers = eventData.map(ev => {
        if (ev.categories[0].id === 8 || ev.categories[0].id === 15) {
            return <LocationMarker key={ev.id} eventType={ev.categories[0].id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title, eventType: ev.categories[0].title })} />
        } else if (ev.categories[0].id === 10) {
            return <LocationMarker key={ev.id} eventType={ev.categories[0].id} lat={ev.geometries[ev.geometries.length - 1].coordinates[1]} lng={ev.geometries[ev.geometries.length - 1].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title, eventType: ev.categories[0].title })} />
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
        lng: -105
    },
    zoom: 5
}

export default Map
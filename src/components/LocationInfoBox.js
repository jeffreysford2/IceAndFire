

const LocationInfoBox = ({ info }) => {
    return (
        <div className="location-info">
            <h3>{info.title}</h3>
            <ul>
                <li>ID: <strong>{info.id}</strong></li>
                <li>TYPE: <strong>{info.eventType}</strong></li>
            </ul>

        </div>
    )
}

export default LocationInfoBox
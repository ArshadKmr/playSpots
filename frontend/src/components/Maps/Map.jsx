import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapRoute from './MapRoute'


const marketIcon = new leaflet.Icon({
    iconUrl: require('../../assets/Images/map-marker-512.jpg'),
    iconSize: [35, 35],
    iconAnchor: [17, 36],
    popupAnchor: [0, -36]
})


const Maps = (coords) => {
    const [center, setCenter] = useState([coords.coords.latitude, coords.coords.longitude])
    const [location, setLocation] = useState(null)
    const [route, setRoute] = useState(false)
    const ZOOM_LEVEL = 18
    const mapRef = useRef()

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            }, (error) => {
                console.error("Error getting location:", error);
            });
        } else {
            console.error("Geolocation is not available in this browser.");
        }
    },[]);

    const showMyLocation = () => {
        if (location) {
            mapRef.current.flyTo([location.latitude, location.longitude], ZOOM_LEVEL, { animate: true })
            setRoute(true)
        } else {
            console.log('error')
        }
    }

    return (
        <div>
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    attribution=' <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAPKEY}`}
                />
                <Marker position={center} icon={marketIcon}>
                    <Popup>
                        <b>Turf Location</b>
                    </Popup>
                </Marker>
                {route && <MapRoute from={location} to={center} style={{ height: '400px', width: '100%' }}/>}
                {location && <Marker position={[location.latitude, location.longitude]} icon={marketIcon}>
                    <Popup>
                        <b>Current Location</b>
                    </Popup>
                </Marker>}
            </MapContainer>
            <div className='flex justify-center m-2'>
                <button onClick={() => showMyLocation()} className='bg-indigo-600/80 text-gray-50 p-2 rounded'>Show Route</button>
            </div>
        </div>
    )
}

export default Maps
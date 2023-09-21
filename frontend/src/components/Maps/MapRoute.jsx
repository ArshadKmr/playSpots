import { useEffect } from 'react'
import L from 'leaflet'
import { useMap } from 'react-leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const MapRoute = (from) => {
    const map = useMap()
    console.log(from)
    useEffect(() => {
        if (from?.from?.latitude) {
            L.Routing.control({
                waypoints: [
                    L.latLng(from?.from?.latitude, from?.from?.longitude),
                    L.latLng(from?.to[0], from?.to[1])
                ],
                lineOptions: {
                    styles: [{
                        color: 'blue',
                        weight: 5,
                        opacity: 0.7
                    }]
                }
            }).addTo(map);
        }
    }, [from, map])
    return null
}

export default MapRoute
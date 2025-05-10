import { useNavigate } from "react-router";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [ lat, lng ] = useUrlPosition();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation(mapPosition);

  useEffect(function() {
    if (!lat || !lng) return;
    setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(function() {
    if(!geolocationPosition) return;
    setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);
  return (
    <div className={styles.mapContainer} >
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading...": "Use your position"}
        </Button>
      )}
      <MapContainer zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        { cities?.map(city => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition}/>
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setZoom(6);
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
   useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
   })
}
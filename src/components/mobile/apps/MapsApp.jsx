import React, { useEffect, useRef } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const locations = [
    { name: 'MEWO', desc: 'École - BTS SIO SISR', lat: 49.1203, lng: 6.1778, emoji: '🎓' },
    { name: 'SIE', desc: 'Alternance', lat: 49.1156, lng: 6.1742, emoji: '💼' },
    { name: 'Domicile', desc: 'Audun-le-Tiche', lat: 49.4667, lng: 5.95, emoji: '🏠' },
];

// Component to fly to a location
function FlyToLocation({ location }) {
    const map = useMap();
    const hasFlown = useRef(false);

    useEffect(() => {
        if (location && !hasFlown.current) {
            hasFlown.current = true;
            setTimeout(() => {
                map.flyTo([location.lat, location.lng], 14, { duration: 1.5 });
            }, 500);
        }
    }, [location, map]);

    return null;
}

const MapsApp = ({ onClose, appInfo }) => {
    const initialLocation = appInfo?.initialLocation;
    const defaultCenter = initialLocation
        ? [initialLocation.lat, initialLocation.lng]
        : [49.2, 6.1];
    const defaultZoom = initialLocation ? 12 : 9;

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            {/* Navigation Bar */}
            <div
                className="px-4 py-3 flex items-center border-b border-gray-200 z-[1000] relative"
                style={{
                    background: 'rgba(249,250,251,0.9)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <button onClick={onClose} className="flex items-center text-blue-500 font-medium">
                    <FaChevronLeft className="mr-1" size={14} />
                    <span>Retour</span>
                </button>
                <h1 className="flex-1 text-center font-semibold text-gray-900 pr-12">
                    {initialLocation ? initialLocation.name : 'Mes Lieux'}
                </h1>
            </div>

            {/* Map */}
            <div className="flex-1 relative">
                <MapContainer
                    center={defaultCenter}
                    zoom={defaultZoom}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((loc, index) => (
                        <Marker key={index} position={[loc.lat, loc.lng]}>
                            <Popup>
                                <div className="text-center">
                                    <span className="text-2xl">{loc.emoji}</span>
                                    <p className="font-bold mt-1">{loc.name}</p>
                                    <p className="text-sm text-gray-500">{loc.desc}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    {initialLocation && <FlyToLocation location={initialLocation} />}
                </MapContainer>
            </div>

            {/* Locations List Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-4 z-[1000]">
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                <div className="flex space-x-3 overflow-x-auto pb-2">
                    {locations.map((loc, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 flex items-center rounded-xl px-3 py-2 ${initialLocation?.name === loc.name
                                    ? 'bg-blue-100 ring-2 ring-blue-500'
                                    : 'bg-gray-50'
                                }`}
                        >
                            <span className="text-xl mr-2">{loc.emoji}</span>
                            <div>
                                <p className="font-medium text-gray-900 text-sm">{loc.name}</p>
                                <p className="text-xs text-gray-500">{loc.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapsApp;

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useOS } from '../../contexts/OSContext';

// --- CONFIGURATION ---
// Hack pour les icônes Leaflet avec Vite/Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Tes coordonnées précises
const LOCATIONS = [
    {
        id: 'work',
        title: 'SIE Grand-Est',
        type: 'Entreprise',
        coords: [49.086, 6.228], // Technopole Metz
        desc: "Mon QG opérationnel. Administration système, support et projets d'infrastructure."
    },
    {
        id: 'school',
        title: 'Campus Mewo',
        type: 'École',
        coords: [49.092, 6.223], // Proche du Lac Symphonie
        desc: "Lieu de formation BTS SIO. Acquisition des compétences théoriques et labs réseau."
    },
    {
        id: 'home',
        title: 'Domicile',
        type: 'Base Arrière',
        coords: [49.432, 5.952], // Audun-le-Tiche (Frontière luxembourgeoise)
        desc: "HomeLab personnel. Veille technologique et auto-hébergement."
    },
    {
        id: 'cathedrale',
        title: 'Cathédrale Saint-Étienne',
        type: 'Monument',
        coords: [49.1203, 6.1778],
        desc: "Joyau de l'architecture gothique. Modèle 3D disponible.",
        action: 'open_3d_model',
        modelUrl: '/assets/metz_cathedral.glb',
        hidden: true
    }
];

// --- COMPOSANT INTERNE POUR L'ANIMATION ---
// Ce composant doit être DANS le MapContainer pour accéder au hook useMap()
const MapController = ({ selectedLocation }) => {
    const map = useMap();

    React.useEffect(() => {
        if (selectedLocation) {
            map.flyTo(selectedLocation.coords, 16, {
                duration: 2 // Animation fluide de 2 secondes
            });
        }
    }, [selectedLocation, map]);

    return null;
};

// --- APPLICATION PRINCIPALE ---
const MapsApp = () => {
    const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]);
    const { openWindow } = useOS();

    return (
        <div className="flex h-full w-full bg-gray-900 text-white overflow-hidden rounded-b-xl">

            {/* SIDEBAR (Liste des lieux) */}
            <div className="w-1/3 bg-gray-800/50 backdrop-blur-md border-r border-white/10 p-4 flex flex-col gap-2 z-10">
                <h2 className="text-xl font-bold mb-4 pl-2">Localisations</h2>
                {LOCATIONS.filter(l => !l.hidden).map((loc) => (
                    <button
                        key={loc.id}
                        onClick={() => setActiveLocation(loc)}
                        className={`text-left p-3 rounded-xl transition-all duration-200 border ${activeLocation.id === loc.id
                            ? 'bg-blue-600/20 border-blue-500/50 text-blue-100'
                            : 'bg-white/5 border-transparent hover:bg-white/10 text-gray-300'
                            }`}
                    >
                        <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">{loc.type}</div>
                        <div className="font-bold">{loc.title}</div>
                    </button>
                ))}

                <div className="mt-auto p-3 bg-blue-900/20 rounded-lg border border-blue-500/20 text-xs text-blue-200">
                    ℹ️ Info : Le trajet Domicile - Travail couvre tout le sillon mosellan.
                </div>
            </div>

            {/* MAP CONTAINER */}
            <div className="w-2/3 h-full relative z-0">
                <MapContainer
                    center={activeLocation.coords}
                    zoom={13}
                    style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
                    zoomControl={false} // On peut faire nos propres boutons si on veut
                >
                    {/* TUILES DARK MODE (Gratuites via CartoDB) */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    <MapController selectedLocation={activeLocation} />

                    {LOCATIONS.map((loc) => (
                        <Marker key={loc.id} position={loc.coords} icon={customIcon}>
                            <Popup className="custom-popup">
                                <div className="text-gray-800">
                                    <strong className="block text-sm mb-1">{loc.title}</strong>
                                    <span className="text-xs block mb-2">{loc.desc}</span>
                                    {loc.action === 'open_3d_model' && (
                                        <button
                                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition w-full flex items-center justify-center gap-1 shadow-sm"
                                            onClick={() => {
                                                openWindow({
                                                    id: 'model-viewer',
                                                    title: '3D Viewer',
                                                    icon: '🧊',
                                                    state: { url: loc.modelUrl }
                                                });
                                            }}
                                        >
                                            <span>🧊</span> Voir le modèle 3D
                                        </button>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapsApp;

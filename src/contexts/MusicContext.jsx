import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStation, setCurrentStation] = useState(null);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(new Audio());

    const stations = [
        { id: 'smoothchill', name: 'Smooth Chill', genre: 'Chill/Lofi', url: 'https://media-ssl.musicradio.com/SmoothChill', cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b' },
        { id: 'spoon', name: 'Spoon Radio', genre: 'Rock/Alt', url: 'http://spoonradio.ice.infomaniak.ch/spoonradio-128.mp3', cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee' },
        { id: 'energy', name: 'Energy Zürich', genre: 'Pop/Hits', url: 'http://energyzuerich-high.ice.infomaniak.ch/energyzuerich-high.mp3', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
        { id: 'jazz', name: 'Jazz Cafe', genre: 'Jazz', url: 'http://jazz-wr04.ice.infomaniak.ch/jazz-wr04-128.mp3', cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629' },
        { id: 'classical', name: 'Classical FM', genre: 'Classical', url: 'https://media-ssl.musicradio.com/ClassicFM', cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384ebd' },
    ];

    useEffect(() => {
        if (!currentStation) setCurrentStation(stations[0]);
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (currentStation) {
            // Only change source if it's different to avoid reloading
            if (audioRef.current.src !== currentStation.url) {
                audioRef.current.src = currentStation.url;
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.error("Play error", e));
                }
            }
        }
    }, [currentStation]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Play error", e));
        }
        setIsPlaying(!isPlaying);
    };

    const playStation = (station) => {
        setCurrentStation(station);
        setIsPlaying(true);
        // Effect hook handles the actual playing
    };

    return (
        <MusicContext.Provider value={{
            isPlaying,
            togglePlay,
            currentStation,
            playStation,
            stations,
            volume,
            setVolume
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);

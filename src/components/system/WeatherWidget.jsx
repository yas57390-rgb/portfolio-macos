import React, { useState, useEffect } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaSmog, FaCloudSun } from 'react-icons/fa';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Coordinates for Metz, France
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=49.1193&longitude=6.1757&current_weather=true');
                const data = await res.json();
                setWeather(data.current_weather);
                setLoading(false);
            } catch (err) {
                console.error("Weather fetch error", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchWeather();
        // Refresh every 30 mins
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        // WMO Weather interpretation codes
        if (code === 0) return <FaSun className="text-yellow-400" />;
        if (code === 1 || code === 2 || code === 3) return <FaCloudSun className="text-gray-300" />;
        if (code >= 45 && code <= 48) return <FaSmog className="text-gray-400" />;
        if (code >= 51 && code <= 67) return <FaCloudRain className="text-blue-400" />;
        if (code >= 71 && code <= 77) return <FaSnowflake className="text-white" />;
        if (code >= 80 && code <= 82) return <FaCloudRain className="text-blue-500" />;
        if (code >= 95) return <FaBolt className="text-yellow-500" />;
        return <FaCloud className="text-gray-400" />;
    };

    const getWeatherDescription = (code) => {
        if (code === 0) return "Ensoleillé";
        if (code >= 1 && code <= 3) return "Partiellement nuageux";
        if (code >= 45 && code <= 48) return "Brume";
        if (code >= 51 && code <= 67) return "Pluie";
        if (code >= 71 && code <= 77) return "Neige";
        if (code >= 95) return "Orage";
        return "Nuageux";
    };

    if (loading) return (
        <div className="w-full h-24 bg-white/10 rounded-xl mb-4 animate-pulse"></div>
    );

    if (error || !weather) return null;

    return (
        <div className="w-full bg-gradient-to-br from-blue-500/20 to-blue-900/20 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between text-white shadow-lg relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-400/40 transition-colors"></div>

            <div>
                <h3 className="text-lg font-bold">Metz, FR</h3>
                <p className="text-xs text-blue-200 uppercase font-semibold tracking-wider">{getWeatherDescription(weather.weathercode)}</p>
                <div className="mt-1 text-3xl font-light tracking-tighter">
                    {Math.round(weather.temperature)}°
                </div>
            </div>

            <div className="text-4xl drop-shadow-md">
                {getWeatherIcon(weather.weathercode)}
            </div>
        </div>
    );
};

export default WeatherWidget;

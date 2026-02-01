import React, { useState, useEffect } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaSmog, FaCloudSun, FaMapMarkerAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DesktopWeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Metz, France
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=49.1193&longitude=6.1757&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto');
                const data = await res.json();
                setWeather({
                    ...data.current_weather,
                    max: data.daily.temperature_2m_max[0],
                    min: data.daily.temperature_2m_min[0]
                });
                setLoading(false);
            } catch (err) {
                console.error("Weather fetch error", err);
                setLoading(false);
            }
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        if (code === 0) return <FaSun className="text-yellow-300" />;
        if (code === 1 || code === 2 || code === 3) return <FaCloudSun className="text-white/80" />;
        if (code >= 45 && code <= 48) return <FaSmog className="text-gray-300" />;
        if (code >= 51 && code <= 67) return <FaCloudRain className="text-blue-300" />;
        if (code >= 71 && code <= 77) return <FaSnowflake className="text-white" />;
        if (code >= 95) return <FaBolt className="text-yellow-400" />;
        return <FaCloud className="text-gray-300" />;
    };

    const getWeatherDescription = (code) => {
        if (code === 0) return "Ensoleillé";
        if (code >= 1 && code <= 3) return "Nuageux";
        if (code >= 51 && code <= 67) return "Pluie";
        return "Variable";
    };

    if (loading || !weather) return (
        <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-[22px] animate-pulse"></div>
    );

    return (
        <div className="w-40 h-40 bg-blue-500/80 backdrop-blur-xl border border-white/10 rounded-[22px] p-4 flex flex-col justify-between shadow-2xl text-white relative overflow-hidden cursor-default select-none font-sans">

            {/* Header: Location */}
            <div className="flex flex-col z-10">
                <span className="text-base font-bold flex items-center gap-1">
                    Metz
                </span>
                <span className="text-[11px] font-medium opacity-90 uppercase tracking-wide">
                    {getWeatherDescription(weather.weathercode)}
                </span>
            </div>

            {/* Icon (Big Background) */}
            <div className="absolute -right-2 top-8 text-7xl opacity-20 transform scale-110">
                {getWeatherIcon(weather.weathercode)}
            </div>

            {/* Temp */}
            <div className="flex flex-col mt-auto z-10">
                <span className="text-5xl font-light tracking-tighter leading-none mb-1">
                    {Math.round(weather.temperature)}°
                </span>
                <div className="flex gap-3 text-[11px] font-medium opacity-90">
                    <span className="flex items-center gap-0.5"><FaArrowUp size={8} />{Math.round(weather.max)}°</span>
                    <span className="flex items-center gap-0.5"><FaArrowDown size={8} />{Math.round(weather.min)}°</span>
                </div>
            </div>
        </div>
    );
};

export default DesktopWeatherWidget;

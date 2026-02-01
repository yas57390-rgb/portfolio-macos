import React, { useState, useEffect } from 'react';
import { FaWifi, FaSignal, FaBatteryFull } from 'react-icons/fa';

const IOSStatusBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="absolute top-0 left-0 right-0 h-12 px-6 flex items-center justify-between z-50">
            {/* Left - Time */}
            <div className="text-white font-semibold text-sm">
                {formatTime(time)}
            </div>

            {/* Center - Dynamic Island (iPhone 14+ style) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2">
                <div className="w-28 h-7 bg-black rounded-full" />
            </div>

            {/* Right - Status Icons */}
            <div className="flex items-center space-x-1.5 text-white">
                <FaSignal className="text-xs" />
                <FaWifi className="text-sm" />
                <div className="flex items-center">
                    <FaBatteryFull className="text-lg" />
                </div>
            </div>
        </div>
    );
};

export default IOSStatusBar;

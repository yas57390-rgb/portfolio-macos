import React from 'react';
import CalendarWidget from './CalendarWidget';
import DesktopWeatherWidget from './DesktopWeatherWidget';
import PhotoWidget from './PhotoWidget';

const DesktopWidgets = () => {
    return (
        <div className="absolute top-12 right-6 flex flex-col gap-4 pointer-events-auto z-0 select-none items-end">
            {/* Row 1: Calendar + Weather */}
            <div className="flex gap-4">
                <CalendarWidget />
                <DesktopWeatherWidget />
            </div>

            {/* Row 2: Photo Widget (Wide) */}
            {/* w-40 (160px) + gap-4 (16px) + w-40 (160px) = 336px wide approx */}
            <div className="w-[336px]">
                <PhotoWidget />
            </div>
        </div>
    );
};

export default DesktopWidgets;

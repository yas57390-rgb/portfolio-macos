import React, { useRef } from 'react';

const IOSHomeScreen = ({ apps, onAppOpen, isAppOpening, currentPage, onPageChange }) => {
    const containerRef = useRef(null);

    // Split apps into pages of 8
    const appsPerPage = 8;
    const pages = [];
    for (let i = 0; i < apps.length; i += appsPerPage) {
        pages.push(apps.slice(i, i + appsPerPage));
    }

    // Touch handling for swipe
    const touchStartX = useRef(0);

    const handleSwipe = (direction) => {
        if (direction === 'left' && currentPage < pages.length - 1) {
            onPageChange(currentPage + 1);
        } else if (direction === 'right' && currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        if (Math.abs(diff) > 50) {
            handleSwipe(diff > 0 ? 'left' : 'right');
        }
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pt-14 pb-28 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Carousel wrapper */}
            <div
                className="h-full flex"
                style={{
                    width: `${pages.length * 100}%`,
                    transform: `translateX(-${(currentPage * 100) / pages.length}%)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                {pages.map((pageApps, pageIndex) => (
                    <div
                        key={pageIndex}
                        className="h-full px-6"
                        style={{ width: `${100 / pages.length}%` }}
                    >
                        <div className="grid grid-cols-4 gap-x-4 gap-y-6 content-start pt-4">
                            {pageApps.map((app) => {
                                const IconComponent = app.icon;
                                return (
                                    <button
                                        key={app.id}
                                        onClick={() => onAppOpen(app)}
                                        disabled={isAppOpening}
                                        className="flex flex-col items-center group"
                                    >
                                        {/* App Icon - iOS Style Squircle */}
                                        <div
                                            className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center shadow-lg transform transition-all duration-150 active:scale-90"
                                            style={{
                                                backgroundColor: app.color,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <IconComponent className="text-white" size={28} />
                                        </div>
                                        {/* App Name */}
                                        <span className="mt-1.5 text-[11px] text-white/90 font-medium text-center leading-tight truncate w-[70px]">
                                            {app.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Page Indicator */}
            <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2">
                {pages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentPage
                            ? 'bg-white w-2.5 h-2.5'
                            : 'bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default IOSHomeScreen;

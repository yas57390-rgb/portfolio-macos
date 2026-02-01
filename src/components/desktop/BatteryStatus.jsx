import React, { useState, useEffect, useRef } from 'react';

const BatteryStatus = () => {
    const [battery, setBattery] = useState({
        level: 1, // 1 = 100%
        charging: false,
        supported: true
    });
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        // Compatibilité
        if (!('getBattery' in navigator)) {
            setBattery(prev => ({ ...prev, supported: false }));
            return;
        }

        let batteryManager = null;
        const updateBattery = () => {
            if (batteryManager) {
                setBattery({
                    level: batteryManager.level,
                    charging: batteryManager.charging,
                    supported: true
                });
            }
        };

        navigator.getBattery().then((manager) => {
            batteryManager = manager;
            updateBattery();
            manager.addEventListener('chargingchange', updateBattery);
            manager.addEventListener('levelchange', updateBattery);
        });

        // Click Outside
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('chargingchange', updateBattery);
                batteryManager.removeEventListener('levelchange', updateBattery);
            }
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getBatteryColor = () => {
        if (battery.charging) return 'bg-green-400';
        if (battery.level < 0.2) return 'bg-red-500';
        return 'bg-white';
    };

    const widthPercentage = `${Math.round(battery.level * 100)}%`;

    return (
        <div className="relative h-full flex items-center" ref={menuRef}>
            {/* Bouton Principal (Icone Seule) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center p-1.5 rounded transition-all duration-200 outline-none ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
            >
                {/* Icône Batterie */}
                <div className="relative w-[22px] h-[11px] border border-white/40 rounded-[2.5px] p-[1px]">
                    {/* Le "Nipple" */}
                    <div className="absolute -right-[2.5px] top-[3px] h-[3px] w-[2px] bg-white/40 rounded-r-[1px]"></div>

                    {/* La jauge */}
                    <div
                        className={`h-full rounded-[1px] transition-all duration-500 ease-out ${getBatteryColor()}`}
                        style={{ width: widthPercentage }}
                    />

                    {/* L'éclair */}
                    {battery.charging && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-2.5 h-2.5 text-black drop-shadow-md animate-pulse"
                            >
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                    )}
                </div>
            </button>

            {/* Dropdown Menu Style Control Center */}
            {isOpen && (
                <div className="absolute top-8 right-0 w-[280px] bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-2xl rounded-2xl p-4 border border-white/20 text-gray-800 dark:text-white animate-fade-in origin-top-right z-50 select-none flex flex-col gap-3">

                    {/* Bloc Status */}
                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold text-[13px] tracking-wide">Batterie</span>
                            <span className="text-[13px] font-medium opacity-70 tabular-nums">
                                {Math.round(battery.level * 100)} %
                            </span>
                        </div>
                        <div className="text-[11px] opacity-60">
                            Source : <span className="opacity-100 font-medium">{battery.charging ? 'Secteur' : 'Batterie'}</span>
                        </div>
                    </div>



                </div>
            )}
        </div>
    );
};

export default BatteryStatus;

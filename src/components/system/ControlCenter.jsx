import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../contexts/OSContext';
import { useMusic } from '../../contexts/MusicContext';
import { FaWifi, FaBluetoothB, FaMoon, FaSun, FaVolumeUp } from 'react-icons/fa';

const ControlCenter = () => {
    const { theme, toggleTheme, brightness, setBrightness } = useOS();
    const { volume, setVolume } = useMusic();
    const [isOpen, setIsOpen] = useState(false);
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        const toggle = () => setIsOpen(prev => !prev);
        const close = (e) => {
            if (
                isOpen &&
                ref.current &&
                !ref.current.contains(e.target) &&
                !e.target.closest('#control-center-toggle')
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener('toggle-control-center', toggle);
        window.addEventListener('click', close);

        return () => {
            window.removeEventListener('toggle-control-center', toggle);
            window.removeEventListener('click', close);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className="fixed top-10 right-4 w-80 bg-white/70 dark:bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 z-[60] flex flex-col gap-4 text-gray-800 dark:text-white animate-fade-in-down"
            onClick={e => e.stopPropagation()}
        >
            {/* Connectivity Block */}
            <div className="flex gap-4">
                <div className="flex-1 bg-white/50 dark:bg-gray-700/50 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setWifi(!wifi)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${wifi ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}
                        >
                            <FaWifi size={14} />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-none">Wi-Fi</span>
                            <span className="text-[10px] opacity-70 leading-none mt-1">{wifi ? 'Home_5G' : 'Off'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white/50 dark:bg-gray-700/50 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setBluetooth(!bluetooth)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${bluetooth ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}
                        >
                            <FaBluetoothB size={14} />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-none">Bluetooth</span>
                            <span className="text-[10px] opacity-70 leading-none mt-1">{bluetooth ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Toggles */}
            <div className="flex gap-4">
                <div className="flex-1 bg-white/50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-white text-black' : 'bg-gray-200 text-black'}`}
                    >
                        <FaMoon size={14} />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none">Dark Mode</span>
                        <span className="text-[10px] opacity-70 leading-none mt-1">{theme === 'dark' ? 'On' : 'Off'}</span>
                    </div>
                </div>
            </div>

            {/* Sliders */}
            <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-3 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold px-1">Display</span>
                    <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 rounded-full p-1 pl-3 border border-gray-200/20">
                        <FaSun className="text-gray-500 dark:text-gray-400" size={14} />
                        <input
                            type="range"
                            min="0" max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold px-1">Sound</span>
                    <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 rounded-full p-1 pl-3 border border-gray-200/20">
                        <FaVolumeUp className="text-gray-500 dark:text-gray-400" size={14} />
                        <input
                            type="range"
                            min="0" max="1" step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ControlCenter;

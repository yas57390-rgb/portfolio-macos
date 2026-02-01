import React, { useState, useEffect, useRef } from 'react';
import BatteryStatus from './BatteryStatus';
import { format } from 'date-fns';
import { FaApple, FaWifi, FaBatteryFull, FaSearch, FaBell, FaMicrophone } from 'react-icons/fa';
import { BsSliders } from 'react-icons/bs';
import { useOS } from '../../contexts/OSContext';
import { useMusic } from '../../contexts/MusicContext';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';



const MenuBar = ({ toggleSiri, currentStep, onStepChange }) => {
    // ... hooks unchanged ...
    const { openWindow } = useOS();
    const { isPlaying, togglePlay, volume, setVolume, currentStation } = useMusic();
    const [time, setTime] = useState(new Date());
    const [showMusicMenu, setShowMusicMenu] = useState(false);
    const musicMenuRef = useRef(null);
    const menubarRef = useRef(null);

    const steps = [
        { id: 1, label: 'Intro' },
        { id: 2, label: 'SIE' },
        { id: 3, label: 'CV' },
        { id: 4, label: 'Portfolio' },
        { id: 5, label: 'Certifs' },
        { id: 6, label: 'Veille' },
        { id: 7, label: 'Guide' },
        { id: 8, label: 'Contact' }
    ];

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);

        const handleClickOutside = (event) => {
            if (musicMenuRef.current && !musicMenuRef.current.contains(event.target)) {
                setShowMusicMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            clearInterval(interval);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={menubarRef}
            className="w-full h-9 px-4 text-white text-[13px] font-medium relative z-50 flex items-center justify-between transition-colors duration-300"
            style={{
                background: 'rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                boxShadow: '0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
        >

            {/* Left Side */}
            <div className="flex items-center space-x-1 relative z-20">
                <button
                    className="hover:bg-white/10 rounded px-2 py-0.5 transition-colors mr-3"
                    onClick={() => openWindow({ id: 'about', title: 'About This Mac', width: 500, height: 300, isFixed: true })}
                >
                    <FaApple size={16} className="mb-[1px]" />
                </button>

                {/* Onboarding Navigation Links Replaces Standard Menus */}
                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    return (
                        <button
                            key={step.id}
                            onClick={() => onStepChange && onStepChange(step.id)}
                            className={`
                                relative px-3 py-0.5 rounded text-[13px] font-medium transition-all duration-200 outline-none
                                ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-white/90 hover:bg-white/5'}
                            `}
                        >
                            {step.label}
                        </button>
                    );
                })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-5 h-full relative z-20 ml-auto"> {/* Increased spacing slightly */}
                {/* Music Control / Speaker */}
                <div className="relative flex items-center h-full" ref={musicMenuRef}>
                    <button
                        className={`hover:text-white/70 transition-colors flex items-center ${isPlaying ? 'text-blue-400' : ''}`}
                        onClick={() => setShowMusicMenu(!showMusicMenu)}
                    >
                        <FaVolumeUp size={15} />
                    </button>

                    {/* Mini Player Dropdown */}
                    {showMusicMenu && (
                        <div className="absolute top-10 right-0 w-72 bg-[#1e1e1e]/90 backdrop-blur-xl shadow-2xl rounded-xl p-4 border border-white/10 text-white animate-fade-in origin-top-right text-left z-50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-bold text-sm text-gray-200">Sound</span>
                                <span className="text-xs text-blue-400 cursor-pointer hover:underline" onClick={() => { openWindow({ id: 'music' }); setShowMusicMenu(false); }}>Open Music</span>
                            </div>

                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gray-700/50 rounded-lg overflow-hidden border border-white/10">
                                    {currentStation?.cover && <img src={currentStation.cover} alt="Cover" className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-sm font-semibold truncate leading-tight">{currentStation?.name || 'No Music Playing'}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{currentStation?.genre}</div>
                                </div>
                                <button onClick={togglePlay} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/5">
                                    {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} className="ml-0.5" />}
                                </button>
                            </div>

                            <div className="select-none px-1">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                                    title="Volume"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <BatteryStatus />
                <button className="hover:text-white/70 transition-colors flex items-center h-full"><FaWifi size={16} /></button>
                <button
                    className="hover:text-white/70 transition-colors flex items-center h-full"
                    onClick={() => window.dispatchEvent(new CustomEvent('toggle-spotlight'))}
                >
                    <FaSearch size={14} />
                </button>
                <button
                    className="hover:text-white/70 text-blue-300 hover:text-blue-100 transition-colors flex items-center h-full"
                    onClick={toggleSiri}
                    title="Siri"
                >
                    <FaMicrophone size={14} />
                </button>
                <button
                    className="hover:text-white/70 transition-colors relative flex items-center h-full"
                    onClick={() => window.dispatchEvent(new CustomEvent('toggle-notification-center'))}
                >
                    <FaBell size={14} />
                </button>
                <button
                    id="control-center-toggle"
                    className="hover:text-white/70 transition-colors flex items-center h-full"
                    onClick={() => window.dispatchEvent(new CustomEvent('toggle-control-center'))}
                >
                    <BsSliders size={14} />
                </button>
                <span className="cursor-default text-right whitespace-nowrap min-w-[130px] font-medium flex items-center justify-end h-full">
                    {format(time, 'EEE d MMM HH:mm')}
                </span>
            </div>
        </div>
    );
};

export default MenuBar;

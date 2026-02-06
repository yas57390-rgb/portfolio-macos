import React, { useState, useRef } from 'react';
import { useOS } from '../../contexts/OSContext';
import AppIcon from '../ui/AppIcon';

const Dock = () => {
    const { openWindow, windows } = useOS();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [bouncingId, setBouncingId] = useState(null);
    const dockRef = useRef(null);

    // Hide dock when a window is in kiosk mode
    const hasKioskWindow = windows.some(w => w.isKioskMode);

    const dockItems = [
        { id: 'finder', title: 'Finder', icon: <AppIcon id="finder" size={48} />, defaultSize: { width: 900, height: 600 } },
        { id: 'it-toolkit', title: 'App Store', icon: <AppIcon id="it-toolkit" size={48} />, defaultSize: { width: 950, height: 640 } },
        { id: 'terminal', title: 'Terminal', icon: <AppIcon id="terminal" size={48} />, defaultSize: { width: 600, height: 400 } },
        { id: 'vscode', title: 'VS Code', icon: <AppIcon id="vscode" size={48} />, defaultSize: { width: 1100, height: 800 } },
        { id: 'contact', title: 'Contact', icon: <AppIcon id="contact" size={48} />, defaultSize: { width: 500, height: 650 } }, // Mobile-like chat
        { id: 'settings', title: 'Settings', icon: <AppIcon id="settings" size={48} />, defaultSize: { width: 700, height: 500 } },
        { id: 'model-viewer', title: '3D Viewer', icon: <AppIcon id="model-viewer" size={48} />, defaultSize: { width: 900, height: 700 } },
        { id: 'rss', title: 'Flux RSS', icon: <AppIcon id="rss" size={48} />, defaultSize: { width: 1000, height: 700 } },
        { id: 'music', title: 'Music', icon: <AppIcon id="music" size={48} />, defaultSize: { width: 1000, height: 700 } },
        { id: 'video-player', title: 'Player', icon: <AppIcon id="video-player" size={48} />, defaultSize: { width: 850, height: 500 } },
        { id: 'game-center', title: 'Game Center', icon: <AppIcon id="game-center" size={48} />, defaultSize: { width: 900, height: 600 } },
        { id: 'calculator', title: 'Calculator', icon: <AppIcon id="calculator" size={48} />, defaultSize: { width: 320, height: 480 } },
        { id: 'notes', title: 'Notes', icon: <AppIcon id="notes" size={48} />, defaultSize: { width: 400, height: 450 } },
        { id: 'maps', title: 'Maps', icon: <AppIcon id="maps" size={48} />, defaultSize: { width: 800, height: 600 } },
        { id: 'gallery', title: 'Photos', icon: <AppIcon id="gallery" size={48} />, defaultSize: { width: 900, height: 600 } }, // Added Gallery
        { id: 'trash', title: 'Trash', icon: <AppIcon id="trash" size={48} />, defaultSize: { width: 900, height: 600 } },
    ];

    const handleAppClick = (item) => {
        setBouncingId(item.id);
        openWindow(item);
        setTimeout(() => setBouncingId(null), 2000); // Stop bouncing after 2s or when window opens
    };

    const isOpen = (id) => windows.some(w => w.appId === id);

    // Don't render dock if kiosk mode is active
    if (hasKioskWindow) return null;

    return (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 w-full">
            <div
                className="rounded-2xl flex items-end px-4 pb-2 pt-2 space-x-2 mb-2 transition-all duration-200 bg-slate-900/40 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 shadow-2xl"
                ref={dockRef}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {dockItems.map((item, index) => {
                    // Magnification Logic
                    let scale = 1;
                    if (hoveredIndex !== null) {
                        const distance = Math.abs(hoveredIndex - index);
                        if (distance === 0) scale = 1.5;
                        else if (distance === 1) scale = 1.3;
                        else if (distance === 2) scale = 1.1;
                    }

                    return (
                        <div
                            key={item.id}
                            id={`dock-item-${item.id}`}
                            className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ease-out ${bouncingId === item.id ? 'animate-bounce' : ''}`}
                            style={{
                                transform: `scale(${scale}) translateY(${scale > 1 ? -10 : 0}px)`,
                                margin: `0 ${scale > 1 ? 10 : 0}px`
                            }}
                            onMouseMove={() => setHoveredIndex(index)}
                            onClick={() => handleAppClick(item)}
                        >
                            {/* Icon Container - AppIcon handles the look */}
                            <div className="transition-all">
                                {item.icon}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-12 bg-gray-800/80 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                {item.title}
                            </div>

                            {/* Open Indicator */}
                            <div className={`absolute -bottom-2 w-1 h-1 bg-black/60 rounded-full transition-opacity duration-300 ${isOpen(item.id) ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dock;

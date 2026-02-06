import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OSContext = createContext();

export const OSProvider = ({ children }) => {
    // --- State Initialization with LocalStorage ---
    const [theme, setTheme] = useState(() => localStorage.getItem('macos-theme') || 'light');
    const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('macos-wallpaper') || 'squares');
    const [windows, setWindows] = useState([]); // Don't persist windows for now to avoid hydration issues with components, or persist only metadata
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(100);
    const [serverStatus, setServerStatus] = useState('online'); // 'online' | 'offline'


    const [windowStyle, setWindowStyle] = useState(() => localStorage.getItem('macos-window-style') || 'glass'); // 'glass' | 'classic'

    // --- Persistence ---
    useEffect(() => {
        localStorage.setItem('macos-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('macos-wallpaper', wallpaper);
    }, [wallpaper]);

    useEffect(() => {
        localStorage.setItem('macos-window-style', windowStyle);
    }, [windowStyle]);


    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // --- Window Management ---
    const openWindow = (appConfig) => {
        setWindows(prevWindows => {
            // Check if window for this app already exists
            const existingWindow = prevWindows.find(w => w.appId === appConfig.id);

            if (existingWindow) {
                // Return updated state with focused window
                const highestZ = prevWindows.reduce((max, w) => Math.max(max, w.zIndex || 0), 0) + 1;

                return prevWindows.map(w => w.id === existingWindow.id ? {
                    ...w,
                    state: { ...w.state, ...(appConfig.state || {}) },
                    file: appConfig.file || w.file,
                    isMinimized: false,
                    zIndex: highestZ
                } : w);
            }

            // Create New Window
            const highestZ = prevWindows.reduce((max, w) => Math.max(max, w.zIndex || 0), 0) + 1;
            const newWindow = {
                ...appConfig,
                id: uuidv4(),
                appId: appConfig.id,
                title: appConfig.title,
                icon: appConfig.icon,
                component: appConfig.component,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: highestZ,
                position: { x: 100 + (prevWindows.length * 30), y: 50 + (prevWindows.length * 30) },
                size: appConfig.defaultSize || { width: 600, height: 400 }
            };

            setActiveWindowId(newWindow.id);
            return [...prevWindows, newWindow];
        });
    };

    const closeWindow = (id) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveWindowId(null);
    };

    const maximizeWindow = (id) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
        focusWindow(id);
    };

    const focusWindow = (id) => {
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: getNextZIndex() } : w));
    };

    const getNextZIndex = () => {
        const highestZ = windows.reduce((max, w) => Math.max(max, w.zIndex || 0), 10);
        return highestZ + 1;
    };

    const resizeWindow = (id, newSize) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, size: newSize } : w));
    };

    // Update window internal state (used by ModelViewerApp)
    const updateWindowState = (id, newState) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, state: { ...w.state, ...newState } } : w));
    };

    // Update window properties (used by MenuBar for WelcomeApp)
    const updateWindow = (id, updates) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    };

    // --- Application Registry (Mapping string names to components if needed) ---
    // For now, we will pass components directly or handle it in Desktop

    return (
        <OSContext.Provider value={{
            theme, setTheme, toggleTheme,
            wallpaper, setWallpaper,
            windows, setWindows,
            activeWindowId,
            openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, resizeWindow,
            volume, setVolume,
            brightness, setBrightness,
            windowStyle, setWindowStyle,
            serverStatus, setServerStatus,
            updateWindowState,
            updateWindow, // New function to update window properties
            moveWindow: (id, position) => {
                setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
            }
        }}>
            {children}
        </OSContext.Provider>
    );
};

export const useOS = () => useContext(OSContext);

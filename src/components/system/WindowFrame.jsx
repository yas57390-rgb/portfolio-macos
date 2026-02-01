import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useOS } from '../../contexts/OSContext';


const WindowFrame = ({ window: win, isTopRanked, children }) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, resizeWindow, moveWindow, windowStyle: currentWindowStyle = 'glass', activeWindowId } = useOS();
    const nodeRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

    const isActive = activeWindowId === win.id;

    const startResize = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        resizeRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startWidth: win.size.width,
            startHeight: win.size.height,
        };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;
            const newWidth = Math.max(300, resizeRef.current.startWidth + (e.clientX - resizeRef.current.startX));
            const newHeight = Math.max(200, resizeRef.current.startHeight + (e.clientY - resizeRef.current.startY));
            resizeWindow(win.id, { width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            if (isResizing) setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, win.id, resizeWindow]);

    // Force remove transform when maximized to fix layout shifting
    useEffect(() => {
        if (win.isMaximized && nodeRef.current) {
            nodeRef.current.style.setProperty('transform', 'none', 'important');
        } else if (!win.isMaximized && nodeRef.current) {
            // allow react/draggable to reclaim control. 
            nodeRef.current.style.transform = '';
        }
    }, [win.isMaximized]);

    // Style Classification
    const isLegacyStyle = false; // Forced universality

    // Optimized Logic: TEMPORARILY DISABLED TO INTERROGATE RENDERING ISSUE
    const shouldUseGlass = currentWindowStyle === 'glass' && !isLegacyStyle; // && isActive;

    const getTitleBarClass = () => {
        const base = "window-title-bar h-10 w-full flex items-center px-4 space-x-2 cursor-default border-b select-none";

        return `${base} bg-transparent border-b border-black/20`;
    };

    const getTitleTextClass = () => {
        const base = "flex-1 text-center text-sm font-semibold pointer-events-none select-none";
        if (isLegacyStyle) return `${base} text-gray-700 dark:text-gray-200`;
        return `${base} text-slate-200`; // Premium & Self Managed
    };

    const getContentClass = () => {
        const base = "flex-1 relative overflow-hidden flex flex-col";
        if (isLegacyStyle) return `${base} bg-white/50`;
        if (currentWindowStyle === 'transparent') {
            return `${base} bg-slate-900/90`;
        }
        return `${base} bg-transparent`;
    };

    const renderWindowContent = () => (
        <>
            {/* Title Bar */}
            <div className={getTitleBarClass()}>
                <div className="flex space-x-2 group">
                    <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex justify-center items-center text-xs text-black/50">x</button>
                    <button onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex justify-center items-center text-xs text-black/50">-</button>
                    <button onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex justify-center items-center text-xs text-black/50">+</button>
                </div>
                <div className={getTitleTextClass()}>
                    {win.title}
                </div>
                <div className="w-16"></div> {/* Spacer for symmetry */}
            </div>

            {/* Content */}
            <div className={getContentClass()}>
                {children}
            </div>

            {/* Resize Handle */}
            {!win.isMaximized && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-50"
                    onMouseDown={startResize}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
                        <path d="M7 9L9 7M4 9L9 4M1 9L9 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                </div>
            )}
        </>
    );

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-title-bar"
            defaultPosition={{ x: win.position.x, y: win.position.y }}
            onMouseDown={() => focusWindow(win.id)}
            onStop={(e, data) => moveWindow(win.id, { x: data.x, y: data.y })}
            disabled={isResizing || win.isMaximized}
            bounds="parent"
        >
            {/* Window Container (Native macOS Dark Mode Style) */}
            <div
                ref={nodeRef}
                className={`flex flex-col rounded-xl overflow-hidden shadow-2xl transition-all duration-75 relative pointer-events-auto ${win.isMaximized ? 'w-full !rounded-none h-full' : ''}`}
                style={{
                    width: win.isMaximized ? '100%' : win.size.width,
                    height: win.isMaximized ? '100%' : win.size.height,
                    zIndex: win.zIndex,
                    position: 'absolute',
                    // Apply native-like glassmorphism
                    background: 'rgba(30, 30, 30, 0.70)', // MacOS Dark Base
                    backdropFilter: 'blur(25px) saturate(180%)', // Heavy blur
                    WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 50px rgba(0, 0, 0, 0.55)', // Inner ring + Deep shadow
                    ...(win.isMaximized ? { top: '2rem', left: 0, height: 'calc(100% - 6rem)', borderRadius: 0 } : {})
                }}
                onMouseDown={() => focusWindow(win.id)}
            >
                {renderWindowContent()}
            </div>
        </Draggable>
    );
};

export default WindowFrame;

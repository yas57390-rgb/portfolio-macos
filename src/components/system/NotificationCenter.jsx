import React, { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { FaTimes, FaBell } from 'react-icons/fa';
import { format } from 'date-fns';

import WeatherWidget from './WeatherWidget';

const NotificationCenter = () => {
    const { history, removeNotification, clearHistory } = useNotification();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const toggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-notification-center', toggle);
        return () => window.removeEventListener('toggle-notification-center', toggle);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className="absolute top-8 right-0 bottom-0 w-80 sm:w-96 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-l border-white/20 transform transition-transform duration-300 animate-slide-in-right flex flex-col pointer-events-auto">
                {/* Header */}
                <div className="h-12 border-b border-gray-400/20 px-4 flex items-center justify-between text-gray-800 dark:text-gray-100 shrink-0">
                    <span className="font-semibold text-lg">Notifications</span>
                    {history.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Widget */}
                    <WeatherWidget />

                    {history.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                            <FaBell className="text-4xl mb-2" />
                            <p className="text-sm">No new notifications</p>
                        </div>
                    ) : (
                        history.map((notif, index) => (
                            <div
                                key={notif.id || index}
                                className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-3 shadow-sm border border-black/5 dark:border-white/5 relative group"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 text-xl">{notif.icon || '🔔'}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate">{notif.title}</h4>
                                            <span className="text-[10px] text-gray-500 max-w-[80px] truncate ml-2">
                                                {notif.timestamp ? format(new Date(notif.timestamp), 'HH:mm') : 'Just now'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 break-words leading-relaxed">{notif.message}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeNotification(notif.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <FaTimes size={10} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;

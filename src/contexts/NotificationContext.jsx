import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    // History Persistence
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('macos-notifications');
        return saved ? JSON.parse(saved) : [];
    });

    // Save history
    React.useEffect(() => {
        localStorage.setItem('macos-notifications', JSON.stringify(history));
    }, [history]);

    const addNotification = useCallback((notification) => {
        const id = uuidv4();
        const newNotif = { ...notification, id, timestamp: new Date() }; // Date object might lose info in JSON, handled below

        // Add to active toasts
        setNotifications(prev => [...prev, newNotif]);

        // Add to history (store simplified object if needed?)
        // For now, full object. Note: JSON.stringify handles Dates as ISO strings.
        setHistory(prev => [newNotif, ...prev]);

        // Auto dismiss toast after 5s
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    }, []);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            history,
            addNotification,
            removeNotification,
            clearHistory
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { FaTimes } from 'react-icons/fa';

const ToastContainer = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="absolute top-10 right-4 flex flex-col space-y-3 z-[100] w-80 pointer-events-none">
            {notifications.map(notif => (
                <div
                    key={notif.id}
                    className="pointer-events-auto bg-white/80 backdrop-blur-md border border-white/40 shadow-xl rounded-xl p-3 flex items-start space-x-3 animate-slide-in-right hover:bg-white/90 transition-colors"
                >
                    <div className="text-2xl">{notif.icon || '🔔'}</div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-800">{notif.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                    </div>
                    <button
                        onClick={() => removeNotification(notif.id)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes size={12} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;

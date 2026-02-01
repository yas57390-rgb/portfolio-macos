import React from 'react';

const IOSDock = ({ apps, onAppOpen }) => {
    return (
        <div className="absolute bottom-4 left-3 right-3 z-40">
            {/* Dock Container with glass effect */}
            <div
                className="rounded-[28px] px-3 py-2.5 flex justify-around items-center"
                style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    boxShadow: '0 0 0 0.5px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                {apps.map((app) => {
                    const IconComponent = app.icon;
                    return (
                        <button
                            key={app.id}
                            onClick={() => onAppOpen(app)}
                            className="transform transition-transform active:scale-90"
                        >
                            <div
                                className="w-[52px] h-[52px] rounded-[13px] flex items-center justify-center shadow-lg"
                                style={{
                                    backgroundColor: app.color,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
                                }}
                            >
                                <IconComponent className="text-white" size={24} />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default IOSDock;

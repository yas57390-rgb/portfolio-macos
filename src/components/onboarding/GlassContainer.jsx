import React from 'react';

const GlassContainer = ({ children, className = '' }) => {
    return (
        <div
            className={`
                relative overflow-hidden
                ${className}
            `}
            style={{
                background: 'rgba(40, 40, 40, 0.40)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                borderRadius: '24px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif'
            }}
        >
            {children}
        </div>
    );
};

export default GlassContainer;

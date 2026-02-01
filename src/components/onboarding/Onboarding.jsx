import React, { useEffect } from 'react';
import { IntroSlide } from './slides/AllSlides';

/**
 * Simplified Onboarding - Lock Screen Only
 * After entering, closes and triggers WelcomeApp window to open
 */
const Onboarding = ({ onComplete }) => {

    const handleEnter = () => {
        // Mark lock screen as passed, but NOT onboarding complete
        // The WelcomeApp will handle the full onboarding
        localStorage.setItem('lockScreenPassed', 'true');
        onComplete();
    };

    // Keyboard support for Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleEnter();
            }
            if (e.key === 'Escape') {
                handleEnter();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center font-sans"
            style={{
                background: 'transparent',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)'
            }}
        >
            {/* Full screen lock screen */}
            <div className="w-full h-full">
                <IntroSlide onEnter={handleEnter} />
            </div>
        </div>
    );
};

export default Onboarding;

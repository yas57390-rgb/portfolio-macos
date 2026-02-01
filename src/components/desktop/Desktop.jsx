import React from 'react';
import { useOS } from '../../contexts/OSContext';
import { useNotification } from '../../contexts/NotificationContext';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowManager from '../system/WindowManager';
import DesktopIcons from './DesktopIcons';
import ToastContainer from '../system/ToastContainer';
import Spotlight from '../system/Spotlight';
import NotificationCenter from '../system/NotificationCenter';
import ControlCenter from '../system/ControlCenter';
import VoiceAssistant from '../system/VoiceAssistant';
import ColorBends from '../ui/ColorBends';
import Squares from '../ui/Squares';
import Orb from '../ui/Orb';
import DotGrid from '../ui/DotGrid';
import LiquidEther from '../ui/LiquidEther';
import DesktopWidgets from '../widgets/DesktopWidgets';

const Desktop = ({ isOnboarding, onboardingStep, onStepChange }) => {
    const { wallpaper, theme } = useOS();
    const { addNotification } = useNotification();
    const [isSiriOpen, setIsSiriOpen] = React.useState(false);

    // Welcome Notification on Mount
    React.useEffect(() => {
        const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome && !isOnboarding) {
            addNotification({
                title: 'Welcome to MacOS',
                message: 'Enjoy your stay in this web-based operating system!',
                icon: '👋'
            });
            sessionStorage.setItem('hasSeenWelcome', 'true');
        }

        // Global Shortcut for Voice Assistant (Alt + Space)
        const handleKeyDown = (e) => {
            if (e.altKey && e.code === 'Space') {
                e.preventDefault();
                setIsSiriOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addNotification, isOnboarding]);

    // Pass toggle function to MenuBar
    const toggleSiri = () => setIsSiriOpen(!isSiriOpen);

    return (
        <div
            className="relative w-full h-screen overflow-hidden flex flex-col items-center transition-all duration-500 ease-in-out"
            style={{ backgroundColor: '#000' }}
        >
            {/* Wallpapers */}
            {wallpaper === 'color-bends' && (
                <div className="absolute inset-0 z-0">
                    <ColorBends
                        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                        scale={1} // Reset to safe default
                        frequency={1} // Reset to safe default
                        warpStrength={1} // Reset to safe default
                        transparent={false}
                    />
                </div>
            )}

            {(wallpaper === 'squares' || wallpaper === 'default') && (
                <div className="absolute inset-0 z-0">
                    <Squares
                        speed={0.5}
                        squareSize={40}
                        direction='diagonal'
                        borderColor='#333' // Subtle border for dark theme
                        hoverFillColor='#222'
                    />
                </div>
            )}

            {wallpaper === 'orb' && (
                <div className="absolute inset-0 z-0">
                    <Orb
                        hue={0}
                        hoverIntensity={0.5}
                        rotateOnHover={true}
                        forceHoverState={false}
                    />
                </div>
            )}

            {wallpaper === 'dot-grid' && (
                <div className="absolute inset-0 z-0 bg-black">
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#202022"
                        activeColor="#5227FF"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        returnDuration={1.5}
                    />
                </div>
            )}

            {wallpaper === 'liquid-ether' && (
                <div className="absolute inset-0 z-0 bg-black">
                    <LiquidEther />
                </div>
            )}

            {/* Dark Mode Overlay - Hide for animated wallpapers to preserve vibrancy */}
            {theme === 'dark' && !['color-bends', 'squares', 'orb', 'dot-grid', 'default'].includes(wallpaper) && (
                <div className="absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-500" />
            )}

            {/* Top Bar - System Menu Bar with Integrated Onboarding Links */}
            <div className="w-full z-[150]">
                <MenuBar toggleSiri={toggleSiri} currentStep={onboardingStep} onStepChange={onStepChange} />
            </div>

            {/* Voice Assistant Overlay */}
            <VoiceAssistant isOpen={isSiriOpen} onClose={() => setIsSiriOpen(false)} />

            {/* Spotlight Search */}
            <Spotlight />

            {/* Notification Center */}
            <NotificationCenter />

            {/* Control Center */}
            <ControlCenter />

            {/* Notifications */}
            <ToastContainer />

            {/* Main Workspace (Icons + Windows) */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
                {/* Desktop Icons Layer - Z-10 */}
                <div className="absolute inset-0 z-10">
                    <DesktopIcons />
                </div>

                {/* Desktop Widgets Layer - Z-15 (Above Icons for clickability) */}
                <div className="pointer-events-auto relative z-[15]">
                    <DesktopWidgets />
                </div>

                {/* Window Layer - Z-20 - MUST BE ABOVE ICONS */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* WindowManager handles pointer-events for windows internally, typically */}
                    {/* Actually, WindowManager renders Draggables. If we put pointer-events-none here, we block interaction? */}
                    {/* No, if the container is pointer-events-none, children with pointer-events-auto work. */}
                    {/* BUT, React-Draggable needs to catch events. Safe bet: pointer-events-auto but ensure it doesn't block icons if no window there? */}
                    {/* The windows are absolute. So we can just let this container be z-20. */}
                    <WindowManager />
                </div>
            </div>

            {/* Bottom Dock */}
            <Dock />
        </div>
    );
};

export default Desktop;

import React, { useState } from 'react';
import {
    FaUser, FaAddressBook, FaRss,
    FaMusic, FaCalculator, FaStickyNote, FaComment,
    FaGithub, FaLinkedin, FaFolderOpen, FaFilePdf, FaMapMarkedAlt,
    FaImages, FaCube, FaAppStoreIos, FaGamepad
} from 'react-icons/fa';
import IOSStatusBar from './IOSStatusBar';
import IOSHomeScreen from './IOSHomeScreen';
import IOSDock from './IOSDock';

// iOS App Components
import AboutApp from './apps/AboutApp';
import SkillsApp from './apps/SkillsApp';
import ProjectsApp from './apps/ProjectsApp';
import ContactApp from './apps/ContactApp';
import CVApp from './apps/CVApp';
import CalculatorApp from './apps/CalculatorApp';
import MapsApp from './apps/MapsApp';
import MusicApp from './apps/MusicApp';
import MessagesApp from './apps/MessagesApp';
import NotesApp from './apps/NotesApp';
import PhotosApp from './apps/PhotosApp';
import RSSApp from './apps/RSSApp';
import Viewer3DApp from './apps/Viewer3DApp';
import DoodleJumpApp from './apps/DoodleJumpApp';

const IOSApp = () => {
    const [currentApp, setCurrentApp] = useState(null);
    const [isAppOpening, setIsAppOpening] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    // Apps with real icons matching desktop version
    const apps = [
        // Page 1 - Main apps
        { id: 'about', name: 'À propos', icon: FaUser, color: '#007AFF', component: AboutApp },
        { id: 'it-toolkit', name: 'Compétences', icon: FaAppStoreIos, color: '#000000', component: SkillsApp },
        { id: 'finder', name: 'Projets', icon: FaFolderOpen, color: '#000000', component: ProjectsApp },
        { id: 'contact', name: 'Contact', icon: FaAddressBook, color: '#000000', component: ContactApp },
        { id: 'cv', name: 'CV', icon: FaFilePdf, color: '#000000', component: CVApp },
        { id: 'calculator', name: 'Calculatrice', icon: FaCalculator, color: '#000000', component: CalculatorApp },
        { id: 'maps', name: 'Maps', icon: FaMapMarkedAlt, color: '#000000', component: MapsApp },
        { id: 'music', name: 'Musique', icon: FaMusic, color: '#FC3C44', component: MusicApp },
        // Page 2 - More apps & links
        { id: 'gallery', name: 'Photos', icon: FaImages, color: '#000000', component: PhotosApp },
        { id: 'notes', name: 'Notes', icon: FaStickyNote, color: '#FFCC00', component: NotesApp },
        { id: 'rss', name: 'Flux RSS', icon: FaRss, color: '#FF9500', component: RSSApp },
        { id: '3d', name: '3D Viewer', icon: FaCube, color: '#5856D6', component: Viewer3DApp },
        { id: 'doodle', name: 'Doodle Jump', icon: FaGamepad, color: '#4CAF50', component: DoodleJumpApp },
        { id: 'github', name: 'GitHub', icon: FaGithub, color: '#000000', external: 'https://github.com/Yassinedinar' },
        { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2', external: 'https://linkedin.com/in/yassine-dinar' },
    ];

    // Dock apps - Main 4 with Messages
    const dockApps = [
        { id: 'about', name: 'À propos', icon: FaUser, color: '#007AFF', component: AboutApp },
        { id: 'messages', name: 'Messages', icon: FaComment, color: '#34C759', component: MessagesApp },
        { id: 'finder', name: 'Projets', icon: FaFolderOpen, color: '#000000', component: ProjectsApp },
        { id: 'contact', name: 'Contact', icon: FaAddressBook, color: '#000000', component: ContactApp },
    ];

    const openApp = (app) => {
        if (app.external) {
            window.open(app.external, '_blank');
            return;
        }
        if (!app.component) {
            return;
        }
        setIsAppOpening(true);
        setTimeout(() => {
            setCurrentApp(app);
            setIsAppOpening(false);
        }, 200);
    };

    const closeApp = () => {
        setCurrentApp(null);
    };

    return (
        <div className="w-screen h-screen bg-black overflow-hidden select-none touch-manipulation">
            {/* iOS Wallpaper - Dark gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 100%)',
                }}
            />

            {/* Subtle noise texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
            />

            {/* Status Bar */}
            <IOSStatusBar />

            {/* Current App or Home Screen */}
            {currentApp ? (
                <div
                    className="absolute inset-0 pt-12 z-40"
                    style={{ animation: 'slideUp 0.25s ease-out' }}
                >
                    <currentApp.component
                        onClose={closeApp}
                        appInfo={currentApp}
                        onOpenMaps={currentApp.id === 'contact' ? () => {
                            // Close contact and open Maps centered on Audun-le-Tiche
                            const mapsApp = apps.find(a => a.id === 'maps');
                            if (mapsApp) {
                                setCurrentApp({
                                    ...mapsApp,
                                    initialLocation: { lat: 49.4667, lng: 5.95, name: 'Domicile' }
                                });
                            }
                        } : undefined}
                    />
                </div>
            ) : (
                <>
                    <IOSHomeScreen
                        apps={apps}
                        onAppOpen={openApp}
                        isAppOpening={isAppOpening}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                    <IOSDock apps={dockApps} onAppOpen={openApp} />
                </>
            )}

            {/* App Opening Animation Overlay */}
            {isAppOpening && (
                <div className="absolute inset-0 bg-black/30 z-50 backdrop-blur-sm" />
            )}

            {/* CSS Animations */}
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default IOSApp;

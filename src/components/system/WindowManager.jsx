import React from 'react';
import { useOS } from '../../contexts/OSContext';
import WindowFrame from './WindowFrame';

// Apps
import Finder from '../apps/Finder';
import Terminal from '../apps/Terminal';
import Contact from '../apps/Contact';
import Settings from '../apps/Settings';
import Trash from '../apps/Trash';
import PDFViewer from '../apps/PDFViewer';
import About from '../apps/About';
import Music from '../apps/Music';
import RSSReader from '../apps/RSSReader';

import VSCode from '../apps/VSCode';
import GameCenter from '../apps/GameCenter';

import VideoPlayer from '../apps/VideoPlayer';
import Calculator from '../apps/Calculator';
import Notes from '../apps/Notes';
import ITToolkit from '../apps/ITToolkit';
import ImageViewer from '../apps/ImageViewer';
import ModelViewerApp from '../apps/ModelViewerApp';
import Maps from '../apps/Maps';
import Gallery from '../apps/Gallery';
import WelcomeApp from '../apps/WelcomeApp';
import LogoEffectApp from '../apps/LogoEffectApp';

const WindowManager = () => {
    const { windows, activeWindowId, closeWindow } = useOS();

    const renderApp = (win) => {
        const handleClose = () => closeWindow(win.id);

        switch (win.appId) {
            case 'finder': return <Finder />;
            case 'terminal': return <Terminal windowState={win.state} />;
            case 'contact': return <Contact />;
            case 'settings': return <Settings />;
            case 'trash': return <Trash />;
            case 'pdf-viewer': return <PDFViewer file={win.file} />;
            case 'about': return <About />;
            case 'music': return <Music />;
            case 'rss': return <RSSReader />;
            case 'vscode': return <VSCode file={win.file} />;
            case 'game-center': return <GameCenter windowState={win.state} />;
            case 'video-player': return <VideoPlayer />;
            case 'calculator': return <Calculator />;
            case 'notes': return <Notes />;
            case 'it-toolkit': return <ITToolkit />;
            case 'image-viewer': return <ImageViewer file={win.file} />;
            case 'model-viewer': return <ModelViewerApp file={win.file} windowId={win.id} windowState={win.state} />;
            case 'maps': return <Maps />;
            case 'gallery': return <Gallery />;
            case 'welcome': return <WelcomeApp onClose={handleClose} initialSlide={win.initialSlide || 0} />;
            case 'logo-effect': return <LogoEffectApp />;

            default:
                if (win.content) {
                    return win.content;
                }
                return <div className="p-10 text-center">App not found: {win.appId}</div>;
        }
    };

    return (
        <>

            {windows.map((win, i) => (
                <WindowFrame
                    key={win.id}
                    window={win}
                >
                    {renderApp(win)}
                </WindowFrame>
            ))}
        </>
    );
};

export default WindowManager;


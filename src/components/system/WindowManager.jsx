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


const WindowManager = () => {
    const { windows, activeWindowId } = useOS();

    const renderApp = (window) => {
        switch (window.appId) {
            case 'finder': return <Finder />;
            case 'terminal': return <Terminal windowState={window.state} />;
            case 'contact': return <Contact />;
            case 'settings': return <Settings />;
            case 'trash': return <Trash />;
            case 'pdf-viewer': return <PDFViewer file={window.file} />;
            case 'about': return <About />;
            case 'music': return <Music />;
            case 'rss': return <RSSReader />;
            case 'vscode': return <VSCode file={window.file} />;
            case 'game-center': return <GameCenter windowState={window.state} />;
            case 'video-player': return <VideoPlayer />;
            case 'calculator': return <Calculator />;
            case 'notes': return <Notes />;
            case 'it-toolkit': return <ITToolkit />;
            case 'image-viewer': return <ImageViewer file={window.file} />;
            case 'model-viewer': return <ModelViewerApp file={window.file} windowId={window.id} windowState={window.state} />;
            case 'maps': return <Maps />;
            case 'gallery': return <Gallery />;

            default:
                if (window.content) {
                    return window.content;
                }
                return <div className="p-10 text-center">App not found: {window.appId}</div>;
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

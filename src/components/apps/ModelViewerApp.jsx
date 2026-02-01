import React, { useState } from 'react';
import ModelViewer from './ModelViewer';

import { useFileSystem } from '../../contexts/FileSystemContext';
import { useOS } from '../../contexts/OSContext';

const MODELS = [
    { name: 'Steve Jobs Sketch', url: '/assets/steve_sketch.glb' },
    { name: 'Metz Cathedral', url: '/assets/metz_cathedral.glb' },
    {
        name: 'Server V2 Console',
        url: '/assets/server_v2_console.glb',
        config: {
            defaultRotationX: -90, // Rotates Y-axis (Yaw) to face front
        }
    },
];

const ModelViewerApp = ({ file, windowId, windowState }) => {
    // Default model is first in list, or file passed in, OR valid state from previous render
    const initialUrl = windowState?.url || file?.url || MODELS[0].url;

    // We don't necessarily need local state if we sync fully, but local state + effect is safer for smooth UI
    const [url, setLocalUrl] = useState(initialUrl);

    React.useEffect(() => {
        if (windowState?.url) {
            setLocalUrl(windowState.url);
        }
    }, [windowState?.url]);

    const { addFile } = useFileSystem();
    const { serverStatus, updateWindowState } = useOS();

    // Sync changes to global window state
    const handleUrlChange = (newUrl) => {
        setLocalUrl(newUrl);
        if (windowId && updateWindowState) {
            updateWindowState(windowId, { url: newUrl });
        }
    };

    const handleScreenshotSaved = (dataUrl) => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        addFile({
            id: `screenshot-${Date.now()}`,
            name: `Capture_3D_${Date.now()}.png`,
            type: 'PNG Image',
            size: '2.5 MB',
            date: formattedDate,
            location: 'Downloads',
            parentId: 'Downloads',
            url: dataUrl,
            tags: ['purple'],
            content: ''
        });
    };

    const activeModel = MODELS.find(m => m.url === url);
    const modelConfig = activeModel?.config || {};

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-white select-none">
            {/* Toolbar */}
            <div className="h-10 bg-[#2c2c2c] flex items-center px-4 space-x-4 border-b border-white/5 shrink-0 z-20 relative">
                <span className="text-xs text-gray-400 font-medium hidden sm:block">3D Viewer</span>

                {/* Model Selector */}
                <select
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="bg-[#1e1e1e] text-white text-xs border border-white/20 rounded px-3 py-1 outline-none focus:border-blue-500 hover:bg-[#333] transition-colors cursor-pointer"
                >
                    {MODELS.map(m => (
                        <option key={m.url} value={m.url}>
                            {m.name}
                        </option>
                    ))}
                    {!MODELS.find(m => m.url === url) && (
                        <option value={url}>{file?.name || 'Custom Model'}</option>
                    )}
                </select>

                <div className="flex-1"></div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 relative overflow-hidden">
                <ModelViewer
                    url={url}
                    showScreenshotButton={true}
                    onScreenshotSaved={handleScreenshotSaved}
                    serverStatus={serverStatus}
                    {...modelConfig}
                    {...(windowState || {})} // Pass config like autoFrame, defaultZoom, etc.
                />
            </div>
        </div>
    );
};

export default ModelViewerApp;

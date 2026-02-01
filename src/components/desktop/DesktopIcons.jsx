import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { useOS } from '../../contexts/OSContext';
import { useFileSystem } from '../../contexts/FileSystemContext';
import AppIcon from '../ui/AppIcon';

const DraggableIcon = ({ file, icon, onDoubleClick, onStop }) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: file.x || 20, y: file.y || 20 }}
            bounds="parent"
            onStop={onStop}
        >
            <div
                ref={nodeRef}
                className="absolute w-24 flex flex-col items-center group cursor-pointer pointer-events-auto"
                onDoubleClick={onDoubleClick}
            >
                <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95 text-shadow-sm">
                    {icon}
                </div>
                <span className="mt-1 text-white text-xs font-medium px-2 py-0.5 rounded bg-black/0 group-hover:bg-blue-600/80 transition-colors shadow-sm text-center line-clamp-2 select-none">
                    {file.title || file.name}
                </span>
            </div>
        </Draggable>
    );
};

const DesktopIcons = () => {
    const { openWindow } = useOS();
    const { files, moveFileToTrash, moveFile, updateFilePosition } = useFileSystem();

    const shortcuts = [
        { id: 'it-toolkit', title: 'App Store', type: 'app', action: 'open-window', windowId: 'it-toolkit', x: 20, y: 20, defaultSize: { width: 950, height: 640 } },
        { id: 'model-viewer', title: '3D Viewer', type: 'app', action: 'open-window', windowId: 'model-viewer', x: 20, y: 240 },
        { id: 'maps', title: 'Maps', type: 'app', action: 'open-window', windowId: 'maps', x: 20, y: 130, defaultSize: { width: 800, height: 600 } },

        { id: 'github', title: 'GitHub', type: 'link', action: 'open-link', url: 'https://github.com/Yassinedinar', x: 20, y: 350 },
        { id: 'linkedin', title: 'LinkedIn', type: 'link', action: 'open-link', url: 'https://www.linkedin.com/in/yassine-dinar', x: 20, y: 440 },
    ];

    const desktopFiles = files
        .filter(f => f.parentId === 'Desktop' || f.location === 'Desktop') // Support both for compatibility
        .map((f, i) => ({
            ...f,
            x: f.position?.x || (120 + (Math.floor(i / 5) * 100)), // Offset to avoid overlapping static icons
            y: f.position?.y || (20 + ((i % 5) * 90)),
            action: 'open-file'
        }));

    const allIcons = [...desktopFiles, ...shortcuts];

    const getIconComp = (file) => {
        if (file.id === 'it-toolkit') return <AppIcon id="it-toolkit" size={56} />;
        if (file.id === 'model-viewer') return <AppIcon id="model-viewer" size={56} />;
        if (file.id === 'maps') return <AppIcon id="maps" size={56} />;

        if (file.id === 'github') return <AppIcon id="github" size={56} />;
        if (file.id === 'linkedin') return <AppIcon id="linkedin" size={56} />;

        if (file.type === 'folder') return <AppIcon id="folder" size={56} />;
        if (file.name.endsWith('pdf')) return <AppIcon id="pdf" size={56} />;
        if (file.name.endsWith('png') || file.name.endsWith('jpg')) return <AppIcon id="image" size={56} />;

        return <AppIcon id="unknown" size={56} />;
    };

    const handleDoubleClick = (icon) => {
        if (icon.action === 'open-window') {
            openWindow({ id: icon.windowId, title: icon.title, icon: icon.windowId, defaultSize: icon.defaultSize });
        } else if (icon.action === 'open-finder') {
            openWindow({ id: 'finder', title: 'Finder', icon: 'finder' });
        } else if (icon.action === 'open-link') {
            window.open(icon.url, '_blank');
        } else if (icon.type === 'folder') {
            openWindow({ id: 'finder', title: 'Finder', icon: 'finder' });
        } else if (icon.name && icon.name.endsWith('.pdf')) {
            openWindow({ id: 'pdf-viewer', title: icon.title || icon.name, file: icon });
        } else if (icon.name && (icon.name.endsWith('.png') || icon.name.endsWith('.jpg') || icon.name.endsWith('.jpeg'))) {
            openWindow({ id: 'image-viewer', title: icon.title || icon.name, file: icon, icon: 'image' });
        } else if (icon.name && (icon.name.endsWith('.txt') || icon.name.endsWith('.md') || icon.name.endsWith('.js') || icon.name.endsWith('.jsx') || icon.name.endsWith('.json'))) {
            openWindow({ id: 'vscode', title: icon.name, file: icon });
        } else {
            console.log("Open file", icon.name);
        }
    };

    const handleDragStop = (e, data, icon) => {
        if (icon.id) {
            // Update position
            // Only for files managed by FileSystem (not static shortcuts for now)
            if (!shortcuts.find(s => s.id === icon.id)) {
                updateFilePosition(icon.id, data.x, data.y);
            }
        }

        const trashEl = document.getElementById('dock-item-trash');
        if (trashEl) {
            const rect = trashEl.getBoundingClientRect();
            if (
                e.clientX >= rect.left - 20 &&
                e.clientX <= rect.right + 20 &&
                e.clientY >= rect.top - 50 &&
                e.clientY <= rect.bottom + 20
            ) {
                if (icon.id && !icon.action?.startsWith('open-link')) {
                    moveFileToTrash(icon.id);
                }
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const fileId = e.dataTransfer.getData("fileId");
        if (fileId) {
            // Calculated position relative to desktop container
            // We assume desktop matches window, or we use e.currentTarget.getBoundingClientRect()
            // e.currentTarget is the container div
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - 32; // Center offset roughly
            const y = e.clientY - rect.top - 32;

            moveFile(fileId, 'Desktop');
            updateFilePosition(fileId, x, y);
        }
    };

    return (
        <div
            className="absolute inset-0 z-10 p-4 pointer-events-none"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {allIcons.map(icon => (
                <DraggableIcon
                    key={icon.id}
                    file={icon}
                    icon={getIconComp(icon)}
                    onDoubleClick={() => handleDoubleClick(icon)}
                    onStop={(e, data) => handleDragStop(e, data, icon)}
                />
            ))}
        </div>
    );
};

export default DesktopIcons;

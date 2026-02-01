import React from 'react';
import {
    FaSmile, FaTerminal, FaCode, FaAddressBook, FaCog, FaRss,
    FaMusic, FaYoutube, FaGamepad, FaCalculator, FaStickyNote,
    FaTrash, FaGithub, FaLinkedin, FaToolbox, FaFolderOpen,
    FaFilePdf, FaFileImage, FaFile, FaMapSigns, FaAppStoreIos, FaCube, FaMapMarkedAlt, FaImages
} from 'react-icons/fa';

const AppIcon = ({ id, size = 48, className = '', title }) => {
    // Monochrome / Minimalist Style
    const getIconStyle = () => {
        // Base style for most apps: Dark Grey Background, White Icon
        const baseStyle = {
            bg: 'bg-[#2b2b2b]', // Soft black/dark grey
            iconColor: 'text-white'
        };

        switch (id) {
            case 'finder':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaFolderOpen className="text-white" size={size * 0.6} />,
                    iconBefore: null
                };
            case 'terminal':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaTerminal className="text-white" size={size * 0.6} />,
                    text: '>_'
                };
            case 'github':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaGithub className="text-white" size={size * 0.7} />
                };
            case 'linkedin':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaLinkedin className="text-white" size={size * 0.7} />
                };
            // Documents - Keep light but grayscale
            case 'pdf':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaFilePdf className="text-white/90" size={size * 0.6} />,
                    isDoc: true
                };
            case 'image':
            case 'png':
            case 'jpg':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaFileImage className="text-white/90" size={size * 0.6} />,
                    isDoc: true
                };
            case 'folder':
                return {
                    bg: 'bg-transparent',
                    icon: <FaFolderOpen className="text-[#404040] drop-shadow-sm" size={size} />,
                    noContainer: true
                };

            case 'it-toolkit':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaAppStoreIos className="text-[#e6e6e6]" size={size * 0.7} />
                };

            case 'model-viewer':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaCube className="text-[#e6e6e6]" size={size * 0.7} />
                };

            case 'maps':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaMapMarkedAlt className="text-[#e6e6e6]" size={size * 0.7} />
                };

            case 'gallery':
                return {
                    bg: 'bg-[#000000]', // Premium Black
                    icon: <FaImages className="text-[#e6e6e6]" size={size * 0.7} />
                };

            // All other apps -> Unified Dark Theme
            case 'vscode':
            case 'contact':
            case 'settings':
            case 'rss':
            case 'music':
            case 'video-player':
            case 'game-center':
            case 'calculator':
            case 'notes':
            case 'trash':
            default:
                // Map specific icons but use unified background
                let IconComp = FaFile;
                if (id === 'vscode') IconComp = FaCode;
                if (id === 'contact') IconComp = FaAddressBook;
                if (id === 'settings') IconComp = FaCog;
                if (id === 'rss') IconComp = FaRss;
                if (id === 'music') IconComp = FaMusic;
                if (id === 'video-player') IconComp = FaYoutube;
                if (id === 'game-center') IconComp = FaGamepad;
                if (id === 'calculator') IconComp = FaCalculator;
                if (id === 'notes') IconComp = FaStickyNote;
                if (id === 'trash') IconComp = FaTrash;
                if (id === 'it-toolkit') IconComp = FaToolbox;
                if (id === 'journey') IconComp = FaMapSigns;
                if (id === 'github') IconComp = FaGithub;
                if (id === 'linkedin') IconComp = FaLinkedin;

                return {
                    bg: 'bg-[#000000]', // Premium Black for all
                    icon: <IconComp className="text-[#e6e6e6]" size={size * 0.6} /> // Off-white icon
                };
        }
    };

    const style = getIconStyle();

    if (style.noContainer) {
        return (
            <div className={`flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${className}`} style={{ width: size, height: size }}>
                {style.icon}
            </div>
        );
    }

    if (style.isDoc) {
        // Document Style (Vertical Rectangle)
        return (
            <div
                className={`relative flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 active:scale-95 ${style.bg} ${className}`}
                style={{ width: size * 0.8, height: size, border: `1px solid ${style.borderColor || 'rgba(0,0,0,0.1)'}` }}
            >
                {style.icon}
            </div>
        );
    }

    // Standard App Icon (Squircle) - Minimalist
    return (
        <div
            className={`relative flex items-center justify-center rounded-[22%] shadow-md transition-transform hover:scale-105 active:scale-95 overflow-hidden ${style.bg} ${className}`}
            style={{ width: size, height: size }}
        >
            {style.iconBefore}
            {style.text ? <span className="text-white font-mono font-bold text-xs">{style.text}</span> : style.icon}
        </div>
    );
};

export default AppIcon;

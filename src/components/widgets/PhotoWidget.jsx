import React, { useState, useEffect } from 'react';
import { useFileSystem } from '../../contexts/FileSystemContext';
import { useOS } from '../../contexts/OSContext';

// Hardcoded fallback to the user's specific photo if available
const FALLBACK_IMAGE = '/assets/cv-photo.png';

const PhotoWidget = () => {
    const { files } = useFileSystem();
    const { openWindow } = useOS();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    // Filter images from file system
    const images = files.filter(f =>
        f.type === 'PNG Image' ||
        f.type === 'JPEG Image' ||
        f.name.endsWith('.png') ||
        f.name.endsWith('.jpg') ||
        f.name.endsWith('.jpeg') ||
        f.name.endsWith('.webp')
    );

    // If we have images, use them. If not, try to use the fallback as a single item list.
    // However, the user specifically wants their photo to be priority.
    // Ideally, the user's photo IS in the file system (we saw it in FileSystemContext as id:4).
    // So it should automatically be included in 'images'.

    const displayList = images.length > 0 ? images : [{ url: FALLBACK_IMAGE, name: 'Default', content: '' }];

    // Cycle images
    useEffect(() => {
        // Only cycle if we have more than one image
        if (displayList.length <= 1) return;

        const interval = setInterval(() => {
            setFade(false); // Start fade out
            setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % displayList.length);
                setFade(true); // Fade in
            }, 500); // Matches transition duration
        }, 5000); // 5 Seconds cycle

        return () => clearInterval(interval);
    }, [displayList.length]);

    const handleClick = () => {
        console.log("PhotoWidget Clicked!");
        openWindow({ id: 'gallery', title: 'Photos', icon: 'gallery', defaultSize: { width: 900, height: 600 } });
    };

    const currentImage = displayList[currentImageIndex];
    // Resolve source: url (for assets) OR content (for base64/blob) OR fallback
    const src = currentImage.url || currentImage.content || FALLBACK_IMAGE;

    return (
        <div
            onClick={handleClick}
            className="w-full h-40 bg-gray-900 rounded-[22px] overflow-hidden shadow-2xl relative cursor-pointer border border-white/10 group active:scale-95 transition-transform duration-200"
        >
            <img
                src={src}
                alt={currentImage.name || 'Photo'}
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-80'} group-hover:scale-105 transition-transform duration-700`}
            />

            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
                <span className="text-[10px] font-bold text-white/90 tracking-wider mb-0.5 uppercase">Pour Vous</span>
                <span className="text-sm font-semibold text-white drop-shadow-md">Souvenirs</span>
            </div>

            {/* Photos Icon Badge */}
            <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none">
                {/* CSS Only Flower Icon to mimic Apple Photos */}
                <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                    <div className="relative w-4 h-4">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full opacity-80 blur-[1px]"></div>
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoWidget;

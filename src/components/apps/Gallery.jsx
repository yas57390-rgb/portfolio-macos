import React, { useState } from 'react';
import { useFileSystem } from '../../contexts/FileSystemContext';
import { useOS } from '../../contexts/OSContext';
import { FaImage } from 'react-icons/fa';

const Gallery = () => {
    const { files } = useFileSystem();
    const { openWindow } = useOS();

    // Filter for images
    const images = files.filter(f =>
        f.type === 'PNG Image' ||
        f.type === 'JPEG Image' ||
        f.name.endsWith('.png') ||
        f.name.endsWith('.jpg') ||
        f.name.endsWith('.jpeg') ||
        f.name.endsWith('.webp')
    );

    const handleImageClick = (file) => {
        // Open detailed view using ImageViewer if available, or just handle selection here.
        // Since we have an ImageViewer app, let's use it for viewing single images!
        openWindow({
            id: 'image-viewer',
            title: file.name,
            file: file,
            icon: 'image'
        });
    };

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white font-sans">
            {/* Sidebar */}
            <div className="w-48 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-1 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-xl">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Bibliothèque</h3>
                <button className="flex items-center gap-2 px-2 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium">
                    <FaImage /> Toutes les photos
                </button>
            </div>

            {/* Main Grid */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Photos</h2>
                    <span className="text-sm text-gray-500">{images.length} Photos</span>
                </div>

                {images.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                        <FaImage size={48} className="mb-4 opacity-20" />
                        <p>Aucune photo trouvée</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map(img => (
                            <div
                                key={img.id}
                                className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 dark:border-gray-700 shadow-sm"
                                onClick={() => handleImageClick(img)}
                            >
                                <img
                                    src={img.url || img.content}
                                    alt={img.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;

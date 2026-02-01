import React, { useState } from 'react';
import { FaChevronLeft, FaImage } from 'react-icons/fa';

const photos = [
    { id: 1, url: '/assets/cv-photo.png', title: 'Photo CV' },
    { id: 2, url: '/mewo_logo.png', title: 'Logo MEWO' },
];

const PhotosApp = ({ onClose }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    if (selectedPhoto) {
        return (
            <div className="h-full bg-black flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between z-10">
                    <button onClick={() => setSelectedPhoto(null)} className="text-white font-medium flex items-center">
                        <FaChevronLeft className="mr-1" size={14} />
                        Photos
                    </button>
                </div>

                {/* Full Image */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <img
                        src={selectedPhoto.url}
                        alt={selectedPhoto.title}
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                </div>

                {/* Caption */}
                <div className="p-4 text-center text-white/70 text-sm">
                    {selectedPhoto.title}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Header */}
            <div
                className="px-4 py-3 flex items-center border-b border-gray-200"
                style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
            >
                <button onClick={onClose} className="text-blue-500 font-medium flex items-center">
                    <FaChevronLeft className="mr-1" size={14} />
                    Retour
                </button>
                <h1 className="flex-1 text-center font-semibold text-gray-900 pr-12">
                    Photos
                </h1>
            </div>

            {/* Photo Grid */}
            <div className="flex-1 overflow-y-auto p-1">
                <div className="grid grid-cols-3 gap-0.5">
                    {photos.map((photo) => (
                        <button
                            key={photo.id}
                            onClick={() => setSelectedPhoto(photo)}
                            className="aspect-square bg-gray-100 overflow-hidden"
                        >
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                                }}
                            />
                        </button>
                    ))}
                    {/* Placeholder slots */}
                    {[...Array(6 - photos.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square bg-gray-100 flex items-center justify-center">
                            <FaImage className="text-gray-300 text-2xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Tab */}
            <div className="p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                {photos.length} photos
            </div>
        </div>
    );
};

export default PhotosApp;

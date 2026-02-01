import React, { useState } from 'react';

const ImageViewer = ({ file }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // If file is passed, use its url or content property (depending on data structure)
    // For local files/shortcuts, it might be stored in 'url' or 'src' or 'content'
    // Let's assume standard file object has 'url' or 'content'
    const imageSrc = file?.url || file?.content || file?.path;

    if (!file) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
                <p>Aucune image sélectionnée</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-900/90 backdrop-blur-3xl overflow-hidden">
            {/* Toolbar (Optional) */}
            <div className="h-10 bg-slate-900/40 border-b border-white/5 flex items-center px-4 space-x-4 backdrop-blur-md">
                <span className="text-sm text-slate-200 font-medium truncate">{file.name || 'Image'}</span>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-4 relative overflow-auto">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}
                {error ? (
                    <div className="text-red-400 flex flex-col items-center max-w-xs text-center">
                        <span className="text-4xl mb-2">⚠️</span>
                        <span>Impossible de charger l'image</span>
                        <span className="text-xs text-slate-500 mt-2 break-all">{imageSrc}</span>
                    </div>
                ) : (
                    <img
                        src={imageSrc}
                        alt={file.name}
                        className={`max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setLoading(false)}
                        onError={() => {
                            setLoading(false);
                            setError(true);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ImageViewer;

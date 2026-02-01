import React, { useState } from 'react';
import { FaPlay, FaSearch } from 'react-icons/fa';

const VideoPlayer = () => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('jfKfPfyJRdk'); // Default: Lofi Girl

    const extractVideoId = (inputUrl) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleLoad = (e) => {
        e.preventDefault();
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
            setUrl(''); // Clear input after load or keep it? Let's keep it clean
        } else {
            alert('Invalid YouTube URL');
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent text-white">
            {/* Toolbar */}
            <div className="h-12 bg-slate-900/40 backdrop-blur-md flex items-center px-4 space-x-2 border-b border-white/5">
                <form onSubmit={handleLoad} className="flex-1 flex space-x-2">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste YouTube URL here..."
                        className="flex-1 bg-black/20 text-sm px-3 py-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10 text-white placeholder-slate-500 transition-all hover:bg-black/30"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm active:scale-95 border border-blue-500/20"
                    >
                        Load
                    </button>
                </form>
            </div>

            {/* Video Area */}
            <div className="flex-1 bg-black/80 relative backdrop-blur-sm">
                {videoId ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <FaPlay className="text-4xl mb-4 opacity-30" />
                        <p>No video loaded</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;

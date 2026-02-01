import React, { useState } from 'react';
import { FaChevronLeft, FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart } from 'react-icons/fa';

const tracks = [
    { id: 1, title: 'Lo-Fi Beats', artist: 'Chill Hop', duration: '3:45', color: '#FF6B6B' },
    { id: 2, title: 'Synthwave Dreams', artist: 'Retro Wave', duration: '4:12', color: '#4ECDC4' },
    { id: 3, title: 'Jazz Café', artist: 'Smooth Jazz', duration: '5:30', color: '#45B7D1' },
    { id: 4, title: 'Ambient Focus', artist: 'Deep Work', duration: '8:00', color: '#96CEB4' },
    { id: 5, title: 'Electronic Chill', artist: 'EDM Lounge', duration: '4:45', color: '#DDA0DD' },
];

const MusicApp = ({ onClose }) => {
    const [currentTrack, setCurrentTrack] = useState(tracks[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [liked, setLiked] = useState(false);

    const playNext = () => {
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        setCurrentTrack(tracks[(currentIndex + 1) % tracks.length]);
    };

    const playPrev = () => {
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        setCurrentTrack(tracks[(currentIndex - 1 + tracks.length) % tracks.length]);
    };

    return (
        <div className="h-full bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 flex items-center">
                <button onClick={onClose} className="text-white/70 flex items-center">
                    <FaChevronLeft className="mr-1" />
                </button>
                <h1 className="flex-1 text-center font-medium text-white/90">
                    En lecture
                </h1>
                <div className="w-6" />
            </div>

            {/* Album Art */}
            <div className="flex-1 flex flex-col items-center justify-center px-8">
                <div
                    className="w-64 h-64 rounded-2xl shadow-2xl flex items-center justify-center mb-8"
                    style={{
                        backgroundColor: currentTrack.color,
                        boxShadow: `0 20px 60px ${currentTrack.color}50`
                    }}
                >
                    <span className="text-8xl">🎵</span>
                </div>

                {/* Track Info */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{currentTrack.title}</h2>
                    <p className="text-white/60 mt-1">{currentTrack.artist}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full mb-6">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-300"
                            style={{ width: isPlaying ? '45%' : '0%' }}
                        />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-white/40">
                        <span>{isPlaying ? '1:42' : '0:00'}</span>
                        <span>{currentTrack.duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-8">
                    <button onClick={playPrev} className="text-white/70 active:scale-90 transition-transform">
                        <FaStepBackward size={24} />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform"
                    >
                        {isPlaying ? (
                            <FaPause className="text-gray-900" size={24} />
                        ) : (
                            <FaPlay className="text-gray-900 ml-1" size={24} />
                        )}
                    </button>
                    <button onClick={playNext} className="text-white/70 active:scale-90 transition-transform">
                        <FaStepForward size={24} />
                    </button>
                </div>

                {/* Like Button */}
                <button
                    onClick={() => setLiked(!liked)}
                    className="mt-6"
                >
                    <FaHeart
                        size={24}
                        className={`transition-colors ${liked ? 'text-red-500' : 'text-white/30'}`}
                    />
                </button>
            </div>

            {/* Track List */}
            <div className="bg-gray-800/50 rounded-t-3xl p-4 pb-8">
                <p className="text-white/40 text-sm mb-3">À suivre</p>
                <div className="space-y-2">
                    {tracks.filter(t => t.id !== currentTrack.id).slice(0, 3).map((track) => (
                        <button
                            key={track.id}
                            onClick={() => setCurrentTrack(track)}
                            className="w-full flex items-center p-2 rounded-lg active:bg-white/5"
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                style={{ backgroundColor: track.color }}
                            >
                                🎵
                            </div>
                            <div className="ml-3 text-left flex-1">
                                <p className="text-white text-sm font-medium">{track.title}</p>
                                <p className="text-white/40 text-xs">{track.artist}</p>
                            </div>
                            <span className="text-white/30 text-xs">{track.duration}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicApp;

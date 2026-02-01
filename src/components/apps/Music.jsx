import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';
import { useMusic } from '../../contexts/MusicContext';

const Music = () => {
    const { isPlaying, togglePlay, currentStation, playStation, stations, volume, setVolume } = useMusic();

    return (
        <div className="w-full h-full flex flex-col bg-transparent text-slate-200">
            {/* Header / Sidebar Mock */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-slate-900/40 backdrop-blur-md border-r border-white/5 p-4 hidden md:flex flex-col space-y-4 text-xs font-semibold text-slate-500 select-none">
                    <div className="text-slate-400 uppercase tracking-wider mb-2">Apple Music</div>
                    <div className="text-red-400 bg-white/10 p-2 rounded cursor-pointer ring-1 ring-white/5">Listen Now</div>
                    <div className="hover:text-slate-200 cursor-pointer p-2 transition-colors">Browse</div>
                    <div className="hover:text-slate-200 cursor-pointer p-2 transition-colors">Radio</div>

                    <div className="text-slate-400 uppercase tracking-wider mt-4 mb-2">Stations</div>
                    {stations.map(station => (
                        <div
                            key={station.id}
                            onClick={() => playStation(station)}
                            className={`cursor-pointer p-2 rounded truncate transition-colors ${currentStation?.id === station.id ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30' : 'hover:bg-white/5 hover:text-slate-200'}`}
                        >
                            {station.name}
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-transparent p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-sm">Listen Now</h1>

                        {/* Hero Banner / Cover Art */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-8 group cursor-pointer" onClick={togglePlay}>
                            <div className="w-full sm:w-64 h-64 shadow-2xl rounded-lg overflow-hidden bg-gradient-to-tr from-slate-800 to-black relative border border-white/10">
                                {/* Cover Art */}
                                {currentStation?.cover ? (
                                    <img src={currentStation.cover} alt="Cover" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <div className="w-full h-full bg-indigo-900/50" />
                                )}

                                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl bg-black/40 group-hover:bg-black/20 transition-colors opacity-0 group-hover:opacity-100">
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </div>
                            </div>
                            <div className="flex flex-col justify-end pb-2">
                                <h2 className="text-2xl font-bold text-white mb-1">{currentStation?.name || 'Select a Station'}</h2>
                                <p className="text-red-400 font-medium">Live Stream • {currentStation?.genre || 'Radio'}</p>
                                <p className="text-slate-500 text-sm mt-2">Global Internet Radio Stations</p>
                            </div>
                        </div>

                        {/* Quick Picks (Stations Grid) */}
                        <h3 className="text-lg font-bold text-slate-200 mb-4">Stations</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stations.map(station => (
                                <div
                                    key={station.id}
                                    className="space-y-2 cursor-pointer group"
                                    onClick={() => playStation(station)}
                                >
                                    <div className="aspect-square rounded-md overflow-hidden shadow-lg relative border border-white/5 bg-black/20">
                                        <img src={station.cover} alt={station.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                        <div className={`absolute inset-0 bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity ${currentStation?.id === station.id && isPlaying ? 'opacity-100' : ''}`}>
                                            {currentStation?.id === station.id && isPlaying ? <div className="animate-pulse font-bold text-xs">Playing</div> : <FaPlay />}
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-slate-300 truncate group-hover:text-white transition-colors">{station.name}</div>
                                    <div className="text-xs text-slate-500">{station.genre}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="h-20 border-t border-white/5 bg-slate-900/60 backdrop-blur-xl flex items-center px-6 justify-between select-none relative z-20">
                {/* Controls Left */}
                <div className="flex items-center space-x-4 w-1/3">
                    <div className="w-12 h-12 bg-white/5 rounded-md hidden sm:block overflow-hidden border border-white/10 shadow-inner">
                        {currentStation?.cover && <img src={currentStation.cover} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-sm font-semibold text-slate-200">{currentStation?.name || 'Not Playing'}</div>
                        <div className="text-xs text-slate-500">{currentStation?.genre || ''}</div>
                    </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center space-x-6 w-1/3 justify-center">
                    <button className="text-slate-400 hover:text-white transition-colors"><FaStepBackward size={20} /></button>
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all text-white shadow-lg hover:scale-105 active:scale-95"
                    >
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} className="ml-1" />}
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors"><FaStepForward size={20} /></button>
                </div>

                {/* Volume */}
                <div className="flex items-center space-x-2 w-1/3 justify-end pr-4">
                    <FaVolumeUp className="text-slate-500 text-xs" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 accent-slate-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Music;

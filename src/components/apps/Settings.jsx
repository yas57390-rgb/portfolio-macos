import React from 'react';
import { useOS } from '../../contexts/OSContext';

const Settings = () => {
    const { theme, setTheme, wallpaper, setWallpaper, windowStyle, setWindowStyle } = useOS();

    return (
        <div className="w-full h-full bg-transparent p-6 text-slate-200">
            <h2 className="text-xl font-bold mb-6 text-white drop-shadow-sm">System Settings</h2>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/5 shadow-sm">
                <h3 className="font-semibold mb-3 text-slate-300">Wallpaper</h3>
                <select
                    value={wallpaper}
                    onChange={(e) => setWallpaper(e.target.value)}
                    className="w-full p-2.5 bg-black/30 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                    <option value="squares" className="bg-slate-800">Squares</option>
                    <option value="color-bends" className="bg-slate-800">Color Bends</option>
                    <option value="orb" className="bg-slate-800">Orb</option>
                    <option value="dot-grid" className="bg-slate-800">Dot Grid</option>
                    <option value="liquid-ether" className="bg-slate-800">Liquid Ether</option>
                    <option value="antigravity" className="bg-slate-800">Antigravity</option>
                </select>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/5 shadow-sm">
                <h3 className="font-semibold mb-3 text-slate-300">Window Style</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setWindowStyle('glass')}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${windowStyle === 'glass'
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-black/20 border-white/10 text-slate-400 hover:bg-white/5'
                            }`}
                    >
                        Liquid Glass
                    </button>
                    <button
                        onClick={() => setWindowStyle('classic')}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${windowStyle === 'classic'
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-black/20 border-white/10 text-slate-400 hover:bg-white/5'
                            }`}
                    >
                        Classic (Fast)
                    </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                    "Liquid Glass" applies a heavy distortion effect. Use "Classic" for better performance with many windows.
                </p>
            </div>

        </div>
    );
};

export default Settings;

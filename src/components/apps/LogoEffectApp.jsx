import React, { useState } from 'react';
import MetallicPaint from '../effects/MetallicPaint';

// Using standard import for Vite assets
// If this file exists, it will work. If not, the user needs to ensure the path is correct in public/assets
import logo from '/mewo_logo.png?url';

const Control = ({ label, value, min, max, step, onChange, type = "range" }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs mb-1 text-gray-300">
            <label>{label}</label>
            <span>{type === 'range' ? value : ''}</span>
        </div>
        {type === 'range' ? (
            <input
                type="range"
                className="w-full accent-blue-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
        ) : type === 'checkbox' ? (
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id={`checkbox-${label}`}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <label htmlFor={`checkbox-${label}`} className="ml-2 text-xs text-gray-300 cursor-pointer">Enabled</label>
            </div>
        ) : (
            <div className="flex gap-2">
                <input
                    type="color"
                    className="h-8 w-full bg-transparent cursor-pointer rounded"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <input
                    type="text"
                    className="bg-gray-700 text-xs text-white px-2 rounded border border-gray-600 w-20"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        )}
    </div>
);

export default function LogoEffectApp() {
    const logoPath = "/assets/SIE_H_N_RVB.png";

    const [params, setParams] = useState({
        scale: 4,
        patternSharpness: 1,
        noiseScale: 0.5,
        speed: 0.3,
        liquid: 0.75,
        brightness: 3.5, // Increased from 2 to 3.5 for more brightness
        contrast: 1.5,   // Increased from 0.5 to 1.5 for sharper metallic look
        refraction: 0.01,
        blur: 0.015,
        chromaticSpread: 2,
        fresnel: 1,
        angle: 0,
        waveAmplitude: 1,
        distortion: 1,
        contour: 0.2,
        lightColor: "#ffffff",
        darkColor: "#cccccc",
        tintColor: "#ffffff",
        mouseAnimation: false
    });

    const handleChange = (key, value) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex w-full h-full bg-gray-900 text-white overflow-hidden">
            {/* Main Preview Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="text-white mb-6 text-center z-10">
                    <h2 className="text-2xl font-bold mb-1">Liquid Metal Playground</h2>
                    <p className="opacity-60 text-xs font-mono">{logoPath}</p>
                </div>

                <div style={{ width: '100%', maxWidth: '600px', height: '400px' }} className="border border-white/10 rounded-xl overflow-hidden bg-black/50 shadow-2xl relative z-10 backdrop-blur-sm">
                    <MetallicPaint
                        imageSrc={logoPath}
                        {...params}
                    // mouseAnimation is now passed via {...params}
                    />
                </div>

                <p className="text-xs text-yellow-500/80 mt-4 max-w-md text-center">
                    Note: If the result is too dark, try increasing Brightness or setting Dark Color to a lighter grey.
                </p>
            </div>

            {/* Controls Sidebar */}
            <div className="w-80 bg-gray-800/90 backdrop-blur border-l border-white/10 p-5 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-600">
                <h3 className="font-bold mb-6 text-sm uppercase tracking-wider text-blue-400 border-b border-white/10 pb-2">Configuration</h3>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Lighting & Color</h4>
                        <Control label="Brightness" value={params.brightness} min={0.5} max={5} step={0.1} onChange={v => handleChange('brightness', v)} />
                        <Control label="Contrast" value={params.contrast} min={0} max={3} step={0.1} onChange={v => handleChange('contrast', v)} />
                        <Control label="Light Color" value={params.lightColor} type="color" onChange={v => handleChange('lightColor', v)} />
                        <Control label="Dark Color" value={params.darkColor} type="color" onChange={v => handleChange('darkColor', v)} />
                        <Control label="Tint Color" value={params.tintColor} type="color" onChange={v => handleChange('tintColor', v)} />
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Material Props</h4>
                        <Control label="Liquid Flow" value={params.liquid} min={0} max={2} step={0.05} onChange={v => handleChange('liquid', v)} />
                        <Control label="Scale" value={params.scale} min={1} max={10} step={0.1} onChange={v => handleChange('scale', v)} />
                        <Control label="Refraction" value={params.refraction} min={0} max={0.2} step={0.001} onChange={v => handleChange('refraction', v)} />
                        <Control label="Distortion" value={params.distortion} min={0} max={5} step={0.1} onChange={v => handleChange('distortion', v)} />
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Animation</h4>
                        <Control label="Mouse Interaction" value={params.mouseAnimation} type="checkbox" onChange={v => handleChange('mouseAnimation', v)} />
                        <Control label="Speed" value={params.speed} min={0} max={2} step={0.01} onChange={v => handleChange('speed', v)} />
                        <Control label="Wave Amplitude" value={params.waveAmplitude} min={0} max={5} step={0.1} onChange={v => handleChange('waveAmplitude', v)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

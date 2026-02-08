import React, { useRef, useEffect } from 'react'; // Added imports for hooks
import Cubes from '../../ui/Cubes';
import GlassContainer from '../GlassContainer';
import MetallicPaint from '../../effects/MetallicPaint';
import { FaHeadset, FaCarSide, FaGraduationCap, FaShieldAlt, FaBoxOpen, FaBullseye, FaUserCheck } from 'react-icons/fa'; // Added icons

// Shared layout for consistency
const SlideContainer = ({ title, children, scrollable = false, className = '', centered = false }) => (
    <div className={`w-full h-full flex flex-col items-center select-none ${className} ${centered ? 'justify-center' : ''}`}>
        {/* Title Area - Fixed position relative to content area */}
        <h2 className="text-4xl font-semibold mb-6 text-white tracking-tight flex-shrink-0 drop-shadow-md z-10 text-center">{title}</h2>

        {/* Content Area - Scrollable */}
        <div className={`${centered ? '' : 'flex-1'} w-full max-w-5xl overflow-y-auto scrollbar-hide flex flex-col items-center`}>
            <div className="w-full text-lg text-gray-200 space-y-6 leading-relaxed pb-4">
                {children}
            </div>
        </div>
    </div>
);

// ... (Rest of IntroSlide remains unchanged)

// ... (Rest of SIESlide remains unchanged)

export const ProfileSlide = () => (
    <SlideContainer title="PROFIL & FORMATION">
        <div className="w-full h-full px-8 pb-8 overflow-hidden">
            <div className="grid grid-cols-[400px_1fr] gap-8 h-full">
                {/* LEFT COLUMN - Identity */}
                <div className="flex flex-col h-full bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden">
                    {/* Photo */}
                    <div className="flex justify-center mb-6">
                        <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl relative">
                            <img src="/assets/cv-photo.png" alt="Yassine Dinar" className="w-full h-full rounded-full object-cover border-4 border-[#1c1c1e]" />
                        </div>
                    </div>
                    {/* Name & Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Yassine Dinar</h2>
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-medium text-sm">
                            Technicien en Reconversion
                        </div>
                    </div>
                    {/* Exp & Assets */}
                    <div className="space-y-4 mt-auto">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <FaBoxOpen className="text-2xl text-orange-400" />
                                <h3 className="font-bold text-white">Expérience</h3>
                            </div>
                            <p className="text-gray-300 text-sm">10 ans en Logistique & Production</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <FaUserCheck className="text-2xl text-green-400" />
                                <h3 className="font-bold text-white">Atouts</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Rigueur', 'Méthode', 'Autonomie'].map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-white/10 rounded text-xs text-white border border-white/5">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Academic */}
                <div className="flex flex-col h-full gap-6">
                    {/* Campus MEWO Header */}
                    <div className="bg-[#1E1E24] p-8 rounded-3xl border border-white/10 flex items-center justify-between shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cadre Académique</h3>
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">Campus MEWO</h1>
                            <p className="text-gray-400 mt-2 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                École supérieure en alternance, Metz
                            </p>
                        </div>
                        {/* Logo Placeholder */}
                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white/20 font-bold text-xl">
                            MEWO
                        </div>
                    </div>

                    {/* Degree Info */}
                    <div className="flex-1 bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-3xl border border-white/10 flex flex-col justify-center relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl border border-blue-500/30">
                                    <FaGraduationCap />
                                </div>
                                <span className="text-blue-300 font-medium tracking-wide uppercase text-sm">Diplôme Visé</span>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-5xl font-extrabold text-white mb-2 tracking-tight">BTS SIO</h2>
                                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Option SISR</h3>
                                <p className="text-gray-400 mt-2 font-light text-lg">Solutions d'Infrastructure, Systèmes et Réseaux</p>
                            </div>

                            {/* Specialization & Ambition Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <div className="bg-black/20 p-5 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors">
                                    <h4 className="flex items-center gap-2 text-white font-bold mb-2 text-sm uppercase tracking-wider">
                                        <FaShieldAlt className="text-red-400 text-lg" /> Spécialisation
                                    </h4>
                                    <p className="text-gray-300 font-medium">Cybersécurité</p>
                                </div>
                                <div className="bg-black/20 p-5 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors">
                                    <h4 className="flex items-center gap-2 text-white font-bold mb-2 text-sm uppercase tracking-wider">
                                        <FaBullseye className="text-green-400 text-lg" /> Ambition
                                    </h4>
                                    <p className="text-gray-300 font-medium">Licence Pro / CDI</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SlideContainer>
);

// ... (Rest of existing slides CVSlide, PortfolioSlide, etc.)

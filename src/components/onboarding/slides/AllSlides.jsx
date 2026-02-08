import React from 'react';
import Cubes from '../../ui/Cubes';
import GlassContainer from '../GlassContainer';
import MetallicPaint from '../../effects/MetallicPaint';
import SIECubeLogo from '../../effects/SIECubeLogo';
import MagicBento from './MagicBento';
import { FaHeadset, FaCarSide, FaGraduationCap, FaShieldAlt, FaBoxOpen, FaBullseye, FaUserCheck } from 'react-icons/fa';

// Shared layout for consistency
const SlideContainer = ({ title, children, scrollable = false, className = '', centered = false, maxWidth = 'max-w-5xl', noScroll = false }) => (
    <div className={`w-full h-full flex flex-col items-center select-none ${className} ${centered ? 'justify-center' : ''}`}>
        {/* Title Area - Fixed position relative to content area */}
        {title && <h2 className="text-4xl font-semibold mb-6 text-white tracking-tight flex-shrink-0 drop-shadow-md z-10 text-center">{title}</h2>}

        {/* Content Area - Scrollable */}
        <div className={`${centered ? '' : 'flex-1'} w-full ${maxWidth} ${noScroll ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'} flex flex-col items-center`}>
            <div className="w-full h-full text-lg text-gray-200 space-y-6 leading-relaxed">
                {children}
            </div>
        </div>
    </div>
);

export const IntroSlide = ({ onEnter }) => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    // Capitalize first letter of date
    const dateStr = formatDate(time);
    const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    return (
        <div className="flex flex-col items-center justify-between h-full w-full py-16 animate-fade-in select-none relative overflow-hidden">

            {/* Background Breathing Animation */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>

            {/* TOP: Clock & Date */}
            <div className="flex flex-col items-center gap-2 mt-8 z-10">
                <div className="flex flex-col items-center">
                    <span className="text-xl text-blue-300 font-medium uppercase tracking-[0.2em] mb-2 drop-shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        Locked
                    </span>
                    <h1 className="text-9xl font-thin text-white tracking-tighter drop-shadow-2xl font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {formatTime(time)}
                    </h1>
                </div>
                <p className="text-3xl text-white/80 font-light drop-shadow-md tracking-wide">
                    {formattedDate}
                </p>
            </div>

            {/* CENTER: Identity */}
            <div className="flex flex-col items-center group cursor-pointer z-10" onClick={onEnter}>
                <div className="relative mb-8 transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-500/50 transition-all duration-500 animate-pulse-slow"></div>
                    <img
                        src="/assets/cv-photo.png"
                        alt="Yassine Dinar"
                        className="w-48 h-48 rounded-full object-cover border-[4px] border-white/10 shadow-2xl relative z-10 group-hover:border-white/30 transition-all duration-300"
                    />
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-[#1c1c1e] rounded-full z-20"></div>
                </div>
                <h2 className="text-5xl font-bold text-white drop-shadow-xl mb-3 tracking-tight">Yassine Dinar</h2>
                <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg group-hover:bg-white/10 transition-colors">
                    <span className="text-lg text-blue-200 font-medium">BTS SIO option SISR</span>
                </div>
            </div>

            {/* BOTTOM: Action */}
            <div className="flex flex-col items-center mb-8 z-10">
                <button
                    onClick={onEnter}
                    className="group relative px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all active:scale-95 flex items-center gap-3 overflow-hidden"
                >
                    <span className="relative z-10 text-sm font-medium text-white tracking-widest uppercase">Entrer</span>
                    <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </button>
                <span className="text-xs font-light text-white/30 mt-6 tracking-widest uppercase">Press Enter to Unlock</span>
            </div>
        </div>
    );
};

// SIE Logo colorMap: EXACT 10x10 grid pattern

const W = '#FFFFFF';  // White
const B = '#1E90FF';  // Blue
const _ = 0;          // Empty (gap)

const sieLogoMap = [
    // Ligne 1: 4 blanc + 6 bleu
    [W, W, W, W, B, B, B, B, B, B],
    // Ligne 2: 4 blanc + 6 bleu
    [W, W, W, W, B, B, B, B, B, B],
    // Ligne 3: 4 blanc + 6 vide
    [W, W, W, W, _, _, _, _, _, _],
    // Ligne 4: 4 blanc + 6 vide
    [W, W, W, W, _, _, _, _, _, _],
    // Ligne 5: 4 blanc + 2 vide + 4 bleu
    [W, W, W, W, _, _, B, B, B, B],
    // Ligne 6: 4 blanc + 2 vide + 4 bleu
    [W, W, W, W, _, _, B, B, B, B],
    // Ligne 7: 6 vide + 4 bleu
    [_, _, _, _, _, _, B, B, B, B],
    // Ligne 8: 6 vide + 4 bleu
    [_, _, _, _, _, _, B, B, B, B],
    // Ligne 9: 6 blanc + 4 bleu
    [W, W, W, W, W, W, B, B, B, B],
    // Ligne 10: 6 blanc + 4 bleu
    [W, W, W, W, W, W, B, B, B, B],
];

export const ProfileSlide = () => (
    <SlideContainer title={null} maxWidth="w-full" noScroll={true}>
        <div className="w-full h-full flex items-center justify-center">
            <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={220}
                particleCount={12}
                glowColor="132, 0, 255"
                disableAnimations={false}
            />
        </div>
    </SlideContainer>
);

export const SIESlide = () => {
    const scrollContainerRef = React.useRef(null);

    // Handle arrow key scrolling
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!scrollContainerRef.current) return;
            const scrollAmount = 80;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollContainerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Tuned parameters for Liquid Metal Effect
    const effectParams = {
        scale: 4,
        patternSharpness: 1,
        noiseScale: 0.5,
        speed: 0.15,
        liquid: 0.75,
        brightness: 3.5,
        contrast: 1.5,
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
        mouseAnimation: false // Automatic looping animation
    };

    return (
        <div className="w-full h-full flex flex-col items-center select-none overflow-hidden">
            {/* Title - Fixed at top */}
            <h2 className="text-4xl font-semibold mb-6 text-white tracking-tight flex-shrink-0 drop-shadow-md z-10 text-center mt-2">Mon entreprise d'accueil</h2>

            {/* Main Content - 2 Column Grid */}
            <div className="flex-1 w-full px-12 pb-8 overflow-hidden">
                <div className="grid grid-cols-[450px_1fr] gap-12 h-full">

                    {/* LEFT COLUMN - Sticky / Visual Anchor */}
                    <div className="flex flex-col h-full bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        {/* Liquid Metal Logo */}
                        <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 mb-8 bg-black/40">
                            <MetallicPaint
                                imageSrc="/assets/SIE_H_N_RVB.png"
                                {...effectParams}
                            />
                        </div>

                        {/* Company Info */}
                        <div className="mt-auto">
                            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-2">SIE Grand-Est</h1>
                            <p className="text-blue-300 text-lg font-medium mb-4">Groupe SIE (50 collaborateurs)</p>

                            <div className="space-y-3 border-t border-white/10 pt-6">
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Équipe locale</span>
                                    <span className="font-semibold text-white">20 techniciens</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Clients</span>
                                    <span className="font-semibold text-white">+200 (PME, Collectivités)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Expertise</span>
                                    <span className="font-semibold text-white">Infogérance & Cyber</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Scrollable Content */}
                    <div ref={scrollContainerRef} className="h-full flex flex-col gap-4 pr-1 overflow-hidden">
                        {/* Header Text */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 shrink-0">
                            <h3 className="text-lg font-bold text-white mb-2">L'Entreprise</h3>
                            <p className="text-gray-300 leading-relaxed">
                                ESN spécialisée en infogérance, cybersécurité et infrastructures réseau.
                                Nous accompagnons plus de <strong className="text-white">200 clients</strong> sur le Grand-Est,
                                allant des PME aux collectivités et associations.
                            </p>
                        </div>

                        {/* Organisation 50/50 */}
                        <div className="grid grid-cols-2 gap-4 shrink-0">
                            <div className="bg-blue-500/10 p-5 rounded-2xl border border-blue-500/20 flex flex-col items-center text-center">
                                <FaHeadset className="text-4xl mb-3 text-blue-400" />
                                <h4 className="text-xl font-bold text-white">50% Helpdesk</h4>
                                <p className="text-sm text-blue-200 mt-1">Équipe de 4 personnes</p>
                            </div>
                            <div className="bg-purple-500/10 p-5 rounded-2xl border border-purple-500/20 flex flex-col items-center text-center">
                                <FaCarSide className="text-4xl mb-3 text-purple-400" />
                                <h4 className="text-xl font-bold text-white">50% Itinérance</h4>
                                <p className="text-sm text-purple-200 mt-1">Avec 2 techniciens confirmés</p>
                            </div>
                        </div>

                        {/* Encadrement */}
                        <div className="flex flex-col gap-2 text-sm text-gray-400 px-2">
                            <strong className="text-white text-md border-b border-green-500/30 self-start pb-1 mb-1">Mon positionnement hiérarchique</strong>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Resp. Helpdesk (N+1)
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Directeur Technique (N+2)
                                </span>
                            </div>
                        </div>

                        {/* Missions Détaillées */}
                        <div className="grid grid-cols-2 gap-4 shrink-0">
                            {/* Helpdesk */}
                            <div className="bg-[#1E1E24] p-5 rounded-2xl border border-white/10 flex flex-col justify-center">
                                <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                                    <span>Au Helpdesk</span>
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">▸</span>
                                        <span>Support N1/N2 : <strong>Résolution d'incidents Système & Réseau</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">▸</span>
                                        <span><strong>Administration Active Directory</strong> (Utilisateurs, GPO) & M365</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">▸</span>
                                        <span>Sécurité & Accès : <strong>Configuration MFA, Filtrage Mail (Mailinblack) & Règles Pare-feu</strong></span>
                                    </li>
                                </ul>
                            </div>

                            {/* Itinérance */}
                            <div className="bg-[#1E1E24] p-5 rounded-2xl border border-white/10 flex flex-col justify-center">
                                <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                                    <span>En Itinérance</span>
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">▸</span>
                                        <span><strong>Déploiement & Maintenance</strong> de postes de travail</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">▸</span>
                                        <span>Installation <strong>Serveurs NAS & Équipements Réseau</strong> (Switch/Bornes)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">▸</span>
                                        <span><strong>Audits SI</strong> & Prise en main d'infrastructure</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">▸</span>
                                        <span>Câblage & Gestion d'<strong>incidents critiques</strong></span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Stack Technologique */}
                        <div className="bg-[#1A1A2E] p-5 rounded-2xl border border-white/10 shrink-0 mt-auto">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Stack Technologique</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-600/20 text-blue-300 px-3 py-1.5 rounded-lg text-sm border border-blue-600/30">Windows Server</span>
                                <span className="bg-blue-600/20 text-blue-300 px-3 py-1.5 rounded-lg text-sm border border-blue-600/30">Active Directory</span>
                                <span className="bg-blue-600/20 text-blue-300 px-3 py-1.5 rounded-lg text-sm border border-blue-600/30">Hyper-V</span>

                                <span className="bg-orange-600/20 text-orange-300 px-3 py-1.5 rounded-lg text-sm border border-orange-600/30">Aruba (Switch/WiFi)</span>
                                <span className="bg-orange-600/20 text-orange-300 px-3 py-1.5 rounded-lg text-sm border border-orange-600/30">Stormshield</span>

                                <span className="bg-sky-600/20 text-sky-300 px-3 py-1.5 rounded-lg text-sm border border-sky-600/30">Microsoft 365</span>
                                <span className="bg-sky-600/20 text-sky-300 px-3 py-1.5 rounded-lg text-sm border border-sky-600/30">OVH</span>

                                <span className="bg-red-600/20 text-red-300 px-3 py-1.5 rounded-lg text-sm border border-red-600/30">NinjaOne (RMM)</span>
                                <span className="bg-red-600/20 text-red-300 px-3 py-1.5 rounded-lg text-sm border border-red-600/30">Trend Micro</span>
                                <span className="bg-red-600/20 text-red-300 px-3 py-1.5 rounded-lg text-sm border border-red-600/30">Mailinblack</span>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

// --- New Slide Implementations ---

export const CVSlide = () => (
    <SlideContainer title="Mon Parcours">
        <div className="flex justify-center w-full max-w-4xl mx-auto mt-8">
            <div className="relative border-l-2 border-white/10 pl-8 ml-4 space-y-12 text-left">
                {/* Timeline Item 1 */}
                <div className="relative group">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#1e1e1e] shadow-lg group-hover:scale-125 transition-transform"></div>
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-[500px]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">Alternant Admin Sys & Réseaux</h3>
                            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">2023 - Présent</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">💼</span>
                            <span className="text-lg text-slate-300 font-medium">SIE (Solutions Informatiques et Expertises)</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Gestion d'infrastructure, déploiement réseau, cybersécurité défensive et support niveau 2/3.
                        </p>
                    </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative group">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-purple-500 border-4 border-[#1e1e1e] shadow-lg group-hover:scale-125 transition-transform"></div>
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-[500px]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">Technicien Support (Stage)</h3>
                            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">2022</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🛠️</span>
                            <span className="text-lg text-slate-300 font-medium">SIE</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Assistance utilisateurs, maintenance hardware, préparation de postes de travail.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </SlideContainer>
);

export const PortfolioSlide = () => (
    <SlideContainer title="Mon Portfolio">
        <p className="mb-8 text-gray-400">Mes projets classés par domaines de compétences.</p>
        <div className="flex justify-center gap-12 mt-4">
            {/* App 1 */}
            <div className="group flex flex-col items-center gap-3 cursor-pointer transition-transform hover:-translate-y-2">
                <div className="w-24 h-24 rounded-[22px] bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg flex items-center justify-center text-4xl text-white border border-white/10 group-hover:shadow-blue-500/30">
                    🆘
                </div>
                <span className="text-sm font-medium text-white/90">Support</span>
            </div>

            {/* App 2 */}
            <div className="group flex flex-col items-center gap-3 cursor-pointer transition-transform hover:-translate-y-2">
                <div className="w-24 h-24 rounded-[22px] bg-gradient-to-b from-purple-400 to-purple-600 shadow-lg flex items-center justify-center text-4xl text-white border border-white/10 group-hover:shadow-purple-500/30">
                    🌐
                </div>
                <span className="text-sm font-medium text-white/90">Réseaux</span>
            </div>

            {/* App 3 */}
            <div className="group flex flex-col items-center gap-3 cursor-pointer transition-transform hover:-translate-y-2">
                <div className="w-24 h-24 rounded-[22px] bg-gradient-to-b from-red-400 to-red-600 shadow-lg flex items-center justify-center text-4xl text-white border border-white/10 group-hover:shadow-red-500/30">
                    🛡️
                </div>
                <span className="text-sm font-medium text-white/90">Cyber</span>
            </div>

            {/* App 4 - Bonus */}
            <div className="group flex flex-col items-center gap-3 cursor-pointer transition-transform hover:-translate-y-2">
                <div className="w-24 h-24 rounded-[22px] bg-gradient-to-b from-green-400 to-green-600 shadow-lg flex items-center justify-center text-4xl text-white border border-white/10 group-hover:shadow-green-500/30">
                    💻
                </div>
                <span className="text-sm font-medium text-white/90">Dev</span>
            </div>
        </div>
    </SlideContainer>
);

export const VeilleSlide = () => (
    <SlideContainer title="Veille Technologique">
        <p className="mb-8 text-gray-400">Sources quotidiennes pour rester informé.</p>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
            {/* Widget Small 1 */}
            <div className="w-40 h-40 rounded-2xl bg-[#1c1c1e] border border-white/10 flex flex-col p-4 shadow-xl hover:scale-105 transition-transform">
                <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-white font-bold mb-auto">A</div>
                <span className="text-xs font-bold text-gray-500 uppercase">Sécurité</span>
                <span className="text-xl font-bold text-white leading-tight">ANSSI<br />CertFR</span>
            </div>

            {/* Widget Small 2 */}
            <div className="w-40 h-40 rounded-2xl bg-[#1c1c1e] border border-white/10 flex flex-col p-4 shadow-xl hover:scale-105 transition-transform">
                <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold mb-auto">L</div>
                <span className="text-xs font-bold text-gray-500 uppercase">Actu IT</span>
                <span className="text-sm font-bold text-white leading-tight mt-1">Le Monde<br />Informatique</span>
            </div>

            {/* Widget Wide */}
            <div className="w-40 h-40 sm:w-80 rounded-2xl bg-[#1c1c1e] border border-white/10 flex flex-col p-4 shadow-xl hover:scale-105 transition-transform overflow-hidden relative">
                <div className="flex items-center justify-between mb-auto relative z-10">
                    <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-white font-bold">V</div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Tech US</span>
                </div>
                <span className="text-2xl font-bold text-white mb-1 relative z-10">The Verge</span>
                <p className="text-xs text-gray-400 relative z-10">Latest Tech News, Reviews and Science.</p>
                {/* Decoration */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            </div>
        </div>
    </SlideContainer>
);

export const GuideSlide = () => (
    <SlideContainer title="Guide du Système">
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-4 text-left hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">
                    🧭
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Navigation</h3>
                    <p className="text-sm text-gray-400">Utilisez le Dock en bas pour ouvrir les applications.</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-4 text-left hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
                    🪟
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Fenêtres</h3>
                    <p className="text-sm text-gray-400">Déplaçables, redimensionnables. Double-cliquez sur la barre de titre pour agrandir.</p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-4 text-left hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-2xl">
                    📁
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Fichiers</h3>
                    <p className="text-sm text-gray-400">Le Finder vous permet d'explorer mes projets et documents (PDF, Images, Scripts).</p>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-start gap-4 text-left hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-2xl">
                    ⌨️
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Terminal</h3>
                    <p className="text-sm text-gray-400">Pour les experts : essayez les commandes `help`, `cat`, ou `ping` dans le Terminal.</p>
                </div>
            </div>
        </div>
    </SlideContainer>
);

export const ContactSlide = () => {
    // Chatbot State
    const [step, setStep] = React.useState(0); // 0: Message, 1: Email, 2: Done
    const [message, setMessage] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('idle');

    const [chatHistory, setChatHistory] = React.useState([
        { type: 'system', text: "Salut ! N'hésitez pas à m'envoyer un message pour toute opportunité ou question." }
    ]);

    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [chatHistory, step]);

    // Sound Effect
    const playSentSound = () => {
        try {
            const audio = new Audio('/assets/sounds/message-sent.mp3');
            audio.play().catch(e => console.log("Audio play failed (file might be missing)", e));
        } catch (e) {
            console.log("Audio error", e);
        }
    };

    // Step 1: User sends Message
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        playSentSound();
        setChatHistory(prev => [...prev, { type: 'user', text: message }]);
        setMessage(''); // Clear input for next step

        // Typing delay then Bot asks for Email
        setTimeout(() => {
            setChatHistory(prev => [...prev, { type: 'system', text: "Bien reçu ! Pour que Yassine puisse vous recontacter, quelle est votre adresse email ?" }]);
            setStep(1);
        }, 800);
    };

    // Step 2: User sends Email -> Final Submit
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        playSentSound();
        setChatHistory(prev => [...prev, { type: 'user', text: email }]);
        setStatus('sending');

        // Typing delay then Attempt Send
        setTimeout(async () => {
            // Real Formspree Submit
            const FORMSPREE_ID = 'xvzzpoww';
            try {
                // Determine message content to send (sending combined context)
                const historyText = chatHistory.map(m => `${m.type}: ${m.text} `).join('\n');

                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        message: `User Email: ${email}\n\nChat History:\n${historyText}\nUser: ${email}`
                    })
                });

                if (response.ok) {
                    setChatHistory(prev => [
                        ...prev,
                        { type: 'system', text: "C'est envoyé ! Yassine vous répondra très vite." },
                        { type: 'system', text: "Vous pouvez maintenant cliquer sur Terminer pour accéder à mon système. Une démo vidéo se lancera sur le bureau pour vous guider." }
                    ]);
                    setStep(2); // Done
                    setStatus('success');
                    playSentSound();
                } else {
                    setChatHistory(prev => [...prev, { type: 'system', text: "Oups, une erreur est survenue. Réessayez plus tard." }]);
                    setStatus('error');
                }
            } catch (error) {
                setChatHistory(prev => [...prev, { type: 'system', text: "Erreur de connexion." }]);
                setStatus('error');
            }
        }, 800);
    };

    return (
        <SlideContainer title="Restons en Contact" centered={true}>
            <div className="max-w-xl mx-auto w-full font-sans shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[550px] bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500">
                {/* iMessage Header */}
                <div className="bg-white/5 p-4 border-b border-white/5 flex flex-col items-center justify-center relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-500/50 flex items-center justify-center text-white text-xs mb-1 shadow-inner border border-white/5">YD</div>
                    <span className="text-[10px] uppercase text-gray-400 tracking-wider font-medium">To: <span className="text-white font-semibold">Yassine Dinar</span></span>
                </div>

                {/* Chat Body */}
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                            <div className={`max-w-[85%] px-4 py-2 text-sm shadow-sm leading-relaxed ${msg.type === 'user'
                                ? 'bg-[#007AFF] text-white rounded-2xl rounded-br-none'
                                : 'bg-[#262626] text-gray-200 rounded-2xl rounded-bl-none border border-white/10'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {status === 'sending' && (
                        <div className="flex justify-start animate-fade-in-up">
                            <div className="bg-[#262626] text-gray-200 px-4 py-2 rounded-2xl rounded-bl-none border border-white/10 flex items-center gap-1 h-[38px]">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-black/20 backdrop-blur-md border-t border-white/5 shrink-0 pb-5">
                    <form
                        onSubmit={step === 0 ? handleMessageSubmit : handleEmailSubmit}
                        className="relative flex items-center w-full"
                    >
                        <input
                            type={step === 1 ? "email" : "text"}
                            value={step === 1 ? email : message}
                            onChange={(e) => step === 1 ? setEmail(e.target.value) : setMessage(e.target.value)}
                            disabled={step === 2 || status === 'sending'}
                            placeholder={step === 1 ? "Votre adresse email..." : "iMessage"}
                            className="w-full bg-[#1c1c1e] text-white border border-[#3a3a3a] rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-[#007AFF] transition-all placeholder-gray-500 text-sm shadow-inner"
                            autoFocus
                        />

                        <button
                            type="submit"
                            disabled={step === 2 || status === 'sending' || (step === 0 && !message.trim()) || (step === 1 && !email.trim())}
                            className={`absolute right-1.5 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${(step === 0 && message.trim()) || (step === 1 && email.trim())
                                ? 'bg-[#007AFF] text-white scale-100 hover:scale-110 active:scale-95'
                                : 'bg-[#3a3a3a] text-gray-500 scale-90'
                                }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </SlideContainer>
    );
};

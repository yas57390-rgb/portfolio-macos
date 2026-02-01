import React from 'react';
import Carousel from '../../ui/Carousel';
import GlassContainer from '../GlassContainer';
import { FaAward, FaCertificate, FaCode } from 'react-icons/fa';

// Placeholder certifications data
const certifications = [
    {
        id: 1,
        title: 'BTS SIO',
        description: 'Brevet de Technicien Supérieur Services Informatiques aux Organisations. Option SISR.',
        icon: <FaAward size={20} />
    },
    {
        id: 2,
        title: 'CCNA 1',
        description: 'Cisco Certified Network Associate. Introduction aux réseaux.',
        icon: <FaCertificate size={20} />
    },
    {
        id: 3,
        title: 'SecNumAcadémie',
        description: 'Sensibilisation à la sécurité du numérique par l\'ANSSI.',
        icon: <FaCode size={20} />
    },
    {
        id: 4,
        title: 'Pix',
        description: 'Certification des compétences numériques.',
        icon: <FaCertificate size={20} />
    }
];

export const CertifsSlide = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <GlassContainer className="max-w-5xl w-full p-12 flex flex-col items-center">
                <h2 className="text-4xl font-semibold mb-8 text-white text-center drop-shadow-md">Mes Certifications</h2>

                {/* Diploma Badge Main */}
                <div className="relative group mb-8">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

                    {/* Badge Card */}
                    <div className="relative bg-[#1c1c1e] w-[500px] p-8 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-default">
                        {/* Left Icon */}
                        <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                            <FaAward size={48} />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-right">
                            <h3 className="text-2xl font-bold text-white mb-1">BTS SIO</h3>
                            <p className="text-sm text-gray-400 mb-2">Services Informatiques aux Organisations</p>
                            <p className="text-xs font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 inline-block px-3 py-1 rounded-full">Option SISR</p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Logos */}
                <div className="flex items-center justify-center gap-12 opacity-80">
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors"><FaCertificate size={28} /></div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">Cisco CCNA 1</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors"><FaCode size={28} /></div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">SecNumAcad</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors"><FaAward size={28} /></div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">Pix</span>
                    </div>
                </div>
            </GlassContainer>
        </div>
    );
};

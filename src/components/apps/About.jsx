import React from 'react';
import { useOS } from '../../contexts/OSContext';
import { FaLaptopCode, FaMemory, FaMicrochip, FaHdd, FaNetworkWired, FaShieldAlt, FaReact, FaDocker } from 'react-icons/fa';
import { SiTailwindcss, SiVite } from 'react-icons/si';

const About = () => {
    const { openWindow } = useOS();

    const openSystemReport = () => {
        openWindow({
            id: 'system-report',
            title: 'System Report - yassine.dinar.json',
            width: 600,
            height: 500,
            isFixed: false,
            content: (
                <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-xs h-full overflow-auto select-text">
                    <pre>{JSON.stringify({
                        "system": {
                            "host": "macOS-Portfolio",
                            "kernel": "SISR-Kernel-v2.0",
                            "uptime": "24 years",
                        },
                        "hardware": {
                            "cpu": "Human Processor (High Adaptability)",
                            "memory": "Infinite Learning Capacity",
                            "network": "TCP/IP, UDP, ICMP, OSPF, BGP"
                        },
                        "software": {
                            "os": "macOS Portfolio (Web Build)",
                            "stack": ["React", "Vite", "Tailwind", "Framer Motion"],
                            "devops": ["Docker", "Git", "CI/CD Basics"]
                        },
                        "security": {
                            "status": "Hardened",
                            "certifications": ["SecNumAcadémie", "CCNA 1 (In Progress)"],
                            "modules": ["Firewalling", "Log Analysis", "Ethical Hacking Intro"]
                        }
                    }, null, 4)}</pre>
                </div>
            )
        });
    };

    return (
        <div className="w-full h-full bg-transparent flex overflow-hidden text-slate-200 font-sans">
            {/* Sidebar - Identity Card */}
            <div className="w-[200px] bg-slate-900/40 backdrop-blur-md flex flex-col items-center pt-10 pb-4 border-r border-white/5 shadow-inner relative overflow-hidden">
                {/* Vibrant Background Blur Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

                {/* Photo Placeholder */}
                <div className="w-24 h-24 rounded-full bg-white/10 shadow-lg flex items-center justify-center mb-4 z-10 border-4 border-white/5 overflow-hidden ring-1 ring-white/10">
                    <img src="/assets/cv-photo.png" alt="Profile" className="w-full h-full object-cover" />
                </div>

                <div className="text-center z-10 px-2">
                    <h2 className="font-bold text-lg text-white">macOS Portfolio</h2>
                    <p className="text-xs text-slate-400 font-medium">Version 2.0 (SISR)</p>
                </div>

                <div className="mt-auto z-10 flex space-x-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 text-slate-300">
                    <FaReact size={18} />
                    <SiTailwindcss size={18} />
                    <FaDocker size={18} />
                    <SiVite size={18} />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 z-10">Built with Modern Web</p>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 flex flex-col justify-between overflow-y-auto bg-transparent">

                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">Yassine Dinar</h1>
                    <p className="text-base text-slate-400 font-medium mt-1">Étudiant BTS SIO - Option SISR</p>
                    <div className="mt-4 text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10 shadow-sm backdrop-blur-sm">
                        <p>Aspirant Ingénieur DevOps & Cybersécurité. Passionné par l’équilibre entre infrastructure et développement.</p>
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 gap-4 text-sm">
                    {/* Formation & Alternance */}
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">École</h3>
                            <p className="font-semibold text-slate-200">MEWO (Metz)</p>
                            <p className="text-xs text-slate-400">BTS Services Informatiques aux Organisations</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Entreprise</h3>
                            <p className="font-semibold text-slate-200">SIE</p>
                            <p className="text-xs text-slate-400">Apprenti Admin Systèmes & Réseaux</p>
                        </div>
                    </div>

                    {/* Technical Specs */}
                    <div className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10 shadow-sm backdrop-blur-sm">
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5"><FaMicrochip className="text-slate-500" /></div>
                            <div>
                                <span className="font-bold block text-slate-200">Processeur (Logiciel)</span>
                                <span className="text-slate-400">React, Tailwind CSS, JavaScript (ES6+), PowerShell</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5"><FaMemory className="text-slate-500" /></div>
                            <div>
                                <span className="font-bold block text-slate-200">Mémoire (Infra)</span>
                                <span className="text-slate-400">Windows Server (AD, DNS), Linux (Debian), Docker</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5"><FaNetworkWired className="text-slate-500" /></div>
                            <div>
                                <span className="font-bold block text-slate-200">Réseau (Connectivité)</span>
                                <span className="text-slate-400">CCNA, VLAN, Routage, VPN (IPSec/OpenVPN)</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5"><FaShieldAlt className="text-slate-500" /></div>
                            <div>
                                <span className="font-bold block text-slate-200">Sécurité (Hardening)</span>
                                <span className="text-slate-400">Analyse de logs, Pare-feu, Sensibilisation ANSSI</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/10">
                    <button
                        onClick={openSystemReport}
                        className="bg-slate-800 border border-white/10 px-3 py-1 rounded shadow-sm text-xs font-medium hover:bg-slate-700 active:scale-95 transition-all text-slate-300 ring-1 ring-white/5"
                    >
                        System Report...
                    </button>
                    <span className="text-[10px] text-slate-600">© 2025 Yassine Dinar. All rights reserved.</span>
                </div>
            </div>
        </div>
    );
};

export default About;

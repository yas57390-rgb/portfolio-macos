import React from 'react';
import { FaChevronLeft, FaExternalLinkAlt, FaGithub, FaServer, FaNetworkWired, FaDatabase } from 'react-icons/fa';

const projects = [
    {
        id: 1,
        title: 'Portfolio macOS',
        description: 'Portfolio interactif simulant macOS avec applications fonctionnelles, terminal, finder, et plus.',
        tags: ['React', 'TailwindCSS', 'Vite'],
        icon: FaGithub,
        color: '#007AFF',
        link: 'https://github.com/dinmusic/portfolio-macos'
    },
    {
        id: 2,
        title: 'Infrastructure GLPI',
        description: 'Déploiement complet de GLPI sur stack LAMP avec haute disponibilité et monitoring.',
        tags: ['Linux', 'Apache', 'MySQL', 'PHP'],
        icon: FaServer,
        color: '#34C759',
    },
    {
        id: 3,
        title: 'Réseau Entreprise',
        description: 'Conception et mise en place d\'un réseau complet avec VLAN, routage inter-VLAN et sécurité.',
        tags: ['Cisco', 'VLAN', 'VPN', 'Firewall'],
        icon: FaNetworkWired,
        color: '#FF9500',
    },
    {
        id: 4,
        title: 'Système de Sauvegarde',
        description: 'Solution de sauvegarde automatisée avec externalisation et monitoring temps réel.',
        tags: ['Bash', 'Rsync', 'Cron', 'Zabbix'],
        icon: FaDatabase,
        color: '#FF3B30',
    },
];

const ProjectsApp = ({ onClose, appInfo }) => {
    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Navigation Bar */}
            <div
                className="px-4 py-3 flex items-center border-b border-gray-200/50"
                style={{
                    background: 'rgba(249,250,251,0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                }}
            >
                <button
                    onClick={onClose}
                    className="flex items-center text-blue-500 font-medium active:opacity-50"
                >
                    <FaChevronLeft className="mr-1" size={14} />
                    <span>Retour</span>
                </button>
                <h1 className="flex-1 text-center font-semibold text-gray-900 pr-12">
                    Projets
                </h1>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
                {projects.map((project) => {
                    const IconComponent = project.icon;
                    return (
                        <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            {/* Project Header with gradient */}
                            <div
                                className="h-24 flex items-center px-5"
                                style={{
                                    background: `linear-gradient(135deg, ${project.color}dd, ${project.color}99)`
                                }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                                    <IconComponent className="text-white" size={26} />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                </div>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
                                    >
                                        <FaExternalLinkAlt className="text-white" size={14} />
                                    </a>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectsApp;

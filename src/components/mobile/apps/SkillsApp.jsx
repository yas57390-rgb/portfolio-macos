import React from 'react';
import { FaChevronLeft, FaServer, FaNetworkWired, FaDocker, FaShieldAlt, FaTools } from 'react-icons/fa';

const skills = [
    {
        category: 'Systèmes',
        icon: FaServer,
        color: '#007AFF',
        bgColor: '#E3F2FD',
        items: ['Windows Server', 'Linux Ubuntu', 'Active Directory', 'GPO', 'DHCP', 'DNS']
    },
    {
        category: 'Réseaux',
        icon: FaNetworkWired,
        color: '#34C759',
        bgColor: '#E8F5E9',
        items: ['TCP/IP', 'VLAN', 'VPN', 'Routage', 'Switching', 'Firewall']
    },
    {
        category: 'Virtualisation',
        icon: FaDocker,
        color: '#FF9500',
        bgColor: '#FFF3E0',
        items: ['VMware ESXi', 'Proxmox', 'Docker', 'Hyper-V']
    },
    {
        category: 'Sécurité',
        icon: FaShieldAlt,
        color: '#FF3B30',
        bgColor: '#FFEBEE',
        items: ['OPNsense', 'pfSense', 'Fail2ban', 'SSL/TLS', 'Hardening']
    },
    {
        category: 'Outils',
        icon: FaTools,
        color: '#5856D6',
        bgColor: '#EDE7F6',
        items: ['GLPI', 'Zabbix', 'Git', 'Ansible', 'PowerShell', 'Bash']
    },
];

const SkillsApp = ({ onClose, appInfo }) => {
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
                    Compétences
                </h1>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
                {skills.map((skillGroup, index) => {
                    const IconComponent = skillGroup.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: skillGroup.bgColor }}
                                >
                                    <IconComponent size={18} style={{ color: skillGroup.color }} />
                                </div>
                                <h3 className="ml-3 font-semibold text-gray-900 text-lg">{skillGroup.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-2 rounded-xl text-sm font-medium"
                                        style={{
                                            backgroundColor: skillGroup.bgColor,
                                            color: skillGroup.color
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsApp;

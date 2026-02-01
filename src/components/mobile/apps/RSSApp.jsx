import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaExternalLinkAlt, FaSync } from 'react-icons/fa';

const feeds = [
    {
        id: 1,
        title: 'Actualités Cybersécurité',
        source: 'CERT-FR',
        items: [
            { title: 'Vulnérabilité critique dans OpenSSL', date: '2024-01-15', link: 'https://cert.ssi.gouv.fr' },
            { title: 'Mise à jour de sécurité Windows', date: '2024-01-14', link: 'https://cert.ssi.gouv.fr' },
            { title: 'Alerte phishing bancaire', date: '2024-01-13', link: 'https://cert.ssi.gouv.fr' },
        ]
    },
    {
        id: 2,
        title: 'Tech News',
        source: 'Korben',
        items: [
            { title: 'Les nouveautés de Docker 25', date: '2024-01-15', link: 'https://korben.info' },
            { title: 'Guide complet Proxmox 8', date: '2024-01-12', link: 'https://korben.info' },
            { title: 'Automatisation avec Ansible', date: '2024-01-10', link: 'https://korben.info' },
        ]
    },
    {
        id: 3,
        title: 'Linux & Open Source',
        source: 'LinuxFr',
        items: [
            { title: 'Sortie de Linux 6.7', date: '2024-01-14', link: 'https://linuxfr.org' },
            { title: 'Nouveautés Ubuntu 24.04', date: '2024-01-11', link: 'https://linuxfr.org' },
        ]
    },
];

const RSSApp = ({ onClose }) => {
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    if (selectedFeed) {
        return (
            <div className="h-full bg-white flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 flex items-center border-b border-gray-200 bg-gray-50">
                    <button
                        onClick={() => setSelectedFeed(null)}
                        className="text-blue-500 font-medium flex items-center"
                    >
                        <FaChevronLeft className="mr-1" size={14} />
                        Flux
                    </button>
                    <h1 className="flex-1 text-center font-semibold text-gray-900 pr-8 text-sm truncate">
                        {selectedFeed.title}
                    </h1>
                </div>

                {/* Articles */}
                <div className="flex-1 overflow-y-auto">
                    {selectedFeed.items.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start p-4 border-b border-gray-100 active:bg-gray-50"
                        >
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 text-[15px] leading-snug">{item.title}</h3>
                                <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                            </div>
                            <FaExternalLinkAlt className="text-gray-300 ml-2 mt-1" size={12} />
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-gray-50">
                <button onClick={onClose} className="text-blue-500 font-medium flex items-center">
                    <FaChevronLeft className="mr-1" size={14} />
                    Retour
                </button>
                <h1 className="font-semibold text-gray-900">Flux RSS</h1>
                <button onClick={refresh} className={`text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`}>
                    <FaSync size={16} />
                </button>
            </div>

            {/* Feeds List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {feeds.map((feed) => (
                    <button
                        key={feed.id}
                        onClick={() => setSelectedFeed(feed)}
                        className="w-full bg-white rounded-2xl p-4 text-left shadow-sm active:bg-gray-50"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900">{feed.title}</h3>
                                <p className="text-sm text-gray-500 mt-0.5">{feed.source}</p>
                            </div>
                            <div className="flex items-center">
                                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {feed.items.length}
                                </span>
                                <FaChevronLeft className="text-gray-300 ml-2 rotate-180" size={12} />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RSSApp;

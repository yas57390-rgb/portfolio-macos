import React from 'react';
import { FaChevronLeft, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const ContactApp = ({ onClose, onOpenMaps }) => {

    const handleLocationClick = () => {
        // Close contact and open Maps app centered on Audun-le-Tiche
        if (onOpenMaps) {
            onOpenMaps();
        }
    };

    const contacts = [
        {
            icon: FaEnvelope,
            label: 'Email',
            value: 'contact@ydinar.fr',
            href: 'mailto:contact@ydinar.fr',
            color: '#007AFF'
        },
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            value: 'yassine-dinar',
            href: 'https://linkedin.com/in/yassine-dinar',
            color: '#0A66C2'
        },
        {
            icon: FaGithub,
            label: 'GitHub',
            value: 'Yassinedinar',
            href: 'https://github.com/Yassinedinar',
            color: '#1D1D1F'
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Localisation',
            value: 'Audun-le-Tiche, France',
            color: '#FF3B30',
            onClick: handleLocationClick
        },
    ];

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            {/* Navigation Bar */}
            <div className="bg-gray-100 px-4 py-3 flex items-center border-b border-gray-200">
                <button
                    onClick={onClose}
                    className="flex items-center text-blue-500 font-medium"
                >
                    <FaChevronLeft className="mr-1" />
                    Retour
                </button>
                <h1 className="flex-1 text-center font-semibold text-gray-900 -ml-16">
                    Contact
                </h1>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                    {contacts.map((contact, index) => {
                        const Component = contact.href ? 'a' : 'button';
                        const props = contact.href
                            ? {
                                href: contact.href,
                                target: contact.href.startsWith('http') ? '_blank' : undefined,
                                rel: contact.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                            }
                            : {
                                onClick: contact.onClick
                            };

                        return (
                            <Component
                                key={index}
                                {...props}
                                className={`flex items-center p-4 w-full text-left ${index < contacts.length - 1 ? 'border-b border-gray-100' : ''} active:bg-gray-50`}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${contact.color}15` }}
                                >
                                    <contact.icon style={{ color: contact.color }} />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-500">{contact.label}</p>
                                    <p className="text-gray-900 font-medium">{contact.value}</p>
                                </div>
                                <span className="text-gray-400">›</span>
                            </Component>
                        );
                    })}
                </div>

                {/* Message */}
                <div className="mt-6 text-center text-gray-500 text-sm">
                    <p>N'hésitez pas à me contacter !</p>
                    <p className="mt-1">Je réponds généralement sous 24h.</p>
                </div>
            </div>
        </div>
    );
};

export default ContactApp;

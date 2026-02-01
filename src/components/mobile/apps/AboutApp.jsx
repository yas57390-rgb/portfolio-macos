import React from 'react';
import { FaChevronLeft, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';

const AboutApp = ({ onClose, appInfo }) => {
    return (
        <div className="h-full bg-gray-50 flex flex-col">
            {/* Navigation Bar - iOS Style */}
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
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Profile Header - Large style */}
                <div className="bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-10 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-5xl shadow-lg border-4 border-white/30">
                        👨‍💻
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-4">Yassine Dinar</h2>
                    <p className="text-white/80 text-lg mt-1">Technicien Systèmes & Réseaux</p>

                    <div className="flex items-center mt-3 text-white/70">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>Thionville, France</span>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="p-4 space-y-4 -mt-4">
                    {/* Current Position */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                                <FaBriefcase className="text-blue-600" size={18} />
                            </div>
                            <div className="ml-3">
                                <h3 className="font-semibold text-gray-900">Poste actuel</h3>
                                <p className="text-sm text-gray-500">Alternance</p>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Technicien Systèmes & Réseaux chez <span className="font-semibold text-blue-600">SIE</span> (Système Informatique Evolutif)
                        </p>
                    </div>

                    {/* Education */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                                <FaGraduationCap className="text-green-600" size={18} />
                            </div>
                            <div className="ml-3">
                                <h3 className="font-semibold text-gray-900">Formation</h3>
                                <p className="text-sm text-gray-500">En cours</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            BTS SIO option SISR à <span className="font-semibold text-green-600">MEWO</span>, Metz
                        </p>
                    </div>

                    {/* Passions */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                                <FaCode className="text-purple-600" size={18} />
                            </div>
                            <div className="ml-3">
                                <h3 className="font-semibold text-gray-900">Passions</h3>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Cybersécurité', 'Linux', 'Automatisation', 'Réseaux', 'DevOps'].map((passion, i) => (
                                <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                    {passion}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">À propos</h3>
                        <p className="text-gray-600 leading-relaxed text-[15px]">
                            Passionné par l'informatique depuis toujours, je me spécialise dans
                            l'administration système, les réseaux et la cybersécurité.
                            J'aime résoudre des problèmes complexes et automatiser les tâches répétitives.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutApp;

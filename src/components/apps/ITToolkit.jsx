
import React, { useState, useMemo } from 'react';
import { FaSearch, FaThLarge, FaList, FaDownload, FaExternalLinkAlt, FaTools, FaServer, FaShieldAlt, FaNetworkWired, FaDatabase, FaCode, FaHdd, FaDesktop, FaStar, FaTimes, FaCheckCircle, FaInfoCircle, FaWindows } from 'react-icons/fa';
import { SiCisco, SiDebian, SiDocker, SiLinux, SiWireshark, SiPython, SiKubernetes } from 'react-icons/si';
import { IT_TOOLKIT_CATEGORIES, IT_TOOLS } from '../../data/itToolkitData.jsx';
import LogoLoop from '../ui/LogoLoop';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../contexts/OSContext';

const ITToolkit = () => {
    const { windowStyle } = useOS();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [activeBrandFilter, setActiveBrandFilter] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);

    // Logos for the top loop
    const brandLogos = [
        { node: <SiCisco />, title: "Cisco", key: "cisco" },
        { node: <SiDebian />, title: "Debian", key: "debian" },
        { node: <SiDocker />, title: "Docker", key: "docker" },
        { node: <FaWindows />, title: "Microsoft", key: "microsoft" },
        { node: <SiLinux />, title: "Linux", key: "linux" },
        { node: <SiWireshark />, title: "Wireshark", key: "wireshark" },
        { node: <SiPython />, title: "Python", key: "python" },
        { node: <SiKubernetes />, title: "Kubernetes", key: "kubernetes" },
    ];

    // Dynamic Style Generator
    const getContainerStyle = () => {
        const base = "w-full h-full flex flex-col overflow-hidden text-slate-100 font-sans rounded-lg transition-all duration-300";

        switch (windowStyle) {
            case 'transparent':
                // Very transparent container (Edges) - Minimal tint
                return `${base} bg-slate-900/10 backdrop-blur-none border border-white/5 ring-1 ring-white/5`;
            case 'solid':
                return `${base} bg-slate-900 border border-white/10 ring-1 ring-white/5`;
            case 'glass':
            default:
                // Original style
                return `${base} bg-slate-900/50 backdrop-blur-2xl shadow-2xl border border-white/10 ring-1 ring-white/5`;
        }
    };

    // Filter Logic
    const filteredTools = useMemo(() => {
        let tools = IT_TOOLS;

        // Category Filter
        if (activeCategory === 'top-charts') {
            tools = tools.filter(t => t.tags?.includes('Network') || t.tags?.includes('Security'));
        } else if (activeCategory === 'collections') {
            tools = tools.filter(t => t.category === 'security');
        } else if (activeCategory !== 'all') {
            tools = tools.filter(t => t.category === activeCategory);
        }

        // Brand Filter
        if (activeBrandFilter) {
            const filterKey = activeBrandFilter.toLowerCase();
            tools = tools.filter(t =>
                t.name.toLowerCase().includes(filterKey) ||
                t.tags?.some(tag => tag.toLowerCase().includes(filterKey)) ||
                t.description.toLowerCase().includes(filterKey)
            );
        }

        // Search Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            tools = tools.filter(t =>
                t.name.toLowerCase().includes(lowerQuery) ||
                t.description.toLowerCase().includes(lowerQuery) ||
                t.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }

        return tools;
    }, [activeCategory, searchQuery, activeBrandFilter]);

    const getCategoryIcon = (catId) => {
        const cat = IT_TOOLKIT_CATEGORIES.find(c => c.id === catId);
        return cat ? cat.icon : '📁';
    };

    const handleLogoClick = (item) => {
        if (activeBrandFilter === item.title) {
            setActiveBrandFilter(null);
        } else {
            setActiveBrandFilter(item.title);
        }
    };

    return (
        // Main Wrapper: Dark background to contrast with Glass Border
        <div className="w-full h-full flex flex-col overflow-hidden text-slate-100 font-sans rounded-lg bg-slate-900 shadow-inner">

            {/* Header */}
            <div className="bg-slate-900/50 border-b border-white/5 pt-4 pb-2 z-20 shadow-sm relative">
                <div className="px-6 mb-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">IT App Store</h1>
                    {activeBrandFilter && (
                        <button
                            onClick={() => setActiveBrandFilter(null)}
                            className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded-full flex items-center hover:bg-blue-500/30 transition-colors"
                        >
                            Filtered by: {activeBrandFilter} <FaTimes className="ml-1" />
                        </button>
                    )}
                </div>
                <div className="h-12 overflow-hidden relative text-slate-400 opacity-80 mix-blend-screen">
                    <LogoLoop
                        logos={brandLogos}
                        speed={30}
                        direction="left"
                        logoHeight={32}
                        gap={60}
                        pauseOnHover={true}
                        onLogoClick={handleLogoClick}
                        className="grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                </div>
            </div>

            {/* Content Wrapper (Sidebar + Grid) */}
            {/* In Transparent mode, this wrapper becomes opaque (90%) to provide readability */}
            {/* In Glass mode, it remains transparent to let the container's blur show through */}
            <div className={`flex-1 flex overflow-hidden ${windowStyle === 'transparent' ? 'bg-slate-900/90' : ''
                }`}>
                {/* Sidebar - Fully transparent to show parent bg */}
                <div className="w-64 bg-transparent border-r border-white/5 flex flex-col py-6 overflow-y-auto hidden sm:flex relative z-10">

                    {/* Special Sections */}
                    <div className="px-4 mb-6">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 shadow-black drop-shadow-md">Discover</div>
                        <ul className="space-y-1">
                            <SidebarItem
                                icon={<FaStar className="text-yellow-400 drop-shadow-sm" />}
                                label="Top Charts"
                                active={activeCategory === 'top-charts'}
                                onClick={() => setActiveCategory('top-charts')}
                            />
                            <SidebarItem
                                icon={<FaList className="text-purple-400 drop-shadow-sm" />}
                                label="Collections"
                                active={activeCategory === 'collections'}
                                onClick={() => setActiveCategory('collections')}
                            />
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="px-4">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 shadow-black drop-shadow-md">Categories</div>
                        <ul className="space-y-1">
                            <SidebarItem
                                icon="🛠️"
                                label="All Apps"
                                active={activeCategory === 'all'}
                                onClick={() => setActiveCategory('all')}
                            />
                            {IT_TOOLKIT_CATEGORIES.map(cat => (
                                <SidebarItem
                                    key={cat.id}
                                    icon={cat.icon}
                                    label={cat.name}
                                    active={activeCategory === cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content Grid - Darker background for focus and readability */}
                {/* Always apply a tint to distinguish from sidebar, but let parent/container handle main opacity */}
                <div className="flex-1 flex flex-col bg-slate-900/50 min-w-0 overflow-hidden relative shadow-[-10px_0_20px_rgba(0,0,0,0.3)]">
                    {/* Subtle Gradient Overlay/Glow for depth */}
                    <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>


                    {/* Search Toolbar */}
                    <div className="h-14 flex items-center px-6 justify-between shrink-0 sticky top-0 z-10 border-b border-white/5 bg-slate-900/40 backdrop-blur-md">
                        <div className="relative w-full max-w-sm group">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search apps..."
                                className="w-full bg-black/20 border border-white/5 focus:bg-black/40 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-600 transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="text-sm text-slate-500 hidden sm:block">
                            {filteredTools.length} results
                        </div>
                    </div>

                    {/* App Grid */}
                    <div className="flex-1 overflow-y-auto p-6 z-0">
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            <AnimatePresence>
                                {filteredTools.map(tool => (
                                    <AppCard
                                        key={tool.id}
                                        tool={tool}
                                        categoryIcon={getCategoryIcon(tool.category)}
                                        onOpen={() => setSelectedApp(tool)}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                        {filteredTools.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                <span className="text-4xl mb-2 opacity-50">🔍</span>
                                <p>No apps found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedApp && (
                    <ProductModal
                        tool={selectedApp}
                        onClose={() => setSelectedApp(null)}
                        categoryIcon={getCategoryIcon(selectedApp.category)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Sub-components

const SidebarItem = ({ icon, label, active, onClick }) => (
    <li
        className={`px - 3 py - 2 rounded - lg flex items - center space - x - 3 cursor - pointer transition - all duration - 200 ${active
            ? 'bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500/50'
            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            } `}
        onClick={onClick}
    >
        <span className="text-lg flex-shrink-0 opacity-90">{icon}</span>
        <span className="font-medium truncate text-sm">{label}</span>
    </li>
);

const AppCard = ({ tool, categoryIcon, onOpen }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-white/5 rounded-2xl p-4 border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden backdrop-blur-sm"
        onClick={onOpen}
    >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300 pointer-events-none" />

        <div className="flex items-start justify-between mb-4 relative z-10">
            {/* Icon with Inner Shadow and Gradient for Thickness */}
            <div className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)] border border-white/10 group-hover:scale-105 transition-transform duration-300 text-slate-200 relative overflow-hidden">
                {/* Subtle gloss overlay */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                {tool.icon || categoryIcon}
            </div>
            <div className="flex flex-col items-end">
                <span className={`text - [10px] uppercase font - bold px - 2 py - 0.5 rounded - full border ${tool.license === 'Free' || tool.license === 'Open Source'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    } `}>
                    {/* {tool.license === 'Open Source' ? 'OSS' : 'GET'} - Simplified to just GET for cleaner look or License Type */}
                    {tool.license === 'Open Source' ? 'OSS' : 'GET'}
                </span>
            </div>
        </div>

        <div className="mb-1 relative z-10">
            <h3 className="font-bold text-slate-100 leading-tight group-hover:text-blue-400 transition-colors">{tool.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{tool.category}</p>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-1 relative z-10">
            {tool.description}
        </p>

        {/* View Details - Hidden by default, visible on hover */}
        <button className="w-full bg-white/10 text-blue-400 border border-white/5 font-bold text-xs py-1.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 relative z-10 translate-y-2 group-hover:translate-y-0">
            VIEW DETAILS
        </button>
    </motion.div>
);

const ProductModal = ({ tool, onClose, categoryIcon }) => (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        />
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="bg-[#1a1a1a] w-full max-w-2xl max-h-[90%] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col border border-white/10"
        >
            {/* Modal Header / Banner */}
            <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
                <div className="absolute inset-0 bg-blue-500/5"></div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white/50 hover:text-white p-1.5 rounded-full transition-colors backdrop-blur-md border border-white/5"
                >
                    <FaTimes />
                </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8 -mt-12 flex flex-col flex-1 overflow-y-auto">
                <div className="flex justify-between items-end mb-6 relative">
                    <div className="w-24 h-24 rounded-[1.5rem] bg-slate-800 shadow-2xl flex items-center justify-center text-4xl border-4 border-[#1a1a1a] text-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                        {tool.icon || categoryIcon}
                    </div>
                    <div className="flex space-x-3 mb-2">
                        <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30 hover:bg-blue-500 hover:scale-105 transition-all flex items-center"
                        >
                            GET <FaDownload className="ml-2 text-xs opacity-70" />
                        </a>
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-1">{tool.name}</h2>
                    <p className="text-slate-400 font-medium mb-6 flex items-center space-x-2">
                        <span>{tool.category}</span>
                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                        <span>{tool.license}</span>
                    </p>

                    {/* BTS SIO Competency Special Section */}
                    {tool.sioCompetency && (
                        <div className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                            <FaStar className="text-amber-500 text-xl mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-amber-500 font-bold uppercase text-xs tracking-wider mb-1">Compétence BTS SIO</h4>
                                <p className="text-amber-200/90 text-sm leading-relaxed">
                                    {tool.sioCompetency}
                                </p>
                            </div>
                        </div>
                    )}


                    <div className="h-px bg-white/10 w-full mb-6" />

                    <div className="prose prose-sm max-w-none text-slate-300 mb-8 prose-invert">
                        <p className="text-base leading-relaxed">{tool.description}</p>
                        <p className="text-slate-400">
                            Professional grade tool widely used in the industry. Essential for {tool.category} tasks.
                            Compatible with major operating systems matching standard enterprise requirements.
                        </p>
                    </div>


                    {/* Associated Project / "Maillage" */}
                    <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 flex items-start space-x-3 hover:bg-blue-900/20 transition-colors cursor-pointer group">
                        <div className="text-blue-400 mt-1 text-xl"><FaInfoCircle /></div>
                        <div>
                            <h4 className="font-bold text-blue-300 group-hover:text-blue-200 transaction-colors">Associated Project Procedure</h4>
                            <p className="text-sm text-blue-400/60 group-hover:text-blue-400/80">
                                Learn how I integrated {tool.name} in a production environment (See Finder / Projects).
                            </p>
                        </div>
                        <FaExternalLinkAlt className="ml-auto text-blue-500/50 group-hover:text-blue-400 mt-1" />
                    </div>

                    {/* Screenshots / Preview Grid */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="aspect-video bg-white/5 rounded-lg border border-white/5" />
                        <div className="aspect-video bg-white/5 rounded-lg border border-white/5" />
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
);

export default ITToolkit;

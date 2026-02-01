import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { FaClock, FaDesktop, FaDownload, FaFile, FaFilePdf, FaFolder, FaHome, FaImage, FaMusic, FaSearch, FaCircle, FaChevronLeft, FaChevronRight, FaList, FaTh } from 'react-icons/fa';
import { useFileSystem } from '../../contexts/FileSystemContext';
import { useOS } from '../../contexts/OSContext';

const Finder = () => {
    const { files, moveFileToTrash, addToRecent, getRecentFiles } = useFileSystem();
    const { openWindow } = useOS();

    // Container ref for measuring width
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(800);

    // Responsive breakpoints
    const sidebarMode = containerWidth < 400 ? 'hidden' : containerWidth < 550 ? 'icons' : 'full';
    const showSearch = containerWidth >= 350;
    const showViewToggle = containerWidth >= 300;

    // ResizeObserver to track container size
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(container);
        setContainerWidth(container.offsetWidth);

        return () => resizeObserver.disconnect();
    }, []);

    // Navigation State
    const [currentPath, setCurrentPath] = useState(['Desktop']); // Stack of folder IDs
    const [history, setHistory] = useState([]); // Forward/Back history not fully impl, just simple back for now
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [contextMenu, setContextMenu] = useState(null);
    const [viewMode, setViewMode] = useState('icons'); // 'icons' or 'list'
    const [showRecent, setShowRecent] = useState(false); // Special view for recent files

    const activeFolderId = currentPath[currentPath.length - 1];

    // Sidebar Shortcuts Mapping
    const sidebarShortcuts = {
        'Desktop': 'Desktop',
        'Documents': 'folder-docs',
        'Pictures': 'folder-photos',
        'Yassine': 'Desktop', // Home
        // Add others if they exist in file system
    };

    // Context Menu Handler
    const handleContextMenu = (e, fileId) => {
        e.preventDefault();
        setContextMenu({
            x: e.pageX,
            y: e.pageY,
            fileId
        });
    };

    const closeContextMenu = () => setContextMenu(null);

    // Global click listener to close context menu
    useEffect(() => {
        const handleClick = () => closeContextMenu();
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Side bar items
    const sidebarItems = [
        { name: 'Recent', icon: <FaClock />, id: 'Recent', isRecent: true },
        { name: 'Desktop', icon: <FaDesktop />, id: 'Desktop' },
        { name: 'Documents', icon: <FaFile />, id: 'folder-docs' },
        { name: 'Downloads', icon: <FaDownload />, id: 'Downloads' }, // Not created yet
        { name: 'Pictures', icon: <FaImage />, id: 'folder-photos' },
        { name: 'Music', icon: <FaMusic />, id: 'Music' }, // Not created yet
        { name: 'Yassine', icon: <FaHome />, id: 'Desktop' },
    ];

    const handleSidebarClick = (item) => {
        if (item.isRecent) {
            setShowRecent(true);
            setCurrentPath(['Recent']);
        } else if (item.id) {
            setShowRecent(false);
            setCurrentPath([item.id]);
        }
    };

    const handleNavigate = (folderId) => {
        setCurrentPath([...currentPath, folderId]);
    };

    const handleBack = () => {
        if (currentPath.length > 1) {
            setCurrentPath(currentPath.slice(0, -1));
        }
    };

    // Sorting Helper
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter and Sort Logic
    const processedFiles = useMemo(() => {
        let workableFiles = files;

        // Recent Files View - show last opened files
        if (showRecent) {
            workableFiles = getRecentFiles();
        } else {
            // Parent/Location Filter
            // We filter by valid parentId matches activeFolderId
            // Also include items whose 'location' matches activeFolderId (legacy support)
            workableFiles = workableFiles.filter(f => f.parentId === activeFolderId || f.location === activeFolderId);

            // Tag Filter
            if (selectedTag) {
                workableFiles = workableFiles.filter(f => f.tags && f.tags.includes(selectedTag));
            }
        }

        // Search Filter
        if (searchQuery) {
            // If searching, maybe search ALL files? 
            // MacOS finder searches current folder by default usually, but let's keep it simple
            workableFiles = files.filter(file =>
                file.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sortConfig.key) {
            return [...workableFiles].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'size') {
                    const parseSize = (s) => {
                        if (!s || s === '--') return 0;
                        if (s.includes('KB')) return parseFloat(s) * 1024;
                        if (s.includes('MB')) return parseFloat(s) * 1024 * 1024;
                        return parseFloat(s);
                    };
                    aValue = parseSize(a.size);
                    bValue = parseSize(b.size);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return workableFiles;
    }, [files, searchQuery, sortConfig, activeFolderId, selectedTag, showRecent, getRecentFiles]);

    const getColorClass = (color) => {
        const map = {
            red: 'text-red-500', orange: 'text-orange-500', yellow: 'text-yellow-500',
            green: 'text-green-500', blue: 'text-blue-500', purple: 'text-purple-500', gray: 'text-gray-500'
        };
        return map[color] || 'text-gray-400';
    };

    // Identify current folder name for header
    const currentFolderFile = files.find(f => f.id === activeFolderId);
    const currentFolderName = currentFolderFile ? currentFolderFile.name : activeFolderId;

    return (
        <div ref={containerRef} className="w-full h-full flex flex-row bg-transparent rounded-b-xl overflow-hidden text-sm animate-fade-in relative text-slate-200" onClick={closeContextMenu}>

            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="absolute z-50 bg-slate-800/90 backdrop-blur-md border border-white/10 shadow-xl rounded-lg py-1 w-48 text-slate-200"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button
                        className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white text-sm transition-colors"
                        onClick={() => moveFileToTrash(contextMenu.fileId)}
                    >
                        Move to Trash
                    </button>
                    <div className="border-t border-white/10 my-1"></div>
                    <button className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white text-sm transition-colors">
                        Get Info
                    </button>
                    <button className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white text-sm transition-colors">
                        Quick Look
                    </button>
                </div>
            )}

            {/* Sidebar - Responsive */}
            {sidebarMode !== 'hidden' && (
                <div className={`${sidebarMode === 'icons' ? 'w-14' : 'w-48'} flex-shrink-0 bg-slate-900/40 backdrop-blur-md border-r border-white/5 flex flex-col pt-4 pb-4 transition-all duration-200`}>
                    {sidebarMode === 'full' && (
                        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Favorites</div>
                    )}
                    <ul className="space-y-1">
                        {sidebarItems.map(item => (
                            <li
                                key={item.name}
                                className={`${sidebarMode === 'icons' ? 'px-2 justify-center' : 'px-4'} py-1.5 flex items-center ${sidebarMode === 'full' ? 'space-x-2' : ''} cursor-pointer transition-colors ${activeFolderId === item.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                                onClick={() => handleSidebarClick(item)}
                                title={sidebarMode === 'icons' ? item.name : undefined}
                            >
                                <span className="text-blue-400 text-lg">{item.icon}</span>
                                {sidebarMode === 'full' && <span>{item.name}</span>}
                            </li>
                        ))}
                    </ul>
                    {/* Tags */}
                    {sidebarMode === 'full' && (
                        <>
                            <div className="mt-4 px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags</div>
                            <div className="px-4 flex flex-wrap gap-2">
                                {['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'].map(color => (
                                    <FaCircle
                                        key={color}
                                        className={`text-xs ${getColorClass(color)} cursor-pointer transition-opacity ${selectedTag === color ? 'ring-2 ring-offset-1 ring-offset-slate-800 ring-slate-400 opacity-100' : 'opacity-70 hover:opacity-100'}`}
                                        onClick={() => setSelectedTag(prev => prev === color ? null : color)}
                                        title={`Filter by ${color}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {sidebarMode === 'icons' && (
                        <div className="mt-4 px-2 flex flex-wrap justify-center gap-1">
                            {['red', 'orange', 'green', 'blue'].map(color => (
                                <FaCircle
                                    key={color}
                                    className={`text-[8px] ${getColorClass(color)} cursor-pointer transition-opacity ${selectedTag === color ? 'ring-1 ring-offset-1 ring-offset-slate-800 ring-slate-400 opacity-100' : 'opacity-70 hover:opacity-100'}`}
                                    onClick={() => setSelectedTag(prev => prev === color ? null : color)}
                                    title={`Filter by ${color}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-transparent">
                {/* Toolbar - Responsive */}
                <div className="h-12 border-b border-white/5 flex items-center px-3 justify-between bg-transparent text-slate-300">
                    <div className="flex items-center space-x-2 min-w-0">
                        <div className="flex space-x-1 flex-shrink-0">
                            <button
                                onClick={handleBack}
                                disabled={currentPath.length <= 1}
                                className={`p-1.5 rounded ${currentPath.length <= 1 ? 'text-slate-600 cursor-default' : 'hover:bg-white/10 text-slate-500 hover:text-slate-300'}`}
                            >
                                <FaChevronLeft />
                            </button>
                            <button className="hover:bg-white/10 p-1.5 rounded text-slate-600 hover:text-slate-500 cursor-default"><FaChevronRight /></button>
                        </div>
                        <span className="font-semibold text-slate-100 truncate" title={currentFolderName}>{currentFolderName}</span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        {/* View Mode Toggle */}
                        {showViewToggle && (
                            <div className="flex bg-black/20 rounded-lg p-0.5">
                                <button
                                    onClick={() => setViewMode('icons')}
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'icons' ? 'bg-blue-500/80 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                    title="Icon view"
                                >
                                    <FaTh className="text-sm" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-blue-500/80 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                    title="List view"
                                >
                                    <FaList className="text-sm" />
                                </button>
                            </div>
                        )}
                        {/* Search */}
                        {showSearch ? (
                            <div className="relative">
                                <FaSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-500 text-xs" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-black/20 border border-white/5 rounded-lg pl-8 pr-2 py-1 text-sm focus:outline-none focus:bg-black/40 focus:border-blue-500/50 w-28 transition-all text-slate-200 placeholder-slate-600"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        ) : (
                            <button
                                className="p-1.5 rounded hover:bg-white/10 text-slate-500 hover:text-slate-300"
                                title="Search"
                            >
                                <FaSearch className="text-sm" />
                            </button>
                        )}
                    </div>
                </div>

                {/* File Content Area */}
                <div className="flex-1 overflow-y-auto p-4">
                    {processedFiles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                            <span className="text-4xl mb-2">{showRecent ? '🕐' : '📁'}</span>
                            <span>{showRecent ? 'No Recent Files' : 'Empty Folder'}</span>
                        </div>
                    ) : viewMode === 'icons' ? (
                        /* Icon View - Flexbox wrap like macOS */
                        <div className="flex flex-wrap content-start gap-4">
                            {processedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex flex-col items-center w-24 p-2 rounded-lg cursor-default hover:bg-white/10 transition-all group select-none"
                                    onContextMenu={(e) => handleContextMenu(e, file.id)}
                                    onDoubleClick={() => {
                                        if (file.type === 'folder') {
                                            handleNavigate(file.id);
                                            setShowRecent(false);
                                        } else if (file.name.endsWith('.pdf')) {
                                            addToRecent(file.id);
                                            openWindow({ id: 'pdf-viewer', title: file.name, file: file });
                                        } else if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
                                            addToRecent(file.id);
                                            openWindow({ id: 'image-viewer', title: file.name, file: file, icon: 'image' });
                                        } else if (file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.js') || file.name.endsWith('.jsx') || file.name.endsWith('.css') || file.name.endsWith('.json')) {
                                            addToRecent(file.id);
                                            openWindow({ id: 'vscode', title: file.name, file: file });
                                        } else {
                                            addToRecent(file.id);
                                            console.log("Open", file.name);
                                        }
                                    }}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData("fileId", file.id);
                                        e.dataTransfer.effectAllowed = "move";
                                    }}
                                >
                                    {/* Large Icon */}
                                    <div className={`text-6xl mb-2 transition-transform group-hover:scale-105 
                                        ${file.type === 'folder' ? 'text-blue-400' :
                                            file.name.endsWith('.pdf') ? 'text-red-400' :
                                                (file.name.endsWith('.png') || file.name.endsWith('.jpg')) ? 'text-purple-400' : 'text-blue-400'}`}
                                    >
                                        {file.type === 'folder' ? <FaFolder /> :
                                            file.name.endsWith('.pdf') ? <FaFilePdf /> :
                                                (file.name.endsWith('.png') || file.name.endsWith('.jpg')) ? <FaImage /> : <FaFile />}
                                    </div>
                                    {/* File Name - 2 lines max with ellipsis */}
                                    <span
                                        className="text-xs text-center text-slate-300 group-hover:text-white leading-tight w-full break-words line-clamp-2"
                                        title={file.name}
                                    >
                                        {file.name}
                                    </span>
                                    {/* Tags */}
                                    {file.tags && file.tags.length > 0 && (
                                        <div className="flex space-x-1 mt-1">
                                            {file.tags.map((tag, i) => (
                                                <FaCircle key={i} className={`text-[6px] ${getColorClass(tag)}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <table className="w-full text-left border-collapse select-none">
                            <thead>
                                <tr className="text-slate-500 text-xs border-b border-white/5 sticky top-0 bg-slate-900/20 backdrop-blur-sm z-10">
                                    {['Name', 'Date', 'Size', 'Kind'].map(header => (
                                        <th
                                            key={header}
                                            className={`pl-6 py-2 font-medium cursor-pointer hover:bg-white/5 transition-colors ${header === 'Name' ? 'w-1/2' : ''}`}
                                            onClick={() => requestSort(header.toLowerCase())}
                                        >
                                            <div className="flex items-center">
                                                {header}
                                                {sortConfig.key === header.toLowerCase() && (
                                                    <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {processedFiles.map((file) => (
                                    <tr
                                        key={file.id}
                                        className="even:bg-white/5 hover:bg-blue-600/40 hover:text-white group cursor-default text-xs sm:text-sm transition-colors border-b border-transparent hover:border-blue-500/20"
                                        onContextMenu={(e) => handleContextMenu(e, file.id)}
                                        onDoubleClick={() => {
                                            if (file.type === 'folder') {
                                                handleNavigate(file.id);
                                                setShowRecent(false);
                                            } else if (file.name.endsWith('.pdf')) {
                                                addToRecent(file.id);
                                                openWindow({ id: 'pdf-viewer', title: file.name, file: file });
                                            } else if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
                                                addToRecent(file.id);
                                                openWindow({ id: 'image-viewer', title: file.name, file: file, icon: 'image' });
                                            } else if (file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.js') || file.name.endsWith('.jsx') || file.name.endsWith('.css') || file.name.endsWith('.json')) {
                                                addToRecent(file.id);
                                                openWindow({ id: 'vscode', title: file.name, file: file });
                                            } else {
                                                addToRecent(file.id);
                                                console.log("Open", file.name);
                                            }
                                        }}
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("fileId", file.id);
                                            e.dataTransfer.effectAllowed = "move";
                                        }}
                                    >
                                        <td className="pl-6 py-2 flex items-center space-x-2">
                                            <span className={`text-lg transition-colors group-hover:text-white 
                                                ${file.type === 'folder' ? 'text-blue-400' :
                                                    file.name.endsWith('.pdf') ? 'text-red-400' :
                                                        (file.name.endsWith('.png') || file.name.endsWith('.jpg')) ? 'text-purple-400' : 'text-blue-400'}`}>
                                                {file.type === 'folder' ? <FaFolder /> :
                                                    file.name.endsWith('.pdf') ? <FaFilePdf /> :
                                                        (file.name.endsWith('.png') || file.name.endsWith('.jpg')) ? <FaImage /> : <FaFile />}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{file.name}</span>
                                            </div>
                                            {/* Tags Display */}
                                            <div className="flex space-x-1 ml-2">
                                                {file.tags && file.tags.map((tag, i) => (
                                                    <FaCircle key={i} className={`text-[8px] ${getColorClass(tag)}`} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-2 opacity-60">{file.date}</td>
                                        <td className="py-2 opacity-60">{file.size}</td>
                                        <td className="py-2 opacity-60">{file.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Status Bar */}
                <div className="h-6 border-t border-white/5 px-4 flex items-center justify-between text-xs text-slate-500 bg-transparent">
                    <span>{processedFiles.length} items</span>
                    <span>420 GB available</span>
                </div>
            </div>
        </div>
    );
};

export default Finder;

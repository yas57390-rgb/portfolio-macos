import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaDesktop, FaTerminal, FaCog, FaTrash, FaAddressBook, FaFile, FaFilePdf, FaImage, FaYoutube, FaCalculator, FaStickyNote, FaGamepad } from 'react-icons/fa';
import { useOS } from '../../contexts/OSContext';
import { useFileSystem } from '../../contexts/FileSystemContext';

const Spotlight = () => {
    const { openWindow } = useOS();
    const { files } = useFileSystem();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    // Apps Definition
    const apps = [
        { id: 'finder', title: 'Finder', icon: <FaDesktop />, type: 'app' },
        { id: 'terminal', title: 'Terminal', icon: <FaTerminal />, type: 'app' },
        { id: 'settings', title: 'Settings', icon: <FaCog />, type: 'app' },
        { id: 'contact', title: 'Contact', icon: <FaAddressBook />, type: 'app' },
        { id: 'game-center', title: 'Game Center', icon: <FaGamepad />, type: 'app' },
        { id: 'calculator', title: 'Calculator', icon: <FaCalculator />, type: 'app' },
        { id: 'notes', title: 'Notes', icon: <FaStickyNote />, type: 'app' },
        { id: 'trash', title: 'Trash', icon: <FaTrash />, type: 'app' },
    ];

    // Toggle logic
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleToggle = () => setIsOpen(prev => !prev);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('toggle-spotlight', handleToggle);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('toggle-spotlight', handleToggle);
        };
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery('');
        }
    }, [isOpen]);

    // Search Logic
    // Search Logic
    const results = [];

    // 1. Math Calculation
    try {
        // Simple safe check: only allow numbers and math operators
        if (/^[0-9+\-*/().\s]+$/.test(query) && /\d/.test(query)) {
            // eslint-disable-next-line no-new-func
            const result = new Function('return ' + query)();
            if (isFinite(result)) {
                results.push({
                    id: 'calc-result',
                    title: `= ${result}`,
                    name: query,
                    icon: <FaCalculator />,
                    type: 'calculation', // Special type
                    location: 'Calculator'
                });
            }
        }
    } catch (e) {
        // Ignore math errors (incomplete expression)
    }

    // 2. Apps & Files
    if (query.trim() !== '') {
        results.push(
            ...apps.filter(app => app.title.toLowerCase().includes(query.toLowerCase())),
            ...files.filter(file => file.name.toLowerCase().includes(query.toLowerCase())).map(f => ({ ...f, type: 'file' }))
        );
    }

    // Limit results
    const finalResults = results.slice(0, 8);

    // Keyboard Navigation
    useEffect(() => {
        const handleNav = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (results.length > 0) {
                    handleSelect(results[selectedIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleNav);
        return () => window.removeEventListener('keydown', handleNav);
    }, [isOpen, results, selectedIndex]);

    const handleSelect = (item) => {
        if (item.type === 'app') {
            openWindow(item);
        } else if (item.type === 'file') {
            if (item.name.endsWith('.pdf')) {
                // Future PDF Preview
                openWindow({ id: 'pdf-viewer', title: item.name, file: item });
            } else {
                // For now open Finder
                openWindow({ id: 'finder', title: 'Finder' });
            }
        } else if (item.type === 'calculation') {
            // Copy result to clipboard
            navigator.clipboard.writeText(item.title.replace('= ', ''));
            setIsOpen(false);
            // Optional: Show a toast or feedback (we're closing anyway)
        }
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div
                className="w-[600px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col transition-all duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="h-16 flex items-center px-4 border-b border-gray-400/20">
                    <FaSearch className="text-gray-500 text-xl mr-4" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Spotlight Search"
                        className="bg-transparent w-full text-2xl outline-none text-gray-800 dark:text-white placeholder-gray-500 font-light"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                    />
                </div>

                {finalResults.length > 0 && (
                    <div className="py-2 bg-white/50 dark:bg-gray-900/50">
                        {finalResults.map((item, index) => (
                            <div
                                key={item.id || item.name}
                                className={`px-4 py-2 flex items-center cursor-pointer ${index === selectedIndex ? 'bg-blue-500 text-white' : 'hover:bg-blue-500/10 dark:text-gray-200'}`}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="mr-3 text-lg opacity-80">
                                    {item.icon ? item.icon : (item.name.endsWith('.pdf') ? <FaFilePdf /> : <FaFile />)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{item.title || item.name}</span>
                                    {item.type === 'file' && <span className="text-xs opacity-60 text-current">{item.location} • {item.type}</span>}
                                    {item.type === 'app' && <span className="text-xs opacity-60 text-current">Application</span>}
                                    {item.type === 'calculation' && <span className="text-xs opacity-60 text-current">Calculation • Copy to Clipboard</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spotlight;

import React, { useState, useEffect } from 'react';

const Notes = () => {
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem('macos-notes');
        if (savedNote) {
            setNote(savedNote);
        } else {
            // Level 4: CTF Hint
            setNote("Rappel Admin :\n\nIP Server de prod : 192.168.1.10\nUser : admin\nPass : Admin123!\n\n(IMPORTANT : Penser à changer le mot de passe rapidement !! La faille humaine est la plus courante...)");
        }
    }, []);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setNote(newValue);
        localStorage.setItem('macos-notes', newValue);
    };

    return (
        <div className="h-full w-full bg-yellow-100 flex flex-col text-gray-800">
            {/* Toolbar */}
            <div className="h-10 bg-yellow-200 border-b border-yellow-300 flex items-center px-4">
                <span className="text-xs font-semibold text-yellow-800 opacity-60 uppercase tracking-wider">
                    Auto-saved
                </span>
            </div>

            {/* Editor */}
            <textarea
                className="flex-1 bg-transparent p-6 text-lg outline-none resize-none font-medium leading-relaxed placeholder-yellow-800/30"
                value={note}
                onChange={handleChange}
                placeholder="Type your notes here..."
                autoFocus
                spellCheck={false}
            />
        </div>
    );
};

export default Notes;

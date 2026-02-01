import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaPlus, FaTrash } from 'react-icons/fa';

const STORAGE_KEY = 'ios-notes';

const defaultNotes = [
    { id: 1, title: 'Bienvenue !', content: 'Bienvenue sur l\'app Notes du portfolio iOS. Vous pouvez créer et éditer des notes ici.', date: 'Aujourd\'hui' },
    { id: 2, title: 'Compétences clés', content: '• Administration système\n• Réseaux & sécurité\n• Virtualisation\n• Scripting Bash/PowerShell', date: 'Hier' },
];

const NotesApp = ({ onClose }) => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return defaultNotes;
            }
        }
        return defaultNotes;
    });
    const [selectedNote, setSelectedNote] = useState(null);
    const [editContent, setEditContent] = useState('');

    // Save to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'Nouvelle note',
            content: '',
            date: new Date().toLocaleDateString('fr-FR')
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
        setEditContent('');
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
        setSelectedNote(null);
    };

    const saveNote = () => {
        if (!selectedNote) return;
        const lines = editContent.split('\n');
        const title = lines[0] || 'Sans titre';
        setNotes(notes.map(n =>
            n.id === selectedNote.id
                ? { ...n, title, content: editContent, date: new Date().toLocaleDateString('fr-FR') }
                : n
        ));
    };

    if (selectedNote) {
        return (
            <div className="h-full bg-white flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-gray-50">
                    <button
                        onClick={() => { saveNote(); setSelectedNote(null); }}
                        className="text-blue-500 font-medium flex items-center"
                    >
                        <FaChevronLeft className="mr-1" size={14} />
                        Notes
                    </button>
                    <button
                        onClick={() => deleteNote(selectedNote.id)}
                        className="text-red-500"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>

                {/* Editor */}
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Écrivez quelque chose..."
                    className="flex-1 p-4 text-gray-900 text-[16px] leading-relaxed resize-none focus:outline-none"
                    autoFocus
                />
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
                <h1 className="font-semibold text-gray-900">Notes</h1>
                <button onClick={createNote} className="text-blue-500">
                    <FaPlus size={18} />
                </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto">
                {notes.map((note) => (
                    <button
                        key={note.id}
                        onClick={() => { setSelectedNote(note); setEditContent(note.content); }}
                        className="w-full text-left p-4 border-b border-gray-200 bg-white active:bg-gray-50"
                    >
                        <h3 className="font-semibold text-gray-900 truncate">{note.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 truncate">{note.content || 'Aucun contenu'}</p>
                        <p className="text-xs text-gray-400 mt-1">{note.date}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NotesApp;

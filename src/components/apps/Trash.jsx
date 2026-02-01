import React from 'react';
import { useFileSystem } from '../../contexts/FileSystemContext';
import { FaTrash, FaUndo, FaTimes } from 'react-icons/fa';

const Trash = () => {
    const { trash, restoreFileFromTrash, deleteFilePermanently, emptyTrash } = useFileSystem();

    return (
        <div className="w-full h-full flex flex-col bg-transparent rounded-b-xl overflow-hidden text-sm animate-fade-in text-slate-200">
            {/* Toolbar */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-transparent text-slate-300">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-slate-100">Trash</span>
                    <span className="text-slate-500 text-xs">({trash.length} items)</span>
                </div>
                <button
                    onClick={emptyTrash}
                    disabled={trash.length === 0}
                    className={`px-3 py-1 rounded text-white text-xs font-semibold transition-colors ${trash.length === 0 ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-red-600 hover:bg-red-700 shadow-md'}`}
                >
                    Empty Trash
                </button>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto bg-transparent">
                {trash.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500">
                        <FaTrash className="text-6xl mb-4 opacity-20" />
                        <p>Trash is empty</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="text-slate-500 text-xs border-b border-white/5 sticky top-0 bg-slate-900/20 backdrop-blur-sm z-10">
                                <th className="pl-6 py-2 font-medium w-1/2">Name</th>
                                <th className="py-2 font-medium">Date Deleted</th>
                                <th className="py-2 font-medium">Original Location</th>
                                <th className="py-2 font-medium text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            {trash.map((file) => (
                                <tr key={file.id} className="even:bg-white/5 hover:bg-red-500/10 group transition-colors border-b border-transparent hover:border-red-500/20">
                                    <td className="pl-6 py-2 font-medium text-slate-200">{file.name}</td>
                                    <td className="py-2 text-xs opacity-60">
                                        {file.deletedAt ? new Date(file.deletedAt).toLocaleString() : 'Unknown'}
                                    </td>
                                    <td className="py-2 text-xs opacity-60">{file.location}</td>
                                    <td className="py-2 text-right pr-6 space-x-2">
                                        <button
                                            title="Restore"
                                            onClick={() => restoreFileFromTrash(file.id)}
                                            className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors"
                                        >
                                            <FaUndo />
                                        </button>
                                        <button
                                            title="Delete Immediately"
                                            onClick={() => deleteFilePermanently(file.id)}
                                            className="p-1.5 text-red-500 hover:bg-red-500/20 rounded-full transition-colors"
                                        >
                                            <FaTimes />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Trash;

import React, { createContext, useContext, useState, useEffect } from 'react';

const initialFiles = [
    // Folders
    { id: 'folder-support', name: 'Support', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-adminsys', name: 'Administration système et réseaux', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-cyber', name: 'Cybersécurité', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-pro', name: 'Projet Pro', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-perso', name: 'Projet Perso', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-certs', name: 'Certifications', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-photos', name: 'Photos', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },
    { id: 'folder-docs', name: 'Documents', type: 'folder', size: '--', date: '2025-01-29 10:00', location: 'Desktop', parentId: 'Desktop', content: '' },

    // Documents - CV
    { id: 'cv-pdf', name: 'CV_Yassine_Dinar.pdf', type: 'PDF Document', size: '11.4 MB', date: '2025-12-13 10:23', tags: ['red', 'blue'], location: 'Documents', parentId: 'folder-docs', url: '/cv-yassine-dinar.pdf', content: '' },

    // Administration systeme et reseaux
    { id: 'proc-ip-relay', name: 'Procedure_IP_Relay_DHCP_WinServ22.pdf', type: 'PDF Document', size: '575 KB', date: '2025-11-20 14:30', tags: ['blue'], location: 'Administration systeme et reseaux', parentId: 'folder-adminsys', url: '/procedure_ip_relay_dhcp_winserv22.pdf', content: '' },
    { id: 'proc-ubuntu-cli', name: 'Ubuntu_Server_CLI.pdf', type: 'PDF Document', size: '391 KB', date: '2025-10-15 09:00', tags: ['blue'], location: 'Administration systeme et reseaux', parentId: 'folder-adminsys', url: '/ubuntu_server_cli.pdf', content: '' },
    { id: 'proc-haute-dispo', name: 'Haute_Disponibilite.pdf', type: 'PDF Document', size: '176 KB', date: '2025-09-28 11:00', tags: ['blue'], location: 'Administration systeme et reseaux', parentId: 'folder-adminsys', url: '/haute_disponibilite.pdf', content: '' },
    { id: 'proc-reseau-entreprise', name: 'TP1_Conception_Reseau_Entreprise.pdf', type: 'PDF Document', size: '219 KB', date: '2025-08-10 16:45', tags: ['blue'], location: 'Administration systeme et reseaux', parentId: 'folder-adminsys', url: '/tp1_conception_reseau_entreprise.pdf', content: '' },
    { id: 'proc-sauvegarde-ext', name: 'Externaliser_les_Sauvegardes.pdf', type: 'PDF Document', size: '155 KB', date: '2025-07-22 10:30', tags: ['green'], location: 'Administration systeme et reseaux', parentId: 'folder-adminsys', url: '/externaliser_sauvegardes.pdf', content: '' },
    { id: 'proc-sauvegarde-auto', name: 'Sauvegarde_Automatique.pdf', type: 'PDF Document', size: '157 KB', date: '2025-07-15 14:00', tags: ['green'], location: 'Administration systeme et reseaux', parentId: 'folder-adminsys', url: '/sauvegarde_automatique.pdf', content: '' },

    // Cybersecurite
    { id: 'proc-secu-reseau', name: 'Guide_Securisation_Reseau_Entreprise.pdf', type: 'PDF Document', size: '724 KB', date: '2025-11-05 09:15', tags: ['red'], location: 'Cybersecurite', parentId: 'folder-cyber', url: '/guide_securisation_reseau_entreprise.pdf', content: '' },
    { id: 'proc-secu-glpi', name: 'Securiser_Serveur_GLPI.pdf', type: 'PDF Document', size: '163 KB', date: '2025-10-28 11:30', tags: ['red'], location: 'Cybersecurite', parentId: 'folder-cyber', url: '/securiser_serveur_glpi.pdf', content: '' },
    { id: 'proc-opnsense', name: 'OPNsense_Proxy_Squid.pdf', type: 'PDF Document', size: '899 KB', date: '2025-09-12 15:45', tags: ['red'], location: 'Cybersecurite', parentId: 'folder-cyber', url: '/opnsense_proxy_squid.pdf', content: '' },

    // Support
    { id: 'proc-glpi-lamp', name: 'GLPI_11_Installation_LAMP.pdf', type: 'PDF Document', size: '256 KB', date: '2025-10-02 10:00', tags: ['orange'], location: 'Support', parentId: 'folder-support', url: '/glpi_11_lamp.pdf', content: '' },

    // Photos
    { id: 'photo-cv', name: 'cv-photo.png', type: 'PNG Image', size: '280 KB', date: '2025-12-01 14:00', tags: ['green'], location: 'Photos', parentId: 'folder-photos', url: '/assets/cv-photo.png', content: '' },
];

const FileSystemContext = createContext();

export const FileSystemProvider = ({ children }) => {
    // Files State (persisted)
    const [files, setFiles] = useState(() => {
        const saved = localStorage.getItem('macos-files');
        return saved ? JSON.parse(saved) : initialFiles;
    });

    // Trash State (persisted)
    const [trash, setTrash] = useState(() => {
        const saved = localStorage.getItem('macos-trash');
        return saved ? JSON.parse(saved) : [];
    });

    // Recent Files State (persisted) - stores file IDs of recently opened files
    const [recentFiles, setRecentFiles] = useState(() => {
        const saved = localStorage.getItem('macos-recent');
        return saved ? JSON.parse(saved) : [];
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('macos-files', JSON.stringify(files));
    }, [files]);

    useEffect(() => {
        localStorage.setItem('macos-trash', JSON.stringify(trash));
    }, [trash]);

    useEffect(() => {
        localStorage.setItem('macos-recent', JSON.stringify(recentFiles));
    }, [recentFiles]);

    // Add file to recent files list (max 10 items)
    const addToRecent = (fileId) => {
        setRecentFiles(prev => {
            const filtered = prev.filter(id => id !== fileId);
            return [fileId, ...filtered].slice(0, 10);
        });
    };

    // Get recent files as full file objects
    const getRecentFiles = () => {
        return recentFiles
            .map(id => files.find(f => f.id === id))
            .filter(f => f !== undefined);
    };

    // Actions
    const moveFileToTrash = (fileId) => {
        const file = files.find(f => f.id === fileId);
        if (file) {
            setTrash(prev => [...prev, { ...file, deletedAt: new Date() }]);
            setFiles(prev => prev.filter(f => f.id !== fileId)); // Remove from active files
        }
    };

    const restoreFileFromTrash = (fileId) => {
        const fileToRestore = trash.find(f => f.id === fileId);
        if (fileToRestore) {
            setFiles(prev => [...prev, { ...fileToRestore, parentId: fileToRestore.parentId || 'Desktop', deletedAt: null }]);
            setTrash(prev => prev.filter(f => f.id !== fileId));
        }
    };

    const deleteFilePermanently = (fileId) => {
        setTrash(prev => prev.filter(f => f.id !== fileId));
    };

    const emptyTrash = () => {
        setTrash([]);
    };

    const moveFile = (fileId, targetFolderId) => {
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, parentId: targetFolderId } : f));
    };

    const updateFilePosition = (fileId, x, y) => {
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, position: { x, y } } : f));
    };

    const addFile = (newFile) => {
        setFiles(prev => [...prev, { ...newFile, id: newFile.id || Date.now().toString() }]);
    };

    const updateFileContent = (fileId, newContent) => {
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, content: newContent } : f));
    };

    return (
        <FileSystemContext.Provider value={{
            files,
            trash,
            recentFiles,
            moveFileToTrash,
            restoreFileFromTrash,
            deleteFilePermanently,
            emptyTrash,
            moveFile,
            updateFilePosition,
            addFile,
            updateFileContent,
            addToRecent,
            getRecentFiles
        }}>
            {children}
        </FileSystemContext.Provider>
    );
};

export const useFileSystem = () => useContext(FileSystemContext);

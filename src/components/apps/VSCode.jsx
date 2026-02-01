import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCode, FaFolder, FaFolderOpen, FaFileCode, FaJs, FaCss3, FaReact, FaPlus, FaSave } from 'react-icons/fa';
import { useFileSystem } from '../../contexts/FileSystemContext';

// Virtual File System Content (Read Only)
const PROJECT_FILES = {
    'src/scripts/deploy_infra.ps1': `# PowerShell Automation Script
# Purpose: Deploy Active Directory Users from CSV and configure permissions
# Author: Yassine Dinar

$CsvFilePath = "./users.csv"
$OU = "OU=Employees,DC=corp,DC=local"

Import-Module ActiveDirectory

if (Test-Path $CsvFilePath) {
    $Users = Import-Csv $CsvFilePath
    
    foreach ($User in $Users) {
        $Password = ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force
        
        try {
            New-ADUser -Name "$($User.FirstName) $($User.LastName)" \`
                -SamAccountName $User.SamAccountName \`
                -UserPrincipalName "$($User.SamAccountName)@corp.local" \`
                -Path $OU \`
                -AccountPassword $Password \`
                -Enabled $true \`
                -ChangePasswordAtLogon $true
                
            Write-Host "Created user: $($User.SamAccountName)" -ForegroundColor Green
            
            # Assign Group Membership
            if ($User.Department -eq "IT") {
                Add-ADGroupMember -Identity "IT_Admins" -Members $User.SamAccountName
            }
        }
        catch {
            Write-Error "Failed to create user $($User.SamAccountName): $_"
        }
    }
} else {
    Write-Warning "CSV file not found!"
}`,

    'src/App.jsx': `import React from 'react';
import { OSProvider } from './contexts/OSContext';
import { FileSystemProvider } from './contexts/FileSystemContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Desktop from './components/desktop/Desktop';
import './index.css';

function App() {
  return (
    <OSProvider>
      <FileSystemProvider>
        <NotificationProvider>
          <Desktop />
        </NotificationProvider>
      </FileSystemProvider>
    </OSProvider>
  );
}

export default App;`,
    // ... other files ...
};

const VSCode = ({ file }) => {
    const { files, addFile, updateFileContent } = useFileSystem();
    const [activeFileId, setActiveFileId] = useState('src/scripts/deploy_infra.ps1'); // [MOD] Set default to script
    const [localContent, setLocalContent] = useState(''); // For editing
    const [isDirty, setIsDirty] = useState(false);

    // Filter only "code-like" files from FileSystem for the "Local" section
    const userFiles = files.filter(f => f.parentId === 'Documents' || f.name.endsWith('.js') || f.name.endsWith('.jsx') || f.name.endsWith('.txt') || f.name.endsWith('.html') || f.name.endsWith('.css'));

    // Check if active file is virtual or local
    const isVirtual = PROJECT_FILES.hasOwnProperty(activeFileId);

    // If file prop is passed (e.g. from Desktop/Finder), open it immediately
    useEffect(() => {
        if (file && file.id) {
            setActiveFileId(file.id);
        }
    }, [file]);

    useEffect(() => {
        if (isVirtual) {
            setLocalContent(PROJECT_FILES[activeFileId]);
            setIsDirty(false);
        } else {
            const file = files.find(f => f.id === activeFileId);
            if (file) {
                setLocalContent(file.content || '');
                setIsDirty(false);
            }
        }
    }, [activeFileId, files]);

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (!isVirtual) {
                saveFile();
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            // Insert tab (2 spaces)
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const value = e.target.value;
            setLocalContent(value.substring(0, start) + "  " + value.substring(end));
            // Move cursor would require ref, skipping for simplicity
        }
    };

    const saveFile = () => {
        if (isVirtual) return;
        updateFileContent(activeFileId, localContent);
        setIsDirty(false);
        // Maybe show toast?
    };

    const createNewFile = () => {
        const name = prompt("File Name (e.g., script.js):", "untitled.js");
        if (name) {
            const newFile = {
                id: Date.now().toString(),
                name: name,
                type: 'Text File',
                size: '0 KB',
                date: new Date().toLocaleString(),
                tags: [],
                location: 'Documents',
                parentId: 'Documents',
                content: '// Start coding...'
            };
            addFile(newFile);
            setActiveFileId(newFile.id);
        }
    };

    const getIcon = (filename) => {
        if (!filename) return <FaFileCode className="text-gray-400" />;
        if (filename.endsWith('.css')) return <FaCss3 className="text-blue-400" />;
        if (filename.endsWith('.jsx')) return <FaReact className="text-blue-400" />;
        if (filename.endsWith('.js')) return <FaJs className="text-yellow-400" />;
        if (filename.endsWith('.ps1')) return <FaCode className="text-blue-600" />; // PowerShell Icon
        return <FaFileCode className="text-gray-400" />;
    };

    const getActiveFileName = () => {
        if (isVirtual) return activeFileId.split('/').pop();
        return files.find(f => f.id === activeFileId)?.name || 'Untitled';
    };

    return (
        <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm" onKeyDown={handleKeyDown} tabIndex={-1}>
            {/* Sidebar */}
            <div className="w-64 bg-[#252526] flex flex-col border-r border-[#333]">
                <div className="p-3 text-xs uppercase font-bold tracking-wider text-gray-500 flex justify-between items-center">
                    <span>Explorer</span>
                </div>

                {/* Virtual Files */}
                <div className="px-2 mb-4">
                    <div className="flex items-center gap-1 text-gray-400 mb-1 cursor-pointer hover:text-white">
                        <FaFolderOpen className="text-blue-400" />
                        <span className="font-bold">Portfolio Source</span>
                    </div>
                    <div className="pl-4 flex flex-col gap-1">
                        {Object.keys(PROJECT_FILES).map(file => (
                            <div
                                key={file}
                                onClick={() => setActiveFileId(file)}
                                className={`flex items-center gap-2 cursor-pointer py-1 px-2 rounded 
                                    ${activeFileId === file ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                            >
                                {getIcon(file)}
                                <span className="truncate">{file.split('/').pop()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Local Files */}
                <div className="px-2">
                    <div className="flex items-center justify-between text-gray-400 mb-1 cursor-pointer hover:text-white group">
                        <div className="flex items-center gap-1">
                            <FaFolder className="text-yellow-500" />
                            <span className="font-bold">Local Documents</span>
                        </div>
                        <button onClick={createNewFile} className="opacity-0 group-hover:opacity-100 hover:text-white" title="New File">
                            <FaPlus />
                        </button>
                    </div>
                    <div className="pl-4 flex flex-col gap-1">
                        {userFiles.map(file => (
                            <div
                                key={file.id}
                                onClick={() => setActiveFileId(file.id)}
                                className={`flex items-center gap-2 cursor-pointer py-1 px-2 rounded 
                                    ${activeFileId === file.id ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                            >
                                {getIcon(file.name)}
                                <span className="truncate">{file.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] overflow-hidden">
                {/* Tabs */}
                <div className="flex bg-[#252526] overflow-x-auto border-b border-[#333] h-9 items-center">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] border-t-2 border-blue-500 text-white min-w-fit h-full">
                        {getIcon(getActiveFileName())}
                        <span>{getActiveFileName()}</span>
                        {isDirty && <div className="w-2 h-2 rounded-full bg-white ml-2"></div>}
                    </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-auto relative">
                    {isVirtual ? (
                        <SyntaxHighlighter
                            language="jsx"
                            style={dracula}
                            customStyle={{ margin: 0, height: '100%', fontSize: '14px', lineHeight: '1.5', background: '#1e1e1e' }}
                            showLineNumbers={true}
                        >
                            {localContent}
                        </SyntaxHighlighter>
                    ) : (
                        <textarea
                            className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                            value={localContent}
                            onChange={(e) => {
                                setLocalContent(e.target.value);
                                setIsDirty(true);
                            }}
                            spellCheck="false"
                        />
                    )}
                </div>

                {/* Status Bar */}
                <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none">
                    <div className="flex items-center gap-3">
                        <span>main*</span>
                        {isVirtual ? <span>Read Only</span> : <span>Writable</span>}
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Ln 1, Col 1</span>
                        <span>UTF-8</span>
                        <span>{isVirtual ? 'JavaScript React' : 'Plain Text'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VSCode;

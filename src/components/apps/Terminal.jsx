import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { useOS } from '../../contexts/OSContext';
import { useFileSystem } from '../../contexts/FileSystemContext';

const Terminal = ({ windowState }) => {
    const cursorPos = useRef(0);
    const COMMANDS = ['help', 'ssh', 'ls', 'cd', 'cat', 'open', 'neofetch', 'whoami', 'whois', 'nslookup', 'nmap', 'ping', 'ipconfig', 'clear', 'exit', 'bruteforce'];
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const inputBuffer = useRef('');
    const hasInitialCommandRun = useRef(false);





    const terminalState = useRef('NORMAL'); // 'NORMAL' | 'AWAITING_PASSWORD' | 'CONNECTED' | 'AWAITING_FILE_PASS'
    const connectedUser = useRef('yassine');
    const connectedHost = useRef('macbook');
    const sshTarget = useRef(null);

    const { closeWindow, openWindow, serverStatus, setServerStatus, windows } = useOS();
    const { addFile } = useFileSystem();
    const windowsRef = useRef(windows);
    const addFileRef = useRef(addFile);
    const history = useRef([]);
    const historyIndex = useRef(-1);

    // Keep windowsRef and addFileRef in sync
    useEffect(() => {
        windowsRef.current = windows;
    }, [windows]);

    useEffect(() => {
        addFileRef.current = addFile;
    }, [addFile]);

    // ... (rest of file)



    // Mock File System for Terminal
    const fileSystem = {
        '~': ['projects', 'skills', 'contact.txt', 'cv.pdf', 'bruteforce.sh'],
        '~/projects': ['macOS-portfolio', 'e-commerce-api', 'docker-cluster'],
        '~/skills': ['react', 'node', 'linux', 'aws']
    };

    // File Contents
    const fileContents = {
        '~/contact.txt': "Email: contact@ydinar.fr\nPhone: +33 7 68 30 18 73\nGitHub: github.com/Yassinedinar",
        '~/cv.pdf': "[PDF Content - Mock]",
        '~/projects/macOS-portfolio': "A web-based macOS clone built with React and Vite.",
        '~/bruteforce.sh': "#!/bin/bash\n# Bruteforce tool for Level 4 Security\n# Usage: ./bruteforce.sh <target_file>"
    };

    const currentDir = useRef('~');
    const serverStatusRef = useRef(serverStatus);

    useEffect(() => {
        serverStatusRef.current = serverStatus;
    }, [serverStatus]);

    useEffect(() => {
        if (!terminalRef.current) return;

        const term = new XTerm({
            cursorBlink: true,
            theme: {
                background: '#1e1e1e',
                foreground: '#f0f0f0',
                cursor: '#f0f0f0'
            },
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontSize: 14,
            scrollback: 1000,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        term.open(terminalRef.current);
        fitAddon.fit();
        xtermRef.current = term;

        const prompt = () => {
            const dir = currentDir.current === '~' ? '~' : currentDir.current.split('/').pop();
            const userColor = connectedUser.current === 'root' ? '\x1b[1;31m' : '\x1b[1;32m'; // Red for root
            term.write(`\r\n${userColor}${connectedUser.current}@${connectedHost.current}\x1b[0m:\x1b[1;34m${dir}\x1b[0m$ `);
        };

        // Welcome Message (Dynamic based on state? No, always locally starts here)
        term.writeln('Welcome to Yassine OS Terminal v2.1.0');
        term.writeln('System Check: Server 192.168.1.10 is \x1b[1;31mOFFLINE\x1b[0m.');
        term.writeln('Please connect via SSH to restart services.');
        term.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.');
        prompt();

        // Check for initial command from Voice Assistant (e.g. SSH)
        if (windowState?.initialCommand && !hasInitialCommandRun.current) {
            hasInitialCommandRun.current = true;
            setTimeout(() => {
                const cmd = windowState.initialCommand;
                // Type it out for effect (simulate user typing)
                let i = 0;
                // Simply executing it is cleaner for now to avoid complexity with inputBuffer sync
                term.writeln(cmd);
                processCommand(cmd, term, prompt);
            }, 800);
        }

        term.onData(e => {
            // Special handling for SSH Password Input
            if (terminalState.current === 'AWAITING_PASSWORD') {
                if (e === '\r') { // Enter
                    if (xtermRef.current) xtermRef.current.write('\r\n');
                    const pass = inputBuffer.current;
                    inputBuffer.current = '';

                    // Check Password (CTF Logic)
                    if (pass === 'Admin123!') {
                        // Success
                        terminalState.current = 'CONNECTED';
                        connectedUser.current = 'admin';
                        connectedHost.current = 'server-prod';
                        currentDir.current = '~'; // Reset dir in remote
                        if (xtermRef.current) {
                            xtermRef.current.writeln('');
                            xtermRef.current.writeln('Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-72-generic x86_64)');
                            xtermRef.current.writeln('');
                            xtermRef.current.writeln(' * Documentation:  https://help.ubuntu.com');
                            xtermRef.current.writeln(' * Management:     https://landscape.canonical.com');
                            xtermRef.current.writeln(' * Support:        https://ubuntu.com/advantage');
                            xtermRef.current.writeln('');
                            xtermRef.current.writeln('Last login: ' + new Date().toUTCString() + ' from 192.168.1.5');
                        }

                        // Auto-open 3D Viewer (The Server)
                        setTimeout(() => {
                            // We trigger the 'open server' logic manually
                            if (xtermRef.current) processCommand('open server', xtermRef.current, prompt);
                        }, 800);

                    } else {
                        if (xtermRef.current) xtermRef.current.writeln('Permission denied, please try again.');
                        terminalState.current = 'NORMAL';
                        inputBuffer.current = '';
                    }
                    if (terminalState.current !== 'AWAITING_PASSWORD') {
                        prompt();
                    } else {
                        if (xtermRef.current) xtermRef.current.write('admin@192.168.1.10\'s password: ');
                    }
                } else if (e === '\u007F') { // Backspace
                    if (inputBuffer.current.length > 0) {
                        inputBuffer.current = inputBuffer.current.slice(0, -1);
                    }
                } else if (e === '\u0003') { // Ctrl+C
                    if (xtermRef.current) xtermRef.current.write('^C\r\n');
                    terminalState.current = 'NORMAL';
                    inputBuffer.current = '';
                    prompt();
                } else {
                    if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) {
                        inputBuffer.current += e;
                    }
                }
                return;
            }

            // Special handling for File Decryption Password
            if (terminalState.current === 'AWAITING_FILE_PASS') {
                if (e === '\r') {
                    if (xtermRef.current) xtermRef.current.write('\r\n');
                    const pass = inputBuffer.current;
                    inputBuffer.current = '';

                    if (pass === 'mewo2025') {
                        if (xtermRef.current) {
                            xtermRef.current.writeln('Archive:  secret_data.zip');
                            xtermRef.current.writeln('  inflating: secret.txt');
                            xtermRef.current.writeln('  inflating: reward.png');
                            xtermRef.current.writeln('');
                            xtermRef.current.writeln('\x1b[1;32mSuccess! Secret unlocked.\x1b[0m');
                        }

                        // --- LOOT DROP ---
                        if (addFileRef.current) {
                            addFileRef.current({
                                name: 'secret.txt',
                                type: 'Text File',
                                content: `FLAG{MR_ROBOT_APPROVES}\n\nMission accomplie.\n\nAu-delà de la blague, cette démonstration illustre l'importance vitale de :\n1. La gestion des mots de passe (pas de post-it !).\n2. La sécurisation des accès SSH (clés plutôt que mdp).\n3. La veille sur les outils d'audit comme Hydra.\n\nEn tant qu'Admin Sys & Réseau, ma mission est de protéger votre infrastructure contre ce type d'attaques.\n\nYassine D. - BTS SIO SISR`,
                                location: 'Desktop',
                                parentId: 'Desktop',
                                position: { x: 320, y: 100 }
                            });

                            addFileRef.current({
                                name: 'reward.png',
                                type: 'PNG Image',
                                url: '/assets/images/reward.png',
                                location: 'Desktop',
                                parentId: 'Desktop',
                                position: { x: 320, y: 200 }
                            });

                            if (xtermRef.current) {
                                xtermRef.current.writeln('');
                                xtermRef.current.writeln('[+] Files extracted to Desktop: secret.txt, reward.png');
                                xtermRef.current.writeln('[+] Use "open reward.png" to view.');
                            }
                        }
                    } else {
                        if (xtermRef.current) xtermRef.current.writeln('unzip: password incorrect');
                    }

                    terminalState.current = 'CONNECTED'; // Go back to connected state
                    prompt();
                } else if (e === '\u007F') {
                    if (inputBuffer.current.length > 0) inputBuffer.current = inputBuffer.current.slice(0, -1);
                } else if (e === '\u0003') {
                    if (xtermRef.current) xtermRef.current.write('^C\r\n');
                    terminalState.current = 'CONNECTED';
                    inputBuffer.current = '';
                    prompt();
                } else {
                    if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) {
                        inputBuffer.current += e;
                    }
                }
                return;
            }

            // Normal Handling
            const handleInput = (char) => {
                const buffer = inputBuffer.current;
                const pos = cursorPos.current || 0;
                const first = buffer.slice(0, pos);
                const last = buffer.slice(pos);
                inputBuffer.current = first + char + last;
                cursorPos.current = pos + char.length;
                if (xtermRef.current) {
                    xtermRef.current.write(char + last + '\x1b[D'.repeat(last.length));
                }
            };

            const handleDelete = () => {
                const buffer = inputBuffer.current;
                const pos = cursorPos.current;
                if (pos > 0) {
                    const first = buffer.slice(0, pos - 1);
                    const last = buffer.slice(pos);
                    inputBuffer.current = first + last;
                    cursorPos.current -= 1;
                    // Redraw: move back 1, write rest + space + move back
                    if (xtermRef.current) {
                        xtermRef.current.write('\b' + last + ' ' + '\x1b[D'.repeat(last.length + 1));
                    }
                }
            };

            // Reset cursor when buffer changes externally (history)
            const resetCursorToEnd = () => {
                cursorPos.current = inputBuffer.current.length;
            };

            switch (e) {
                case '\r': // Enter
                    const command = inputBuffer.current.trim();
                    xtermRef.current.write('\r\n');
                    if (command.length > 0) {
                        history.current.push(command);
                        historyIndex.current = history.current.length;
                        processCommand(command, xtermRef.current, prompt);
                    } else {
                        prompt();
                    }
                    inputBuffer.current = '';
                    cursorPos.current = 0;
                    break;
                case '\u007F': // Backspace
                    handleDelete();
                    break;
                case '\x1b[A': // Up Arrow
                    if (historyIndex.current > 0) {
                        historyIndex.current--;
                        const prevCmd = history.current[historyIndex.current];
                        // Clear current line
                        const len = inputBuffer.current.length;
                        const pos = cursorPos.current;
                        // Move to end? No, simpler to clear whole line visual
                        // Move cursor to start of input
                        xtermRef.current.write('\x1b[D'.repeat(pos));
                        // Overwrite with spaces
                        xtermRef.current.write(' '.repeat(len));
                        // Move back to start
                        xtermRef.current.write('\x1b[D'.repeat(len));

                        inputBuffer.current = prevCmd;
                        cursorPos.current = prevCmd.length;
                        xtermRef.current.write(prevCmd);
                    }
                    break;
                case '\x1b[B': // Down Arrow
                    if (historyIndex.current < history.current.length) {
                        historyIndex.current++;
                        const nextCmd = history.current[historyIndex.current] || '';

                        const len = inputBuffer.current.length;
                        const pos = cursorPos.current;
                        xtermRef.current.write('\x1b[D'.repeat(pos));
                        xtermRef.current.write(' '.repeat(len));
                        xtermRef.current.write('\x1b[D'.repeat(len));

                        inputBuffer.current = nextCmd;
                        cursorPos.current = nextCmd.length;
                        xtermRef.current.write(nextCmd);
                    }
                    break;
                case '\x1b[D': // Left Arrow
                    if (cursorPos.current > 0) {
                        cursorPos.current--;
                        xtermRef.current.write('\x1b[D');
                    }
                    break;
                case '\x1b[C': // Right Arrow
                    if (cursorPos.current < inputBuffer.current.length) {
                        cursorPos.current++;
                        xtermRef.current.write('\x1b[C');
                    }
                    break;
                case '\t': // Tab
                    const buffer = inputBuffer.current;
                    const parts = buffer.split(' ');
                    const currentWord = parts.pop() || '';

                    // Decide if we complete a command or a file
                    let options = [];
                    if (parts.length === 0) {
                        // First word -> Command
                        options = COMMANDS;
                    } else {
                        // Subsequent words -> Files
                        options = fileSystem[currentDir.current] || [];
                    }

                    const matches = options.filter(opt => opt.startsWith(currentWord));
                    if (matches.length === 1) {
                        const completion = matches[0].slice(currentWord.length);
                        // Insert completion at cursor? Usually tab complete is at end or specific word
                        // Simplified: Append completion if at end
                        handleInput(completion);
                    }
                    break;
                default:
                    if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) {
                        handleInput(e);
                    }
            }
        });

        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            term.dispose();
        };
    }, []);

    const processCommand = async (cmd, term, prompt) => {
        const parts = cmd.split(' ');
        const main = parts[0].toLowerCase();
        const args = parts.slice(1);

        const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Use xtermRef directly to avoid closure stale issues
        const write = (text) => xtermRef.current && xtermRef.current.write(text);
        const writeln = (text) => xtermRef.current && xtermRef.current.writeln(text);
        const clear = () => xtermRef.current && xtermRef.current.clear();

        switch (main) {
            case '':
                break;
            case 'help':
                writeln('Available commands:');
                writeln('  \x1b[1;33mssh user@host\x1b[0m     - Secure Shell connection');
                writeln('  \x1b[1;33mls\x1b[0m                - List files');
                writeln('  \x1b[1;33mcd <dir>\x1b[0m          - Change directory');
                writeln('  \x1b[1;33mcat <file>\x1b[0m        - Read file');
                writeln('  \x1b[1;33mopen <app>\x1b[0m        - Open application');
                writeln('  \x1b[1;33mneofetch\x1b[0m          - System Info');
                writeln('  \x1b[1;33mwhoami\x1b[0m            - Current user');
                writeln('  \x1b[1;33mwhois <domain>\x1b[0m    - Domain info');
                writeln('  \x1b[1;33mnslookup <domain>\x1b[0m - DNS query');
                writeln('  \x1b[1;33mnmap <ip>\x1b[0m         - Network scan');
                writeln('  \x1b[1;33mping <host>\x1b[0m       - Check connectivity');
                writeln('  \x1b[1;33m./<script>\x1b[0m        - Execute script (e.g. ./script.sh)');
                writeln('  \x1b[1;33mipconfig\x1b[0m          - IP Config');
                if (connectedUser.current === 'admin') {
                    writeln('  \x1b[1;31munzip <file>\x1b[0m      - Extract compressed files');
                    writeln('  \x1b[1;31mshutdown <host>\x1b[0m   - Stop server');
                    writeln('  \x1b[1;31mstart <host>\x1b[0m      - Start server');
                }
                writeln('  \x1b[1;33mexit\x1b[0m              - Close/Logout');
                break;
            case 'clear':
                clear();
                break;
            case 'ls':
                const files = [...(fileSystem[currentDir.current] || [])];
                // Add secret file if admin
                if (connectedUser.current === 'admin' && currentDir.current === '~') {
                    files.push('secret_data.zip');
                }

                const formattedFiles = files.map(f => {
                    const fullPath = currentDir.current === '~' ? `~/${f}` : `${currentDir.current}/${f}`;
                    if (f === 'secret_data.zip') return `\x1b[1;31m${f}\x1b[0m`;
                    return fileSystem[fullPath] ? `\x1b[1;34m${f}/\x1b[0m` : (f.endsWith('.sh') ? `\x1b[1;32m${f}\x1b[0m` : f);
                });
                writeln(formattedFiles.join('  '));
                break;

            case 'cd':
                const target = args[0];
                if (!target || target === '~') {
                    currentDir.current = '~';
                } else if (target === '..') {
                    if (currentDir.current !== '~') {
                        currentDir.current = '~'; // Simplified
                    }
                } else {
                    const potentialPath = currentDir.current === '~' ? `~/${target}` : target;
                    const cleanPath = potentialPath.endsWith('/') ? potentialPath.slice(0, -1) : potentialPath;
                    if (fileSystem[cleanPath]) {
                        currentDir.current = cleanPath;
                    } else {
                        writeln(`cd: no such file or directory: ${target}`);
                    }
                }
                break;

            case 'cat':
                if (!args[0]) {
                    writeln('usage: cat <filename>');
                    break;
                }
                const filename = args[0];
                const fullPath = currentDir.current === '~' ? `~/${filename}` : `${currentDir.current}/${filename}`;

                if (fileContents[fullPath]) {
                    writeln(fileContents[fullPath]);
                } else {
                    writeln(`cat: ${filename}: No such file or directory`);
                }
                break;

            case 'neofetch':
                const isRoot = connectedUser.current === 'admin';
                writeln('');
                writeln(`       \x1b[32m/\\\x1b[0m           \x1b[1;37m${connectedUser.current}@${connectedHost.current}\x1b[0m`);
                writeln('      \x1b[32m/  \\\x1b[0m          ---------------');
                writeln(`     \x1b[32m/    \\\x1b[0m         \x1b[33mOS\x1b[0m: ${isRoot ? 'Ubuntu Server 22.04 LTS' : 'YassineOS (React Web)'}`);
                writeln(`    \x1b[32m/      \\\x1b[0m        \x1b[33mHost\x1b[0m: ${isRoot ? 'ProLiant DL380' : 'Portfolio 2024'}`);
                writeln(`   \x1b[32m/   ,,   \\\x1b[0m       \x1b[33mKernel\x1b[0m: ${isRoot ? '5.15.0-72-generic' : 'React 18.2.0'}`);
                writeln('  \x1b[32m/   |  |   \\\x1b[0m      \x1b[33mUptime\x1b[0m: Always on');
                writeln(` \x1b[32m/_-\'\'    \'\'-_\\\x1b[0m     \x1b[33mShell\x1b[0m: ${isRoot ? 'bash' : 'zsh'}`);
                writeln('                 \x1b[33mResolution\x1b[0m: 1920x1080');
                writeln('                 \x1b[33mTheme\x1b[0m: Dark Mode');
                writeln('                 \x1b[33mIcons\x1b[0m: React Icons');
                writeln('');
                break;

            case 'unzip':
                if (!args[0]) {
                    writeln('usage: unzip <file.zip>');
                    break;
                }
                if (args[0] === 'secret_data.zip') {
                    if (connectedUser.current !== 'admin') {
                        writeln('unzip: cannot open secret_data.zip: Permission denied');
                        break;
                    }
                    // Prompt for password
                    terminalState.current = 'AWAITING_FILE_PASS';
                    write(`[secret_data.zip] password: `);
                    return; // Early return to avoid prompt
                } else {
                    writeln(`unzip: cannot find or open ${args[0]}.`);
                }
                break;

            case 'ipconfig':
            case 'ifconfig':
                writeln('Querying public IP info...');
                try {
                    const response = await fetch('https://api.ipify.org?format=json');
                    const data = await response.json();

                    writeln('');
                    writeln('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500');
                    writeln(`    inet \x1b[1;32m${data.ip}\x1b[0m  netmask 255.255.255.0  broadcast 192.168.1.255`);
                    writeln('    ether 00:1a:2b:3c:4d:5e  txqueuelen 1000  (Ethernet)');
                    writeln('');
                    writeln('lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536');
                    writeln('    inet 127.0.0.1  netmask 255.0.0.0');
                } catch (e) {
                    writeln('\x1b[31mError fetching IP configuration.\x1b[0m');
                }
                break;

            case 'nslookup':
                if (!args[0]) { writeln('usage: nslookup <domain>'); break; }
                writeln(`Server:    8.8.8.8`);
                writeln(`Address:   8.8.8.8#53`);
                writeln(``);

                try {
                    const response = await fetch(`https://dns.google/resolve?name=${args[0]}`);
                    const data = await response.json();

                    if (data.Answer) {
                        writeln(`Non-authoritative answer:`);
                        writeln(`Name:      ${args[0]}`);
                        data.Answer.forEach(record => {
                            writeln(`Address:   ${record.data}`);
                        });
                    } else {
                        writeln(`No records found for ${args[0]}`);
                    }
                } catch (e) {
                    writeln('\x1b[31mDNS query failed.\x1b[0m');
                    // Fallback mock
                    writeln(`Address:   142.250.190.46 (Mock)`);
                }
                break;

            case 'whois':
                if (!args[0]) { writeln('usage: whois <domain>'); break; }
                writeln(`Domain Name: ${args[0].toUpperCase()}`);
                writeln('Registry Domain ID: 2138514_DOMAIN_COM-VRSN');
                writeln('Registrar WHOIS Server: whois.markmonitor.com');
                writeln('Registrar URL: http://www.markmonitor.com');
                writeln(`Updated Date: ${new Date().toISOString()}`);
                writeln(`Creation Date: 1997-09-15T04:00:00Z`);
                writeln('Registrar: MarkMonitor Inc.');
                writeln('Registrar IANA ID: 292');
                break;

            case 'nmap':
                if (!args[0]) { writeln('usage: nmap <target>'); break; }
                writeln(`Starting Nmap 7.92 ( https://nmap.org )`);

                writeln(`Nmap scan report for ${args[0]} (192.168.1.1)`);
                writeln(`Host is up (0.0024s latency).`);
                writeln(`Not shown: 997 closed tcp ports (reset)`);

                writeln('PORT    STATE SERVICE');
                await simulateDelay(300);
                writeln('22/tcp  \x1b[32mopen\x1b[0m  ssh');
                writeln('80/tcp  \x1b[32mopen\x1b[0m  http');
                await simulateDelay(300);
                writeln('443/tcp \x1b[32mopen\x1b[0m  https');

                writeln('');
                writeln(`Nmap done: 1 IP address (1 host up) scanned in 0.82 seconds`);
                break;
            case 'whoami':
                writeln(connectedUser.current === 'admin' ? 'root (admin)' : 'Yassine Dinar - BTS SIO SISR Student');
                break;

            // --- SSH Logic ---
            case 'ssh':
                if (args.length === 0) {
                    writeln('usage: ssh user@host');
                    break;
                }
                if (args[0] === 'admin@192.168.1.10') {
                    // Start SSH Flow
                    terminalState.current = 'AWAITING_PASSWORD';
                    write('admin@192.168.1.10\'s password: ');
                    // We return early to avoid calling prompt() at the end
                    return;
                } else {
                    writeln(`ssh: connect to host ${args[0]} port 22: Connection refused`);
                }
                break;

            case './bruteforce.sh':
            case 'bruteforce':
                writeln('Starting Hydra v9.1 ( http://www.thc.org/thc-hydra )');
                writeln(`Target: 192.168.1.10`);
                writeln('Wait...');
                await simulateDelay(1000);

                const fakePasswords = ['123456', 'password', 'iloveyou', 'princess', 'admin', 'qwerty', 'monkey', 'dragon', 'football', 'server', 'master', 'welcome'];

                // Matrix Effect
                for (let i = 0; i < 30; i++) {
                    await simulateDelay(50);
                    const pwd = fakePasswords[i % fakePasswords.length] + Math.floor(Math.random() * 999);
                    writeln(`[ATTEMPT] Testing password: ${pwd} ... \x1b[31mFAILED\x1b[0m`);
                }

                await simulateDelay(500);
                writeln(`[ATTEMPT] Testing password: mewo2025 ... \x1b[32mSUCCESS\x1b[0m`);
                writeln('');
                writeln(`\x1b[1;32m[+] PASSWORD FOUND: "mewo2025"\x1b[0m`);
                writeln(`[+] Secret data unlocked.`);
                break;

            case 'open':
                if (!args[0]) {
                    writeln('usage: open <appname>');
                    break;
                }
                const appName = args[0].toLowerCase();
                const appMap = {
                    'server': {
                        id: 'model-viewer',
                        title: 'Server V2',
                        icon: '🧊',
                        defaultSize: { width: 600, height: 500 },
                        position: { x: 800, y: 100 },
                        state: {
                            url: '/assets/server_v2_console.glb',
                            autoFrame: false,
                            defaultZoom: 2.0,
                            minZoomDistance: 1,
                            defaultRotationY: 0,
                        }
                    },
                    'notes': { id: 'notes', title: 'Notes', icon: '📝' },
                    'maps': { id: 'maps', title: 'Maps - Metz', icon: '🗺️', defaultSize: { width: 800, height: 600 } }
                };

                if (appMap[appName]) {
                    openWindow(appMap[appName]);
                    if (appName === 'maps') {
                        writeln('Launching Geolocation Services...');
                    } else {
                        writeln(`Opening ${appName}...`);
                    }
                } else {
                    writeln(`open: application not found: ${appName}`);
                }
                break;

            // --- Server Control (Restricted to SSH) ---
            case 'shutdown':
            case 'reboot':
            case 'start':
                const isPower = main === 'start';
                if (args[0] && args[0].includes('server')) {
                    // Check if we are connected via SSH
                    if (connectedUser.current !== 'admin') {
                        writeln('Permission denied. Please log in to server via SSH first.');
                        break;
                    }

                    if (main === 'reboot') {
                        writeln('Rebooting remote server...');
                        setServerStatus('offline');
                        await simulateDelay(2000);
                        setServerStatus('online');
                        writeln('Server restart complete.');
                    } else if (main === 'shutdown') {
                        writeln('Shutting down remote server...');
                        await simulateDelay(1000);
                        setServerStatus('offline');
                        writeln('Connection closed by remote host.');
                    } else if (main === 'start') {
                        writeln('Sending Wake-On-LAN packet...');
                        await simulateDelay(1000);
                        setServerStatus('online');
                        writeln('Server started.');
                    }
                } else {
                    writeln(`usage: ${main} <hostname>`);
                }
                break;

            case 'ping':
                if (!args[0]) { writeln('usage: ping <hostname>'); break; }
                const targetHost = args[0];
                const isManagedServer = targetHost.includes('server') || targetHost.includes('192.168.1.10');

                writeln(`PING ${targetHost} (192.168.1.10): 56 data bytes`);
                for (let i = 0; i < 4; i++) {
                    await simulateDelay(800);
                    if (isManagedServer && serverStatusRef.current === 'offline') {
                        writeln(`Request timeout for icmp_seq ${i}`);
                    } else {
                        writeln(`64 bytes from 192.168.1.10: icmp_seq=${i} ttl=64 time=${(Math.random() * 10 + 2).toFixed(3)} ms`);
                    }
                }
                writeln(`--- ${targetHost} ping statistics ---`);
                const isOffline = isManagedServer && serverStatusRef.current === 'offline';
                writeln(`4 packets transmitted, ${isOffline ? '0' : '4'} packets received, ${isOffline ? '100%' : '0%'} packet loss`);
                break;

            case 'exit':
                if (terminalState.current === 'CONNECTED') {
                    terminalState.current = 'NORMAL';
                    connectedUser.current = 'yassine';
                    connectedHost.current = 'macbook';
                    writeln('logout');
                    writeln('Connection to 192.168.1.10 closed.');

                    // Close Server Window by finding its ID
                    const serverWindow = windowsRef.current.find(w => w.appId === 'model-viewer');
                    if (serverWindow) {
                        closeWindow(serverWindow.id);
                    }
                } else {
                    // Correctly close terminal itself
                    const termWindow = windowsRef.current.find(w => w.appId === 'terminal');
                    if (termWindow) {
                        closeWindow(termWindow.id);
                    } else {
                        closeWindow('terminal');
                    }
                }
                break;
            default:
                writeln(`zsh: command not found: ${main}`);
        }
        prompt();
    };

    return (
        <div className="w-full h-full bg-[#1e1e1e]" ref={terminalRef} style={{ padding: '4px' }} />
    );
};

export default Terminal;

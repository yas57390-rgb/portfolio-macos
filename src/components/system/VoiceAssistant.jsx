import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../contexts/OSContext';
import { useMusic } from '../../contexts/MusicContext';
import { FaMicrophone, FaTimes } from 'react-icons/fa';

const VoiceAssistant = ({ isOpen, onClose }) => {
    const {
        openWindow, windows, closeWindow, setTheme,
        minimizeWindow, maximizeWindow, activeWindowId,
        setVolume, setBrightness, serverStatus, setServerStatus
    } = useOS();
    const { togglePlay, isPlaying } = useMusic();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('Comment puis-je vous aider ?');
    const recognitionRef = useRef(null);

    // Refs to hold latest state for the callback
    const stateRef = useRef({
        windows, activeWindowId, serverStatus, isPlaying,
        openWindow, closeWindow, setTheme, minimizeWindow, maximizeWindow,
        setVolume, setBrightness, setServerStatus, togglePlay, onClose
    });

    // Update refs on every render
    useEffect(() => {
        stateRef.current = {
            windows, activeWindowId, serverStatus, isPlaying,
            openWindow, closeWindow, setTheme, minimizeWindow, maximizeWindow,
            setVolume, setBrightness, setServerStatus, togglePlay, onClose
        };
    }, [windows, activeWindowId, serverStatus, isPlaying, openWindow, closeWindow, setTheme, minimizeWindow, maximizeWindow, setVolume, setBrightness, setServerStatus, togglePlay, onClose]);


    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'fr-FR';
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setFeedback('J\'écoute...');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                processCommandCallback(text);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setFeedback("Désolé, je n'ai pas compris.");
                setIsListening(false);
            };
        } else {
            setFeedback("Votre navigateur ne supporte pas la reconnaissance vocale.");
        }
    }, []);

    useEffect(() => {
        if (isOpen && recognitionRef.current) {
            setTranscript('');
            setFeedback("J'écoute...");
            try {
                recognitionRef.current.start();
            } catch (e) { }
        } else if (!isOpen && recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) { }
        }
    }, [isOpen]);

    const processCommandCallback = (cmd) => {
        const lowerCmd = cmd.toLowerCase();
        let actionTaken = false;

        // Access latest state via ref
        const {
            windows, activeWindowId, serverStatus, isPlaying,
            openWindow, closeWindow, setTheme, minimizeWindow, maximizeWindow,
            setVolume, setBrightness, setServerStatus, togglePlay, onClose
        } = stateRef.current;

        // --- 1. APPS & LAUNCHING ---
        const apps = [
            { id: 'terminal', triggers: ['terminal', 'console', 'commande'], task: { id: 'terminal', title: 'Terminal', appId: 'terminal' } },
            { id: 'finder', triggers: ['finder', 'dossier', 'fichiers', 'explorer'], task: { id: 'finder', title: 'Finder', appId: 'finder' } },
            { id: 'music', triggers: ['musique', 'spotify', 'chanson', 'audio'], task: { id: 'music', title: 'Music', appId: 'music' } },
            { id: 'vscode', triggers: ['code', 'éditeur', 'vscode', 'développement', 'programme'], task: { id: 'vscode', title: 'VS Code', appId: 'vscode', defaultSize: { width: 900, height: 600 } } },
            { id: 'calculator', triggers: ['calculatrice', 'calc', 'maths'], task: { id: 'calculator', title: 'Calculator', appId: 'calculator' } },
            { id: 'notes', triggers: ['notes', 'bloc-notes', 'écrire', 'mémo'], task: { id: 'notes', title: 'Notes', appId: 'notes' } },
            { id: 'maps', triggers: ['cartes', 'plan', 'maps', 'gps', 'localisation'], task: { id: 'maps', title: 'Maps - Metz', appId: 'maps', defaultSize: { width: 800, height: 600 } } },
            { id: 'it-toolkit', triggers: ['réseau', 'ip', 'toolkit', 'outils', 'scan'], task: { id: 'it-toolkit', title: 'IT Toolkit', appId: 'it-toolkit', defaultSize: { width: 850, height: 600 } } },
            { id: 'model-viewer', triggers: ['3d', 'cube', 'modèle', 'viewer'], task: { id: 'model-viewer', title: '3D Viewer', appId: 'model-viewer' } },
            { id: 'contact', triggers: ['contact', 'mail', 'email', 'message'], task: { id: 'contact', title: 'Contact', appId: 'contact' } },
            { id: 'rss', triggers: ['rss', 'veille', 'news', 'actualités'], task: { id: 'rss', title: 'Flux RSS', appId: 'rss' } },
            { id: 'settings', triggers: ['réglages', 'paramètres', 'config', 'options'], task: { id: 'settings', title: 'Settings', appId: 'settings' } },
            { id: 'doom', triggers: ['doom', 'jeu', 'fps'], task: { id: 'game-center', title: 'Game Center', appId: 'game-center', state: { activeGame: 'doom' } } },
            { id: 'youtube', triggers: ['youtube', 'vidéo', 'film', 'clip'], task: { id: 'video-player', title: 'Video Player', appId: 'video-player' } }
        ];

        // NEW: SSH Command
        if (lowerCmd.includes('connecte-toi') || (lowerCmd.includes('connecte') && lowerCmd.includes('ssh'))) {
            openWindow({
                id: 'terminal',
                title: 'Terminal - SSH Auto',
                appId: 'terminal',
                state: { initialCommand: 'ssh admin@192.168.1.10' }
            });
            setFeedback("Lancement du Terminal et connexion SSH...");
            actionTaken = true;
        }

        if (!actionTaken) {
            if (lowerCmd.includes('linkedin')) {
                window.open('https://www.linkedin.com/in/yassine-dinar', '_blank');
                setFeedback("Ouverture de LinkedIn...");
                actionTaken = true;
            } else if (lowerCmd.includes('github')) {
                window.open('https://github.com/Yassinedinar', '_blank');
                setFeedback("Ouverture de GitHub...");
                actionTaken = true;
            } else if (lowerCmd.includes('cv') || lowerCmd.includes('curriculum') || lowerCmd.includes('resume')) {
                openWindow({
                    id: 'pdf-viewer',
                    title: 'CV - Yassine Dinar',
                    appId: 'pdf-viewer',
                    file: { name: 'CV_Yassine_Dinar.pdf', url: '/cv-yassine-dinar.pdf' }
                });
                setFeedback("Ouverture du CV...");
                actionTaken = true;
            }
        }

        if (!actionTaken && (lowerCmd.includes('ouvre') || lowerCmd.includes('lance') || lowerCmd.includes('démarrer') || lowerCmd.includes('jouer à') || lowerCmd.includes('regarder'))) {
            const app = apps.find(a => a.triggers.some(t => lowerCmd.includes(t)));
            if (app) {
                openWindow(app.task);
                setFeedback(`Ouverture de ${app.task.title}...`);
                actionTaken = true;
            } else if (lowerCmd.includes('navigateur') || lowerCmd.includes('internet') || lowerCmd.includes('google')) {
                openWindow({ id: 'browser', title: 'Browser', appId: 'browser' });
                setFeedback("Lancement du navigateur...");
                actionTaken = true;
            }
        }

        // --- 2. UTILS (Prioritized over System to avoid trigger conflicts like "jour") ---
        if (!actionTaken) {
            // Time & Date
            if (lowerCmd.includes('heure')) {
                const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                setFeedback(`Il est ${time}.`);
                actionTaken = true;
            } else if ((lowerCmd.includes('date') || lowerCmd.includes('jour')) && !lowerCmd.includes('mode')) {
                const date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
                setFeedback(`Nous sommes le ${date}.`);
                actionTaken = true;
            }

            // Server
            if (lowerCmd.includes('serveur')) {
                if (lowerCmd.includes('état') || lowerCmd.includes('status')) {
                    setFeedback(`Le serveur est actuellement ${serverStatus === 'online' ? 'EN LIGNE' : 'HORS LIGNE'}.`);
                    actionTaken = true;
                } else if (lowerCmd.includes('allume') || lowerCmd.includes('démarre')) {
                    setServerStatus('online');
                    openWindow({
                        id: 'model-viewer',
                        title: 'Server V2',
                        appId: 'model-viewer',
                        state: { url: '/assets/server_v2_console.glb' }
                    });
                    setFeedback("Signal Wake-On-LAN envoyé. Serveur démarré.");
                    actionTaken = true;
                } else if (lowerCmd.includes('éteins') || lowerCmd.includes('stop')) {
                    setServerStatus('offline');
                    setFeedback("Arrêt du serveur en cours...");
                    actionTaken = true;
                }
            }

            // Battery
            if (lowerCmd.includes('batterie') || lowerCmd.includes('niveau') && lowerCmd.includes('charge')) {
                if ('getBattery' in navigator) {
                    navigator.getBattery().then(battery => {
                        const level = Math.round(battery.level * 100);
                        const isCharging = battery.charging;
                        setFeedback(`La batterie est à ${level}%${isCharging ? ' et en charge' : ''}.`);
                    });
                    actionTaken = true;
                } else {
                    setFeedback("Je ne peux pas accéder aux infos de batterie.");
                    actionTaken = true;
                }
            }
        }

        // --- 3. WINDOW MANAGEMENT ---
        if (!actionTaken) {
            if (lowerCmd.includes('ferme tout') || lowerCmd.includes('bureau') || lowerCmd.includes('tout fermer')) {
                windows.forEach(w => closeWindow(w.id));
                setFeedback("Retour au bureau.");
                actionTaken = true;
            } else if (lowerCmd.includes('ferme')) {
                if (activeWindowId) {
                    closeWindow(activeWindowId);
                    setFeedback("Fenêtre fermée.");
                    actionTaken = true;
                } else if (windows.length > 0) {
                    closeWindow(windows[windows.length - 1].id);
                    setFeedback("Fermeture de la dernière fenêtre.");
                    actionTaken = true;
                }
            } else if (lowerCmd.includes('réduire') || lowerCmd.includes('minimiser') || lowerCmd.includes('cache')) {
                if (activeWindowId) {
                    minimizeWindow(activeWindowId);
                    setFeedback("Fenêtre réduite.");
                    actionTaken = true;
                }
            } else if (lowerCmd.includes('agrandir') || lowerCmd.includes('maximiser') || lowerCmd.includes('grand')) {
                if (activeWindowId) {
                    maximizeWindow(activeWindowId);
                    setFeedback("Fenêtre agrandie.");
                    actionTaken = true;
                }
            } else if (lowerCmd.includes('montre le bureau') || lowerCmd.includes('cacher tout')) {
                windows.forEach(w => minimizeWindow(w.id));
                setFeedback("Bureau affiché.");
                actionTaken = true;
            }
        }

        // --- 4. SYSTEM CONTROLS ---
        if (!actionTaken) {
            // Theme
            if (lowerCmd.includes('mode') || lowerCmd.includes('thème')) {
                if (lowerCmd.includes('sombre') || lowerCmd.includes('nuit') || lowerCmd.includes('dark')) {
                    setTheme('dark');
                    setFeedback("Mode sombre activé.");
                    actionTaken = true;
                } else if (lowerCmd.includes('clair') || lowerCmd.includes('jour') || lowerCmd.includes('lumière') || lowerCmd.includes('light')) {
                    setTheme('light');
                    setFeedback("Mode clair activé.");
                    actionTaken = true;
                }
            }

            // Volume
            if (lowerCmd.includes('volume') || lowerCmd.includes('son')) {
                if (lowerCmd.includes('max') || lowerCmd.includes('fond')) {
                    setVolume(100);
                    setFeedback("Volume au maximum.");
                    actionTaken = true;
                } else if (lowerCmd.includes('muet') || lowerCmd.includes('couper') || lowerCmd.includes('coupe') || lowerCmd.includes('silence')) {
                    setVolume(0);
                    setFeedback("Son coupé.");
                    actionTaken = true;
                } else if (lowerCmd.includes('augmente') || lowerCmd.includes('monte') || lowerCmd.includes('plus')) {
                    setVolume(prev => Math.min(100, prev + 20));
                    setFeedback("Volume augmenté.");
                    actionTaken = true;
                } else if (lowerCmd.includes('baisse') || lowerCmd.includes('diminue') || lowerCmd.includes('moins')) {
                    setVolume(prev => Math.max(0, prev - 20));
                    setFeedback("Volume diminué.");
                    actionTaken = true;
                } else {
                    const match = lowerCmd.match(/(\d+)/);
                    if (match) {
                        let vol = parseInt(match[1]);
                        if (vol > 100) vol = 100;
                        if (vol < 0) vol = 0;
                        setVolume(vol);
                        setFeedback(`Volume réglé à ${vol}%.`);
                        actionTaken = true;
                    }
                }
            }

            // Brightness
            if (lowerCmd.includes('luminosité') || lowerCmd.includes('lumière écran')) {
                const match = lowerCmd.match(/(\d+)/);
                if (match) {
                    let br = parseInt(match[1]);
                    if (br > 100) br = 100;
                    if (br < 10) br = 10;
                    setBrightness(br);
                    setFeedback(`Luminosité à ${br}%.`);
                    actionTaken = true;
                }
            }
        }

        // --- 5. MEDIA ---
        if (!actionTaken) {
            if (lowerCmd.includes('musique') || lowerCmd.includes('joue') || lowerCmd.includes('lecture') || lowerCmd.includes('play') || lowerCmd.includes('pause') || lowerCmd.includes('met')) {
                if (lowerCmd.includes('pause') || lowerCmd.includes('stop') || lowerCmd.includes('arrête')) {
                    if (isPlaying) { togglePlay(); setFeedback("Musique en pause."); }
                    else { setFeedback("La musique est déjà en pause."); }
                    actionTaken = true;
                } else if (lowerCmd.includes('joue') || lowerCmd.includes('play') || lowerCmd.includes('lancer') || lowerCmd.includes('met') || lowerCmd.includes('active')) {
                    if (!isPlaying) { togglePlay(); setFeedback("Lecture musique."); }
                    else { setFeedback("La musique joue déjà."); }
                    actionTaken = true;
                }
            }

            // Easter Eggs
            if (lowerCmd.includes('blague')) {
                const jokes = [
                    "Que fait un développeur qui s'ennuie ? Il se change les idées en C.",
                    "Pourquoi les programmeurs détestent la nature ? Trop de bugs.",
                    "Toc Toc ! Qui est là ? *Une boucle infinie* Toc Toc ! Qui est là ?...",
                    "Le hardware, c'est ce qu'on peut frapper. Le software, c'est ce qu'on peut seulement maudire."
                ];
                setFeedback(jokes[Math.floor(Math.random() * jokes.length)]);
                actionTaken = true;
            } else if (lowerCmd.includes('qui es-tu') || lowerCmd.includes('t\'es qui')) {
                setFeedback("Je suis l'assistant personnel de Yassine OS, conçu pour gérer votre portfolio.");
                actionTaken = true;
            }
        }

        if (!actionTaken) {
            setFeedback("Je ne connais pas cette commande, mais j'apprends vite !");
        }

        setTimeout(() => {
            onClose();
        }, 4000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center pb-20 pointer-events-none">
            <div className="pointer-events-auto bg-black/60 backdrop-blur-xl rounded-2xl p-6 text-white w-96 shadow-2xl border border-white/10 flex flex-col items-center animate-bounce-in">
                {/* Visualizer Animation */}
                <div className="relative w-full h-24 mb-4 flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5">
                    {/* Siri-like Waveform */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i}
                                className={`w-1 bg-gradient-to-t from-transparent via-blue-500 to-transparent rounded-full transition-all duration-100 ${isListening ? 'animate-wave' : 'h-1'}`}
                                style={{
                                    height: isListening ? `${20 + Math.random() * 60}%` : '4px',
                                    animationDelay: `${i * 0.1}s`
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                        <FaMicrophone className={`text-2xl transition-colors duration-300 ${isListening ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-white'}`} />
                    </div>
                </div>

                <h3 className="text-xl font-medium mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {transcript ? `"${transcript}"` : "Comment puis-je aider ?"}
                </h3>

                <p className="text-sm text-gray-300 mb-4 text-center px-4 leading-relaxed font-light">
                    {feedback}
                </p>

                <div className="flex gap-2 text-xs text-gray-500">
                    <span>"Ouvre Terminal"</span>
                    <span>•</span>
                    <span>"Mets de la musique"</span>
                    <span>•</span>
                    <span>"Il est quelle heure ?"</span>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default VoiceAssistant;

import React, { useEffect, useRef, useState } from 'react';

const Doom = ({ onBack }) => {
    const rootRef = useRef(null);
    const dosInstance = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!rootRef.current || dosInstance.current) return;

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                // Check if already loaded
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const loadStyle = (href) => {
            return new Promise((resolve) => {
                // Check if already loaded
                if (document.querySelector(`link[href="${href}"]`)) {
                    resolve();
                    return;
                }
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.onload = resolve;
                document.head.appendChild(link);
            });
        };

        // Flag to handle cleanup/abort
        let aborted = false;

        const waitForDos = (maxWait = 5000) => {
            return new Promise((resolve, reject) => {
                const start = Date.now();
                const check = () => {
                    if (aborted) {
                        reject(new Error('Aborted'));
                        return;
                    }
                    if (typeof window.Dos === 'function') {
                        resolve(window.Dos);
                    } else if (Date.now() - start > maxWait) {
                        reject(new Error('Timeout waiting for js-dos to load'));
                    } else {
                        setTimeout(check, 100);
                    }
                };
                check();
            });
        };

        const initDos = async () => {
            try {
                // Load js-dos from CDN
                await loadStyle('https://v8.js-dos.com/latest/js-dos.css');
                await loadScript('https://v8.js-dos.com/latest/js-dos.js');

                // Wait for Dos to be available on window (may take a moment after script loads)
                const Dos = await waitForDos();

                // Check if component was unmounted during async operations
                if (aborted || !rootRef.current) {
                    return;
                }

                // js-dos v8 API: Dos(element, options)
                const dos = Dos(rootRef.current, {
                    url: '/doom.jsdos',
                    theme: 'dark',
                    autoStart: true,
                    kiosk: true,
                    noNetworking: true,
                    noCloud: true,
                });

                if (!aborted) {
                    dosInstance.current = dos;
                    setLoading(false);
                }
            } catch (e) {
                if (aborted) return;
                console.error('Failed to start Doom:', e);
                setError(e.message);
                setLoading(false);
            }
        };

        initDos();

        // Cleanup function sets abort flag
        return () => {
            aborted = true;
            if (dosInstance.current && typeof dosInstance.current.stop === 'function') {
                dosInstance.current.stop();
            }
        };
    }, []);

    if (error) {
        return (
            <div className="w-full h-full bg-black flex items-center justify-center text-red-500 p-4">
                <div className="text-center">
                    <p className="text-lg font-bold mb-2">Failed to load DOOM</p>
                    <p className="text-sm opacity-75">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-black overflow-hidden relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="text-green-500 text-xl animate-pulse">Loading DOOM...</div>
                </div>
            )}
            <div ref={rootRef} className="w-full h-full" />
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold uppercase tracking-wider text-xs opacity-70 hover:opacity-100 transition-opacity"
                >
                    Exit Doom
                </button>
            )}
        </div>
    );
};

export default Doom;

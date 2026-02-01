import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

// ==========================================
// CONFIGURATION & DATA
// ==========================================

// Couleurs précises (Pixel Perfect)
const B = '#00599C'; // Bleu Mewo
const G = '#34A083'; // Vert Mewo
const P = '#D68E88'; // Rose/Beige Mewo
const R = '#6D1C24'; // Rouge Sombre (L'ombre du M de droite)
const O = '#E88D14'; // Orange Mewo
const _ = 0;         // Vide

// Matrice 12x11 (Largeur x Hauteur) pour plus de précision
// Basée sur la symétrie centrale du logo
const mewoLogoMap = [
    // 0  1  2  3  4  5  6  7  8  9  10 11
    [_, _, _, _, _, _, _, _, _, O, O, _], // 0
    [B, B, _, _, _, _, _, _, _, O, O, _], // 1
    [B, B, _, G, _, _, _, _, R, O, O, _], // 2
    [B, B, G, G, _, _, _, P, R, O, O, _], // 3
    [B, B, B, G, _, _, P, P, R, _, O, _], // 4
    [B, B, _, G, G, _, P, R, R, _, O, _], // 5
    [B, B, _, _, G, P, P, _, _, _, O, _], // 6
    [B, B, _, _, _, G, _, _, _, _, O, _], // 7
    [B, B, _, _, _, _, _, _, _, _, O, _], // 8
    [B, B, _, _, _, _, _, _, _, _, _, _], // 9
    [_, _, _, _, _, _, _, _, _, _, _, _], // 10
];

// Ajustement pour centrer visuellement le "M"
// La grille est un peu plus large que haute

// ==========================================
// INTERNAL STYLES
// ==========================================

const InternalStyles = () => (
    <style>{`
        .mewo-container {
            width: 320px;
            height: 320px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mewo-transformer {
            transform: scale(0.9); 
            transition: transform 0.5s ease;
        }
        .mewo-transformer:hover {
            transform: scale(0.95);
        }
        .cubes-wrapper {
            position: relative;
            aspect-ratio: 12 / 11; /* Ratio basé sur la grille */
        }
        .cubes-grid {
            display: grid;
            width: 100%;
            height: 100%;
        }
        .cube {
            position: relative;
            width: 100%;
            height: 100%;
            aspect-ratio: 1 / 1;
            transform-style: preserve-3d;
        }
        .cube-face {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden; 
        }
    `}</style>
);

// ==========================================
// LOGIC (Cubes)
// ==========================================

const Cubes = ({
    gridSizeX = 12,
    gridSizeY = 11,
    cubeSize,
    maxAngle = 35,
    radius = 5,
    easing = 'power3.out',
    duration = { enter: 0.4, leave: 0.7 },
    cellGap,
    faceColor = '#1a1a2e',
    shadow = true,
    autoAnimate = true,
    rippleOnClick = true,
    rippleColor = '#ffffff',
    rippleSpeed = 1.0,
    colorMap = null,
    rotationDeg = 0
}) => {
    const sceneRef = useRef(null);
    const rafRef = useRef(null);
    const idleTimerRef = useRef(null);
    const userActiveRef = useRef(false);
    const simPosRef = useRef({ x: 0, y: 0 });
    const simTargetRef = useRef({ x: 0, y: 0 });
    const simRAFRef = useRef(null);

    const colGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.col !== undefined ? `${cellGap.col}px` : '2px';
    const rowGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.row !== undefined ? `${cellGap.row}px` : '2px';

    const enterDur = duration.enter;
    const leaveDur = duration.leave;

    const colorLookup = useMemo(() => {
        const lookup = {};
        for (let r = 0; r < gridSizeY; r++) {
            for (let c = 0; c < gridSizeX; c++) {
                if (!colorMap) {
                    lookup[`${r}-${c}`] = faceColor;
                } else {
                    const cellValue = colorMap[r]?.[c];
                    if (cellValue === false || cellValue === 0 || cellValue === null) {
                        lookup[`${r}-${c}`] = null;
                    } else if (typeof cellValue === 'string') {
                        lookup[`${r}-${c}`] = cellValue;
                    } else {
                        lookup[`${r}-${c}`] = faceColor;
                    }
                }
            }
        }
        return lookup;
    }, [colorMap, gridSizeX, gridSizeY, faceColor]);

    const rotationRad = (rotationDeg * Math.PI) / 180;
    const transformCoords = useCallback((x, y, centerX, centerY) => {
        const dx = x - centerX;
        const dy = y - centerY;
        const cos = Math.cos(-rotationRad);
        const sin = Math.sin(-rotationRad);
        const newX = dx * cos - dy * sin + centerX;
        const newY = dx * sin + dy * cos + centerY;
        return { x: newX, y: newY };
    }, [rotationRad]);

    const tiltAt = useCallback(
        (rowCenter, colCenter) => {
            if (!sceneRef.current) return;
            sceneRef.current.querySelectorAll('.cube').forEach(cube => {
                const r = +cube.dataset.row;
                const c = +cube.dataset.col;
                const dist = Math.hypot(r - rowCenter, c - colCenter);
                if (dist <= radius) {
                    const pct = 1 - dist / radius;
                    const angle = pct * maxAngle;
                    gsap.to(cube, {
                        duration: enterDur,
                        ease: easing,
                        overwrite: true,
                        rotateX: -angle,
                        rotateY: angle,
                        z: 15 * pct
                    });
                } else {
                    gsap.to(cube, {
                        duration: leaveDur,
                        ease: 'power3.out',
                        overwrite: true,
                        rotateX: 0,
                        rotateY: 0,
                        z: 0
                    });
                }
            });
        },
        [radius, maxAngle, enterDur, leaveDur, easing]
    );

    const onPointerMove = useCallback(e => {
        if (!sceneRef.current) return;
        userActiveRef.current = true;
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        const rect = sceneRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const transformed = transformCoords(e.clientX, e.clientY, centerX, centerY);
        const cellW = rect.width / gridSizeX;
        const cellH = rect.height / gridSizeY;
        const colCenter = (transformed.x - rect.left) / cellW;
        const rowCenter = (transformed.y - rect.top) / cellH;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
        idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 3000);
    }, [gridSizeX, gridSizeY, tiltAt, transformCoords]);

    const resetAll = useCallback(() => {
        if (!sceneRef.current) return;
        sceneRef.current.querySelectorAll('.cube').forEach(cube =>
            gsap.to(cube, { duration: leaveDur, rotateX: 0, rotateY: 0, z: 0, ease: 'power3.out' })
        );
    }, [leaveDur]);

    const onTouchMove = useCallback(
        e => {
            if (!sceneRef.current) return;
            e.preventDefault();
            userActiveRef.current = true;
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            const rect = sceneRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const touch = e.touches[0];
            const transformed = transformCoords(touch.clientX, touch.clientY, centerX, centerY);
            const cellW = rect.width / gridSizeX;
            const cellH = rect.height / gridSizeY;
            const colCenter = (transformed.x - rect.left) / cellW;
            const rowCenter = (transformed.y - rect.top) / cellH;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
            idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 3000);
        }, [gridSizeX, gridSizeY, tiltAt, transformCoords]
    );

    const onClick = useCallback(e => {
        if (!rippleOnClick || !sceneRef.current) return;
        const rect = sceneRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        const transformed = transformCoords(clientX, clientY, centerX, centerY);
        const cellW = rect.width / gridSizeX;
        const cellH = rect.height / gridSizeY;
        const colHit = Math.floor((transformed.x - rect.left) / cellW);
        const rowHit = Math.floor((transformed.y - rect.top) / cellH);

        const baseRingDelay = 0.1;
        const animDuration = 0.3;
        const rings = {};
        sceneRef.current.querySelectorAll('.cube').forEach(cube => {
            const r = +cube.dataset.row;
            const c = +cube.dataset.col;
            const dist = Math.hypot(r - rowHit, c - colHit);
            const ring = Math.round(dist);
            if (!rings[ring]) rings[ring] = [];
            rings[ring].push(cube);
        });
        Object.keys(rings).map(Number).sort((a, b) => a - b).forEach(ring => {
            const delay = ring * (baseRingDelay / rippleSpeed);
            rings[ring].forEach(cube => {
                const r = +cube.dataset.row;
                const c = +cube.dataset.col;
                const originalColor = colorLookup[`${r}-${c}`] || faceColor;
                const faces = Array.from(cube.querySelectorAll('.cube-face'));
                gsap.to(faces, { backgroundColor: rippleColor, duration: animDuration, delay, ease: 'power3.out' });
                gsap.to(faces, { backgroundColor: originalColor, duration: animDuration, delay: delay + animDuration + 0.5, ease: 'power3.out' });
            });
        });
    }, [rippleOnClick, gridSizeX, gridSizeY, rippleColor, rippleSpeed, transformCoords, colorLookup, faceColor]);

    useEffect(() => {
        if (!autoAnimate || !sceneRef.current) return;
        simPosRef.current = { x: Math.random() * gridSizeX, y: Math.random() * gridSizeY };
        simTargetRef.current = { x: Math.random() * gridSizeX, y: Math.random() * gridSizeY };
        const speed = 0.015;
        const loop = () => {
            if (!userActiveRef.current) {
                const pos = simPosRef.current;
                const tgt = simTargetRef.current;
                pos.x += (tgt.x - pos.x) * speed;
                pos.y += (tgt.y - pos.y) * speed;
                tiltAt(pos.y, pos.x);
                if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.2) {
                    simTargetRef.current = { x: Math.random() * gridSizeX, y: Math.random() * gridSizeY };
                }
            }
            simRAFRef.current = requestAnimationFrame(loop);
        };
        simRAFRef.current = requestAnimationFrame(loop);
        return () => { if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current); };
    }, [autoAnimate, gridSizeX, gridSizeY, tiltAt]);

    useEffect(() => {
        const el = sceneRef.current;
        if (!el) return;
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerleave', resetAll);
        el.addEventListener('click', onClick);
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        return () => {
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerleave', resetAll);
            el.removeEventListener('click', onClick);
            el.removeEventListener('touchmove', onTouchMove);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [onPointerMove, resetAll, onClick, onTouchMove]);

    const cellsY = Array.from({ length: gridSizeY });
    const cellsX = Array.from({ length: gridSizeX });

    // Grille personnalisée 12x11
    const sceneStyle = {
        gridTemplateColumns: `repeat(${gridSizeX}, 1fr)`,
        gridTemplateRows: `repeat(${gridSizeY}, 1fr)`,
        columnGap: colGap,
        rowGap: rowGap,
        perspective: '1000px',
    };
    const wrapperStyle = {
        ...(cubeSize ? { width: `${gridSizeX * cubeSize}px`, height: `${gridSizeY * cubeSize}px` } : {})
    };

    return (
        <div className="cubes-wrapper" style={wrapperStyle}>
            <div ref={sceneRef} className="cubes-grid" style={sceneStyle}>
                {cellsY.map((_, r) =>
                    cellsX.map((__, c) => {
                        const cubeColor = colorLookup[`${r}-${c}`];
                        if (cubeColor === null) return <div key={`${r}-${c}`} className="w-full h-full" />;
                        return (
                            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
                                { /* Faces with minimal shading */}
                                <div className="cube-face" style={{ background: cubeColor, transform: 'translateY(-50%) rotateX(90deg)', boxShadow: shadow ? 'inset 0 0 10px rgba(0,0,0,0.1)' : 'none' }} />
                                <div className="cube-face" style={{ background: cubeColor, transform: 'translateY(50%) rotateX(-90deg)', boxShadow: shadow ? 'inset 0 0 10px rgba(0,0,0,0.2)' : 'none' }} />
                                <div className="cube-face" style={{ background: cubeColor, transform: 'translateX(-50%) rotateY(-90deg)', boxShadow: shadow ? 'inset 0 0 10px rgba(0,0,0,0.1)' : 'none' }} />
                                <div className="cube-face" style={{ background: cubeColor, transform: 'translateX(50%) rotateY(90deg)', boxShadow: shadow ? 'inset 0 0 10px rgba(0,0,0,0.1)' : 'none' }} />
                                <div className="cube-face" style={{ background: cubeColor, transform: 'rotateY(-90deg) translateX(50%) rotateY(90deg)', filter: 'brightness(1.1)' }} />
                                <div className="cube-face" style={{ background: cubeColor, transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)', filter: 'brightness(0.9)' }} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

// ==========================================
// EXPORT COMPONENT
// ==========================================

const MewoCubeLogo = () => {
    return (
        <>
            <InternalStyles />
            <div className="mewo-container">
                <div className="mewo-transformer">
                    <Cubes
                        gridSizeX={12}
                        gridSizeY={11}
                        cubeSize={24}
                        maxAngle={40}
                        radius={5}
                        borderStyle="none"
                        shadow={true}
                        faceColor="#1a1a2e"
                        rippleColor="#ffffff"
                        rippleSpeed={1.0}
                        autoAnimate={true}
                        rippleOnClick={true}
                        colorMap={mewoLogoMap}
                        rotationDeg={0}
                    />
                </div>
            </div>
        </>
    );
};

export default MewoCubeLogo;

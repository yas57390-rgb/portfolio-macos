// CREDIT: Component inspired from Can Tastemel's original work for the lambda.ai landing page
// https://cantastemel.com
// Modified to support per-cube coloring via colorMap prop and rotation compensation

import { useCallback, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

const Cubes = ({
    gridSize = 10,
    cubeSize,
    maxAngle = 45,
    radius = 3,
    easing = 'power3.out',
    duration = { enter: 0.3, leave: 0.6 },
    cellGap,
    borderStyle = '1px solid #fff',
    faceColor = '#060010',
    shadow = false,
    autoAnimate = true,
    rippleOnClick = true,
    rippleColor = '#fff',
    rippleSpeed = 2,
    colorMap = null, // 2D array: null = use faceColor, string = use that color, false/0 = hide cube
    rotationDeg = 0  // Rotation of parent container in degrees (for coordinate compensation)
}) => {
    const sceneRef = useRef(null);
    const rafRef = useRef(null);
    const idleTimerRef = useRef(null);
    const userActiveRef = useRef(false);
    const simPosRef = useRef({ x: 0, y: 0 });
    const simTargetRef = useRef({ x: 0, y: 0 });
    const simRAFRef = useRef(null);

    const colGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.col !== undefined ? `${cellGap.col}px` : '5%';
    const rowGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.row !== undefined ? `${cellGap.row}px` : '5%';

    const enterDur = duration.enter;
    const leaveDur = duration.leave;

    // Pre-compute color map for quick access and ripple return
    const colorLookup = useMemo(() => {
        const lookup = {};
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
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
    }, [colorMap, gridSize, faceColor]);

    // Convert rotation to radians for coordinate transformation
    const rotationRad = (rotationDeg * Math.PI) / 180;

    // Transform mouse coordinates to account for parent rotation
    const transformCoords = useCallback((x, y, centerX, centerY) => {
        // Translate to origin
        const dx = x - centerX;
        const dy = y - centerY;

        // Rotate back by the negative of the parent rotation
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
                        rotateY: angle
                    });
                } else {
                    gsap.to(cube, {
                        duration: leaveDur,
                        ease: 'power3.out',
                        overwrite: true,
                        rotateX: 0,
                        rotateY: 0
                    });
                }
            });
        },
        [radius, maxAngle, enterDur, leaveDur, easing]
    );

    const onPointerMove = useCallback(
        e => {
            if (!sceneRef.current) return;
            userActiveRef.current = true;
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            const rect = sceneRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Transform mouse coordinates to compensate for rotation
            const transformed = transformCoords(e.clientX, e.clientY, centerX, centerY);

            const cellW = rect.width / gridSize;
            const cellH = rect.height / gridSize;
            const colCenter = (transformed.x - rect.left) / cellW;
            const rowCenter = (transformed.y - rect.top) / cellH;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

            idleTimerRef.current = setTimeout(() => {
                userActiveRef.current = false;
            }, 3000);
        },
        [gridSize, tiltAt, transformCoords]
    );

    const resetAll = useCallback(() => {
        if (!sceneRef.current) return;
        sceneRef.current.querySelectorAll('.cube').forEach(cube =>
            gsap.to(cube, {
                duration: leaveDur,
                rotateX: 0,
                rotateY: 0,
                ease: 'power3.out'
            })
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

            const cellW = rect.width / gridSize;
            const cellH = rect.height / gridSize;
            const colCenter = (transformed.x - rect.left) / cellW;
            const rowCenter = (transformed.y - rect.top) / cellH;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

            idleTimerRef.current = setTimeout(() => {
                userActiveRef.current = false;
            }, 3000);
        },
        [gridSize, tiltAt, transformCoords]
    );

    const onTouchStart = useCallback(() => {
        userActiveRef.current = true;
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!sceneRef.current) return;
        resetAll();
    }, [resetAll]);

    const onClick = useCallback(
        e => {
            if (!rippleOnClick || !sceneRef.current) return;
            const rect = sceneRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            const transformed = transformCoords(clientX, clientY, centerX, centerY);

            const cellW = rect.width / gridSize;
            const cellH = rect.height / gridSize;

            const colHit = Math.floor((transformed.x - rect.left) / cellW);
            const rowHit = Math.floor((transformed.y - rect.top) / cellH);

            const baseRingDelay = 0.15;
            const baseAnimDur = 0.3;
            const baseHold = 0.6;

            const spreadDelay = baseRingDelay / rippleSpeed;
            const animDuration = baseAnimDur / rippleSpeed;
            const holdTime = baseHold / rippleSpeed;

            const rings = {};
            sceneRef.current.querySelectorAll('.cube').forEach(cube => {
                const r = +cube.dataset.row;
                const c = +cube.dataset.col;
                const dist = Math.hypot(r - rowHit, c - colHit);
                const ring = Math.round(dist);
                if (!rings[ring]) rings[ring] = [];
                rings[ring].push(cube);
            });

            Object.keys(rings)
                .map(Number)
                .sort((a, b) => a - b)
                .forEach(ring => {
                    const delay = ring * spreadDelay;

                    rings[ring].forEach(cube => {
                        const r = +cube.dataset.row;
                        const c = +cube.dataset.col;
                        const originalColor = colorLookup[`${r}-${c}`] || faceColor;
                        const faces = Array.from(cube.querySelectorAll('.cube-face'));

                        // Animate to ripple color
                        gsap.to(faces, {
                            backgroundColor: rippleColor,
                            duration: animDuration,
                            delay,
                            ease: 'power3.out'
                        });
                        // Animate back to ORIGINAL color (not faceColor)
                        gsap.to(faces, {
                            backgroundColor: originalColor,
                            duration: animDuration,
                            delay: delay + animDuration + holdTime,
                            ease: 'power3.out'
                        });
                    });
                });
        },
        [rippleOnClick, gridSize, rippleColor, rippleSpeed, transformCoords, colorLookup, faceColor]
    );

    useEffect(() => {
        if (!autoAnimate || !sceneRef.current) return;
        simPosRef.current = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize
        };
        simTargetRef.current = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize
        };
        const speed = 0.02;
        const loop = () => {
            if (!userActiveRef.current) {
                const pos = simPosRef.current;
                const tgt = simTargetRef.current;
                pos.x += (tgt.x - pos.x) * speed;
                pos.y += (tgt.y - pos.y) * speed;
                tiltAt(pos.y, pos.x);
                if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
                    simTargetRef.current = {
                        x: Math.random() * gridSize,
                        y: Math.random() * gridSize
                    };
                }
            }
            simRAFRef.current = requestAnimationFrame(loop);
        };
        simRAFRef.current = requestAnimationFrame(loop);
        return () => {
            if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current);
        };
    }, [autoAnimate, gridSize, tiltAt]);

    useEffect(() => {
        const el = sceneRef.current;
        if (!el) return;

        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerleave', resetAll);
        el.addEventListener('click', onClick);

        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerleave', resetAll);
            el.removeEventListener('click', onClick);

            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);

            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);

    const cells = Array.from({ length: gridSize });
    const sceneStyle = {
        gridTemplateColumns: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
        columnGap: colGap,
        rowGap: rowGap,
        perspective: '99999999px',
        gridAutoRows: '1fr'
    };
    const wrapperStyle = {
        '--cube-face-border': borderStyle,
        '--cube-face-bg': faceColor,
        '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',
        ...(cubeSize
            ? {
                width: `${gridSize * cubeSize}px`,
                height: `${gridSize * cubeSize}px`
            }
            : {})
    };

    return (
        <div className="relative aspect-square" style={wrapperStyle}>
            <div ref={sceneRef} className="grid w-full h-full" style={sceneStyle}>
                {cells.map((_, r) =>
                    cells.map((__, c) => {
                        const cubeColor = colorLookup[`${r}-${c}`];

                        // Don't render cube if color is null (hidden)
                        if (cubeColor === null) {
                            return <div key={`${r}-${c}`} className="w-full h-full" />;
                        }

                        return (
                            <div
                                key={`${r}-${c}`}
                                className="cube relative w-full h-full aspect-square [transform-style:preserve-3d]"
                                data-row={r}
                                data-col={c}
                            >
                                <span className="absolute pointer-events-none -inset-9" />

                                <div
                                    className="cube-face absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: cubeColor,
                                        border: 'var(--cube-face-border)',
                                        boxShadow: 'var(--cube-face-shadow)',
                                        transform: 'translateY(-50%) rotateX(90deg)'
                                    }}
                                />
                                <div
                                    className="cube-face absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: cubeColor,
                                        border: 'var(--cube-face-border)',
                                        boxShadow: 'var(--cube-face-shadow)',
                                        transform: 'translateY(50%) rotateX(-90deg)'
                                    }}
                                />
                                <div
                                    className="cube-face absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: cubeColor,
                                        border: 'var(--cube-face-border)',
                                        boxShadow: 'var(--cube-face-shadow)',
                                        transform: 'translateX(-50%) rotateY(-90deg)'
                                    }}
                                />
                                <div
                                    className="cube-face absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: cubeColor,
                                        border: 'var(--cube-face-border)',
                                        boxShadow: 'var(--cube-face-shadow)',
                                        transform: 'translateX(50%) rotateY(90deg)'
                                    }}
                                />
                                <div
                                    className="cube-face absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: cubeColor,
                                        border: 'var(--cube-face-border)',
                                        boxShadow: 'var(--cube-face-shadow)',
                                        transform: 'rotateY(-90deg) translateX(50%) rotateY(90deg)'
                                    }}
                                />
                                <div
                                    className="cube-face absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: cubeColor,
                                        border: 'var(--cube-face-border)',
                                        boxShadow: 'var(--cube-face-shadow)',
                                        transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)'
                                    }}
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Cubes;

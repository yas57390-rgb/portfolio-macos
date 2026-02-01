import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FaChevronLeft, FaPlay, FaRedo } from 'react-icons/fa';

const GAME_WIDTH = 320;
const GAME_HEIGHT = 480;
const GRAVITY = 0.4;
const JUMP_FORCE = -12;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const PLATFORM_WIDTH = 60;
const PLATFORM_HEIGHT = 15;

// Difficulty settings based on score thresholds
const getDifficulty = (score) => {
    if (score < 500) return {
        gapMin: 50, gapMax: 70,
        movingChance: 0.1,
        breakingChance: 0,
        platformSpeed: 1.5,
        level: 1
    };
    if (score < 1500) return {
        gapMin: 60, gapMax: 85,
        movingChance: 0.2,
        breakingChance: 0.05,
        platformSpeed: 2,
        level: 2
    };
    if (score < 3000) return {
        gapMin: 70, gapMax: 100,
        movingChance: 0.3,
        breakingChance: 0.1,
        platformSpeed: 2.5,
        level: 3
    };
    if (score < 5000) return {
        gapMin: 80, gapMax: 110,
        movingChance: 0.35,
        breakingChance: 0.15,
        platformSpeed: 3,
        level: 4
    };
    return {
        gapMin: 90, gapMax: 120,
        movingChance: 0.4,
        breakingChance: 0.2,
        platformSpeed: 3.5,
        level: 5
    };
};

const DoodleJumpApp = ({ onClose }) => {
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const [gameState, setGameState] = useState('menu');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('doodle-highscore') || '0');
    });

    const playerRef = useRef({
        x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: GAME_HEIGHT - 100,
        vx: 0,
        vy: 0,
        direction: 1
    });
    const platformsRef = useRef([]);
    const scoreRef = useRef(0);
    const touchRef = useRef({ left: false, right: false });

    const initGame = useCallback(() => {
        const platforms = [];
        platforms.push({
            x: GAME_WIDTH / 2 - PLATFORM_WIDTH / 2,
            y: GAME_HEIGHT - 50,
            type: 'normal'
        });

        for (let i = 1; i < 8; i++) {
            platforms.push({
                x: Math.random() * (GAME_WIDTH - PLATFORM_WIDTH),
                y: GAME_HEIGHT - 50 - (i * 65),
                type: 'normal',
                moveDir: 1
            });
        }

        platformsRef.current = platforms;
        playerRef.current = {
            x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
            y: GAME_HEIGHT - 100,
            vx: 0,
            vy: 0,
            direction: 1
        };
        scoreRef.current = 0;
        setScore(0);
    }, []);

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const player = playerRef.current;
        const platforms = platformsRef.current;
        const currentScore = Math.floor(scoreRef.current / 10);
        const difficulty = getDifficulty(currentScore);

        // Background gradient based on level
        const bgColors = ['#87CEEB', '#6BB3D9', '#5A9EC6', '#4A89B3', '#3A74A0'];
        ctx.fillStyle = bgColors[difficulty.level - 1] || '#3A74A0';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Handle touch input
        if (touchRef.current.left) {
            player.vx = -5;
            player.direction = -1;
        } else if (touchRef.current.right) {
            player.vx = 5;
            player.direction = 1;
        } else {
            player.vx *= 0.9;
        }

        player.vy += GRAVITY;
        player.x += player.vx;
        player.y += player.vy;

        if (player.x < -PLAYER_WIDTH) player.x = GAME_WIDTH;
        if (player.x > GAME_WIDTH) player.x = -PLAYER_WIDTH;

        // Check platform collisions
        if (player.vy > 0) {
            platforms.forEach(platform => {
                if (platform.broken) return;
                if (
                    player.x + PLAYER_WIDTH > platform.x &&
                    player.x < platform.x + PLATFORM_WIDTH &&
                    player.y + PLAYER_HEIGHT > platform.y &&
                    player.y + PLAYER_HEIGHT < platform.y + PLATFORM_HEIGHT + player.vy
                ) {
                    if (platform.type === 'breaking') {
                        platform.broken = true;
                        platform.breakAnim = 0;
                    } else {
                        player.vy = JUMP_FORCE;
                        player.y = platform.y - PLAYER_HEIGHT;
                    }
                }
            });
        }

        // Scroll screen
        if (player.y < GAME_HEIGHT / 2) {
            const offset = GAME_HEIGHT / 2 - player.y;
            player.y = GAME_HEIGHT / 2;
            scoreRef.current += Math.floor(offset);
            setScore(Math.floor(scoreRef.current / 10));

            platforms.forEach(platform => {
                platform.y += offset;
            });

            platformsRef.current = platforms.filter(p => p.y < GAME_HEIGHT + 50 && !p.broken);

            while (platformsRef.current.length < 8) {
                const lastY = Math.min(...platformsRef.current.map(p => p.y));
                const gap = difficulty.gapMin + Math.random() * (difficulty.gapMax - difficulty.gapMin);

                let type = 'normal';
                const rand = Math.random();
                if (rand < difficulty.breakingChance) {
                    type = 'breaking';
                } else if (rand < difficulty.breakingChance + difficulty.movingChance) {
                    type = 'moving';
                }

                platformsRef.current.push({
                    x: Math.random() * (GAME_WIDTH - PLATFORM_WIDTH),
                    y: lastY - gap,
                    type,
                    moveDir: Math.random() > 0.5 ? 1 : -1
                });
            }
        }

        // Move moving platforms
        platforms.forEach(platform => {
            if (platform.type === 'moving') {
                platform.x += platform.moveDir * difficulty.platformSpeed;
                if (platform.x <= 0 || platform.x >= GAME_WIDTH - PLATFORM_WIDTH) {
                    platform.moveDir *= -1;
                }
            }
            // Animate breaking platforms
            if (platform.broken && platform.breakAnim !== undefined) {
                platform.breakAnim += 1;
            }
        });

        // Game over
        if (player.y > GAME_HEIGHT) {
            const finalScore = Math.floor(scoreRef.current / 10);
            if (finalScore > highScore) {
                setHighScore(finalScore);
                localStorage.setItem('doodle-highscore', finalScore.toString());
            }
            setGameState('gameover');
            return;
        }

        // Draw platforms
        platforms.forEach(platform => {
            if (platform.broken) {
                // Falling animation for broken platforms
                ctx.globalAlpha = Math.max(0, 1 - platform.breakAnim / 20);
                ctx.fillStyle = '#FF6B6B';
                const fallOffset = platform.breakAnim * 3;
                ctx.fillRect(platform.x, platform.y + fallOffset, PLATFORM_WIDTH / 2 - 2, PLATFORM_HEIGHT);
                ctx.fillRect(platform.x + PLATFORM_WIDTH / 2 + 2, platform.y + fallOffset + 5, PLATFORM_WIDTH / 2 - 2, PLATFORM_HEIGHT);
                ctx.globalAlpha = 1;
                return;
            }

            if (platform.type === 'moving') {
                ctx.fillStyle = '#4CAF50';
            } else if (platform.type === 'breaking') {
                ctx.fillStyle = '#FF6B6B';
                // Crack lines
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(platform.x + PLATFORM_WIDTH / 3, platform.y);
                ctx.lineTo(platform.x + PLATFORM_WIDTH / 2, platform.y + PLATFORM_HEIGHT);
                ctx.stroke();
            } else {
                ctx.fillStyle = '#8B4513';
            }
            ctx.fillRect(platform.x, platform.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(platform.x, platform.y, PLATFORM_WIDTH, 4);
        });

        // Draw player
        ctx.save();
        ctx.translate(player.x + PLAYER_WIDTH / 2, player.y + PLAYER_HEIGHT / 2);
        if (player.direction < 0) ctx.scale(-1, 1);

        ctx.fillStyle = '#90EE90';
        ctx.beginPath();
        ctx.ellipse(0, 0, PLAYER_WIDTH / 2.5, PLAYER_HEIGHT / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(-6, -5, 8, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(6, -5, 8, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(-4, -5, 4, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(8, -5, 4, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 5, 6, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        ctx.fillStyle = '#90EE90';
        ctx.fillRect(-12, 12, 8, 10);
        ctx.fillRect(4, 12, 8, 10);

        ctx.restore();

        // Draw UI
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${currentScore}`, 10, 25);

        // Level indicator
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Niveau ${difficulty.level}`, GAME_WIDTH - 10, 25);

        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [highScore]);

    const startGame = useCallback(() => {
        initGame();
        setGameState('playing');
    }, [initGame]);

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = touch.clientX - rect.left;
        if (x < GAME_WIDTH / 2) {
            touchRef.current.left = true;
        } else {
            touchRef.current.right = true;
        }
    };

    const handleTouchEnd = () => {
        touchRef.current.left = false;
        touchRef.current.right = false;
    };

    useEffect(() => {
        if (gameState === 'playing') {
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameState, gameLoop]);

    if (gameState === 'menu') {
        return (
            <div className="h-full bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col">
                <div className="px-4 py-3 flex items-center bg-white/20 backdrop-blur">
                    <button onClick={onClose} className="text-white font-medium flex items-center">
                        <FaChevronLeft className="mr-1" size={14} />
                        Retour
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
                        🐸 Doodle Jump
                    </h1>
                    <p className="text-white/80 text-center mb-4">
                        Touchez gauche/droite pour bouger
                    </p>
                    <p className="text-white/60 text-sm text-center mb-8">
                        🔴 Plateformes rouges = cassables<br />
                        🟢 Plateformes vertes = mobiles
                    </p>

                    <button
                        onClick={startGame}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg flex items-center gap-3 active:scale-95 transition-transform"
                    >
                        <FaPlay size={20} />
                        Jouer
                    </button>

                    <div className="mt-8 bg-white/20 backdrop-blur rounded-2xl px-6 py-4">
                        <p className="text-white text-center">
                            🏆 Meilleur score: <span className="font-bold">{highScore}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'gameover') {
        const difficulty = getDifficulty(score);
        return (
            <div className="h-full bg-gradient-to-b from-red-400 to-orange-300 flex flex-col">
                <div className="px-4 py-3 flex items-center bg-white/20 backdrop-blur">
                    <button onClick={onClose} className="text-white font-medium flex items-center">
                        <FaChevronLeft className="mr-1" size={14} />
                        Retour
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
                        Game Over! 💀
                    </h1>

                    <div className="bg-white/20 backdrop-blur rounded-2xl px-8 py-6 mb-8">
                        <p className="text-white text-xl text-center mb-2">
                            Score: <span className="font-bold text-3xl">{score}</span>
                        </p>
                        <p className="text-white/80 text-center mb-2">
                            Niveau atteint: {difficulty.level}
                        </p>
                        <p className="text-white/80 text-center">
                            🏆 Record: {highScore}
                        </p>
                    </div>

                    <button
                        onClick={startGame}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg flex items-center gap-3 active:scale-95 transition-transform"
                    >
                        <FaRedo size={18} />
                        Rejouer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-sky-400 flex flex-col items-center justify-center">
            <canvas
                ref={canvasRef}
                width={GAME_WIDTH}
                height={GAME_HEIGHT}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                className="rounded-lg shadow-2xl"
                style={{ touchAction: 'none' }}
            />

            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 opacity-50">
                <div className="bg-white/30 px-6 py-2 rounded-full text-white text-sm">
                    ← Gauche
                </div>
                <div className="bg-white/30 px-6 py-2 rounded-full text-white text-sm">
                    Droite →
                </div>
            </div>
        </div>
    );
};

export default DoodleJumpApp;

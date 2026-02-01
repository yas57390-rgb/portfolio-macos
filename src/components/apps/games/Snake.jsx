import React, { useState, useEffect, useRef } from 'react';

const Snake = ({ onBack }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Game constants
    const CANVAS_SIZE = 400;
    const SNAKE_START = [[10, 10], [10, 11]];
    const APPLE_START = [8, 3];
    const SCALE = 20;
    const SPEED = 100;

    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]); // moving up

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        context.fillStyle = '#4ADE80'; // Green snake
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = '#EF4444'; // Red apple
        context.fillRect(apple[0], apple[1], 1, 1);
    }, [snake, apple, gameOver]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;
            switch (e.key) {
                case 'ArrowUp': if (dir[1] !== 1) setDir([0, -1]); break;
                case 'ArrowDown': if (dir[1] !== -1) setDir([0, 1]); break;
                case 'ArrowLeft': if (dir[0] !== 1) setDir([-1, 0]); break;
                case 'ArrowRight': if (dir[0] !== -1) setDir([1, 0]); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dir, gameOver]);

    useInterval(() => gameLoop(), SPEED);



    const gameLoop = () => {
        if (gameOver) return;
        const newSnake = [...snake];
        const newHead = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]];

        if (checkCollision(newHead)) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(newHead);
        if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
            setScore(score + 1);
            let newApple = createApple(newSnake);
            setApple(newApple);
        } else {
            newSnake.pop();
        }
        setSnake(newSnake);
    };

    const checkCollision = (head) => {
        // Walls
        if (head[0] < 0 || head[0] >= CANVAS_SIZE / SCALE || head[1] < 0 || head[1] >= CANVAS_SIZE / SCALE) return true;
        // Self
        for (const segment of snake) {
            if (head[0] === segment[0] && head[1] === segment[1]) return true;
        }
        return false;
    };

    const createApple = (currentSnake) => {
        let newApple;
        while (true) {
            newApple = [
                Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
                Math.floor(Math.random() * (CANVAS_SIZE / SCALE))
            ];
            // eslint-disable-next-line
            let collision = false;
            for (const segment of currentSnake) {
                if (newApple[0] === segment[0] && newApple[1] === segment[1]) {
                    collision = true;
                    break;
                }
            }
            if (!collision) break;
        }
        return newApple;
    };

    const restartGame = () => {
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir([0, -1]);
        setScore(0);
        setGameOver(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white relative">
            <div className="absolute top-4 left-4">
                <button onClick={onBack} className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">← Back</button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Snake</h2>
            <div className="relative border-4 border-gray-700 bg-black">
                <canvas ref={canvasRef} width={`${CANVAS_SIZE}px`} height={`${CANVAS_SIZE}px`} />
                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                        <h3 className="text-3xl font-bold text-red-500 mb-2">Game Over</h3>
                        <p className="mb-4">Score: {score}</p>
                        <button onClick={restartGame} className="bg-green-600 px-4 py-2 rounded font-bold hover:bg-green-500">Play Again</button>
                    </div>
                )}
            </div>
            <p className="mt-4 text-gray-400">Score: {score}</p>
            <p className="text-xs text-gray-600 mt-2">Use Arrow Keys to Move</p>
        </div>
    );
};

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => { savedCallback.current = callback; }, [callback]);
    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default Snake;

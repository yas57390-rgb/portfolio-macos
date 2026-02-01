import React, { useState } from 'react';

const TicTacToe = ({ onBack }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const status = winner
        ? `Winner: ${winner}`
        : board.every(Boolean)
            ? "Draw!"
            : `Next player: ${isXNext ? 'X' : 'O'}`;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white relative">
            <div className="absolute top-4 left-4">
                <button onClick={onBack} className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">← Back</button>
            </div>
            <h2 className="text-3xl font-bold mb-6">Tic Tac Toe</h2>
            <div className="text-xl mb-4 font-semibold text-blue-300">{status}</div>
            <div className="grid grid-cols-3 gap-2 bg-gray-600 p-2 rounded-lg">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`w-20 h-20 text-4xl font-bold flex items-center justify-center rounded transition-colors
                            ${cell === 'X' ? 'text-blue-400 bg-gray-700' :
                                cell === 'O' ? 'text-red-400 bg-gray-700' :
                                    'bg-gray-700 hover:bg-gray-650'}`}
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button
                onClick={resetGame}
                className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors font-medium"
            >
                Reset Game
            </button>
        </div>
    );
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default TicTacToe;

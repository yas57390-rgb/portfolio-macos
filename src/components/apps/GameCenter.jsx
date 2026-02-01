import React, { useState } from 'react';
import { FaGamepad, FaGhost, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Doom from './Doom';
import Snake from './games/Snake';
import TicTacToe from './games/TicTacToe';

const GameCenter = ({ windowState }) => {
    const [activeGame, setActiveGame] = useState(windowState?.activeGame || null); // null (menu), 'doom', 'snake', 'tictactoe'

    const renderGame = () => {
        switch (activeGame) {
            case 'doom': return <Doom onBack={() => setActiveGame(null)} />;
            case 'snake': return <Snake onBack={() => setActiveGame(null)} />;
            case 'tictactoe': return <TicTacToe onBack={() => setActiveGame(null)} />;
            default: return renderMenu();
        }
    };

    const renderMenu = () => (
        <div className="flex flex-col h-full bg-transparent text-white p-8 animate-fade-in">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">Game Center</h1>
                <p className="text-slate-300">Select a game to play</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
                {/* DOOM Card */}
                <div
                    onClick={() => setActiveGame('doom')}
                    className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20 flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors ring-1 ring-red-500/20">
                        <FaGamepad className="text-4xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">DOOM</h3>
                    <p className="text-sm text-slate-400 text-center">The classic FPS. Rip and tear!</p>
                </div>

                {/* Snake Card */}
                <div
                    onClick={() => setActiveGame('snake')}
                    className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-900/20 flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors ring-1 ring-green-500/20">
                        <FaGhost className="text-4xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Snake</h3>
                    <p className="text-sm text-slate-400 text-center">Eat apples, get long, don't crash.</p>
                </div>

                {/* TicTacToe Card */}
                <div
                    onClick={() => setActiveGame('tictactoe')}
                    className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors ring-1 ring-blue-500/20">
                        <FaTimes className="text-4xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Tic Tac Toe</h3>
                    <p className="text-sm text-slate-400 text-center">Classic X and O strategy game.</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full w-full bg-slate-900/90 backdrop-blur-xl overflow-hidden">
            {renderGame()}
        </div>
    );
};

export default GameCenter;

import React, { useState } from 'react';
import { GameState } from './types';
import GameLevel from './components/GameLevel';
import { Music, Play } from 'lucide-react';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);

  const startGame = () => {
    // Initialize audio context on user interaction
    audioService.playTone(0, 0); // Silent warm-up
    setGameState(GameState.PLAYING);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/20 blur-3xl"></div>
         <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-3xl"></div>
      </div>

      <main className="flex-grow relative z-10 p-4 overflow-y-auto flex flex-col items-center">
        {gameState === GameState.MENU && (
          <div className="flex flex-col items-center justify-center min-h-full py-10 text-center space-y-8 animate-fade-in w-full max-w-4xl">
            <div className="space-y-4">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-xl mb-4 transform hover:rotate-3 transition-transform duration-500">
                    <Music size={64} className="text-indigo-600" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight">
                    Melody <span className="text-indigo-600">Master</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Master the treble clef! Drag notes to the correct position on the staff and train your ear.
                </p>
            </div>

            <button
                onClick={startGame}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30"
            >
                <Play className="mr-2 w-6 h-6 fill-current" />
                Start Learning
                <div className="absolute -inset-3 rounded-xl bg-indigo-400 opacity-20 group-hover:opacity-40 blur transition duration-200"></div>
            </button>

            <div className="grid grid-cols-3 gap-8 mt-12 text-slate-400">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-1 bg-indigo-100 rounded-full"></div>
                    <span className="text-sm font-medium">Read</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-1 bg-indigo-100 rounded-full"></div>
                    <span className="text-sm font-medium">Listen</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-1 bg-indigo-100 rounded-full"></div>
                    <span className="text-sm font-medium">Play</span>
                </div>
            </div>
          </div>
        )}

        {gameState === GameState.PLAYING && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full h-full flex flex-col justify-center py-2">
            <GameLevel onBack={() => setGameState(GameState.MENU)} />
          </div>
        )}
      </main>

      <footer className="p-2 text-center text-slate-300 text-xs shrink-0">
        UU Music © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
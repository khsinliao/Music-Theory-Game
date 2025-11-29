import React, { useState, useEffect } from 'react';
import { ALL_NOTES } from '../constants';
import { NoteDefinition } from '../types';
import MusicStaff from './MusicStaff';
import { audioService } from '../services/audioService';
import { Check } from 'lucide-react';

interface GameLevelProps {
  onBack: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ onBack }) => {
  const [targetNote, setTargetNote] = useState<NoteDefinition>(ALL_NOTES[0]);
  const [userNote, setUserNote] = useState<NoteDefinition | null>(null);
  
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Initialize random note
  useEffect(() => {
    pickNewNote();
  }, []);

  const pickNewNote = () => {
    const randomIndex = Math.floor(Math.random() * ALL_NOTES.length);
    setTargetNote(ALL_NOTES[randomIndex]);
    setUserNote(null);
    setFeedbackStatus('idle');
  };

  const handlePlaceNote = (note: NoteDefinition) => {
    setUserNote(note);
    // If they were wrong before, reset to idle so they can check again
    if (feedbackStatus === 'incorrect') {
        setFeedbackStatus('idle');
    }
  };

  const handleCheckAnswer = () => {
    if (!userNote) return;

    if (userNote.id === targetNote.id) {
        // Correct
        setFeedbackStatus('correct');
        setScore(s => s + 10);
        audioService.playSuccess();
        
        // Delay next round
        setTimeout(() => {
            setRound(r => r + 1);
            pickNewNote();
        }, 2000);
    } else {
        // Incorrect
        setFeedbackStatus('incorrect');
        audioService.playError();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto h-full justify-center">
      {/* HUD - Compact */}
      <div className="w-full flex justify-between items-center mb-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-slate-200">
        <button 
            onClick={onBack}
            className="text-slate-500 hover:text-indigo-600 font-medium text-sm transition-colors flex items-center gap-1"
        >
            <span>←</span> Exit
        </button>
        <div className="flex gap-6">
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Round</span>
                <span className="font-bold text-slate-700">{round}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Score</span>
                <span className="font-bold text-indigo-600">{score}</span>
            </div>
        </div>
      </div>

      {/* Main Challenge Area - Compact */}
      <div className="flex flex-col items-center mb-2">
        <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Find this note</h2>
        <div className="flex items-baseline gap-3">
            <h1 className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 leading-tight ${feedbackStatus === 'correct' ? 'scale-110' : ''}`}>
            {targetNote.solfege}
            </h1>
            <span className="text-2xl text-slate-400 font-mono font-bold">({targetNote.label})</span>
        </div>
      </div>

      {/* Game Board - Constrained Width to reduce Height */}
      <div className="w-full max-w-lg relative mb-4">
        {feedbackStatus === 'correct' && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="animate-pop bg-green-500 text-white font-bold text-2xl px-6 py-3 rounded-full shadow-lg transform -rotate-3 border-4 border-white">
                    Correct! 🎵
                </div>
            </div>
        )}
        
        <MusicStaff 
            userNote={userNote}
            onPlaceNote={handlePlaceNote}
            feedbackStatus={feedbackStatus}
        />
      </div>

      {/* Action Area - Compact */}
      <div className="flex flex-col items-center gap-3">
        <button
            onClick={handleCheckAnswer}
            disabled={!userNote || feedbackStatus === 'correct'}
            className={`
                flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-200
                ${!userNote 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : feedbackStatus === 'correct'
                        ? 'bg-green-500 text-white scale-105'
                        : feedbackStatus === 'incorrect'
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-500/30'
                }
            `}
        >
            {feedbackStatus === 'correct' ? (
                <>Next Round...</>
            ) : feedbackStatus === 'incorrect' ? (
                <>Try Again</>
            ) : (
                <>
                    <Check className="w-5 h-5" />
                    Check Answer
                </>
            )}
        </button>

        <p className="text-slate-400 text-xs text-center h-4">
            {!userNote && "Drag note to staff"}
            {userNote && feedbackStatus === 'idle' && "Click check to confirm"}
        </p>
      </div>
    </div>
  );
};

export default GameLevel;
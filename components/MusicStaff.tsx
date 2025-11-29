import React, { useRef, useState, useEffect } from 'react';
import { STAFF_LINES, STAFF_LINE_GAP, ALL_NOTES } from '../constants';
import { NoteDefinition } from '../types';
import { audioService } from '../services/audioService';

interface MusicStaffProps {
  userNote: NoteDefinition | null;
  onPlaceNote: (note: NoteDefinition) => void;
  feedbackStatus: 'idle' | 'correct' | 'incorrect';
}

const MusicStaff: React.FC<MusicStaffProps> = ({ userNote, onPlaceNote, feedbackStatus }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Configuration for rendering
  // We shifted the staff down to accommodate High C (C6).
  // E4 is on the bottom line (Index 0).
  // E4_Y = 160 means:
  // Line 1 (E4): 160
  // Line 2 (G4): 140 (Treble Clef Spiral Center)
  // Line 3 (B4): 120
  // Line 4 (D5): 100
  // Line 5 (F5): 80
  // Top Ledger (A5): 60
  // High C (C6): 40 -> Fits comfortably in 280px height
  const E4_Y = 160; 
  
  const getYForNote = (noteIndex: number) => {
    return E4_Y - (noteIndex * (STAFF_LINE_GAP / 2));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateDragPosition(e);
  };

  const updateDragPosition = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!svgRef.current) return;
    
    let clientX, clientY;
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as MouseEvent | React.MouseEvent).clientX;
        clientY = (e as MouseEvent | React.MouseEvent).clientY;
    }

    const CTM = svgRef.current.getScreenCTM();
    if (CTM) {
      setDragPosition({
        x: (clientX - CTM.e) / CTM.a,
        y: (clientY - CTM.f) / CTM.d
      });
    }
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (isDragging) {
      updateDragPosition(e);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragPosition) {
      setIsDragging(false);
      snapNote(dragPosition.y);
    }
  };

  const snapNote = (y: number) => {
    let closestNote: NoteDefinition | null = null;
    let minDistance = Infinity;

    ALL_NOTES.forEach(note => {
      const noteY = getYForNote(note.positionIndex);
      const dist = Math.abs(y - noteY);
      if (dist < minDistance) {
        minDistance = dist;
        closestNote = note;
      }
    });

    if (closestNote) {
      onPlaceNote(closestNote);
      audioService.playTone(closestNote.frequency, 0.8);
      setDragPosition(null);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragPosition]);

  const renderNoteX = isDragging && dragPosition ? dragPosition.x : 160;
  const renderNoteY = isDragging && dragPosition 
    ? dragPosition.y 
    : userNote 
      ? getYForNote(userNote.positionIndex) 
      : 220; // Dock position (below staff)

  // Calculate current index for ledger line logic
  const currentIndex = isDragging && dragPosition
     ? Math.round((E4_Y - dragPosition.y) / (STAFF_LINE_GAP / 2))
     : userNote ? userNote.positionIndex : -999;

  const getStrokeColor = () => {
    if (isDragging) return '#b45309';
    if (feedbackStatus === 'correct') return '#15803d';
    if (feedbackStatus === 'incorrect') return '#b91c1c';
    return '#b45309';
  };

  // Ledger Lines Helper
  const renderLedgerLines = () => {
    const lines = [];
    
    // Bottom Ledger Lines (Below E4 - Index 0)
    // C4 is -2. If index <= -2, draw at -2.
    if (currentIndex <= -2 && currentIndex > -100) {
        for (let i = -2; i >= currentIndex; i -= 2) {
            const y = getYForNote(i);
            lines.push(<line key={`ledger-${i}`} x1="-24" y1="0" x2="24" y2="0" stroke="#334155" strokeWidth="2" transform={`translate(0, ${y - renderNoteY})`} />);
        }
    }

    // Top Ledger Lines (Above F5 - Index 8)
    // A5 is 10. C6 is 12.
    if (currentIndex >= 10) {
        for (let i = 10; i <= currentIndex; i += 2) {
             const y = getYForNote(i);
             lines.push(<line key={`ledger-${i}`} x1="-24" y1="0" x2="24" y2="0" stroke="#334155" strokeWidth="2" transform={`translate(0, ${y - renderNoteY})`} />);
        }
    }
    return lines;
  };

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-2xl relative select-none p-2">
      {!isDragging && !userNote && (
        <div className="absolute top-2 right-2 animate-pulse text-indigo-500 font-bold flex items-center gap-2 pointer-events-none">
          <span className="text-sm">Drag me!</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      )}

      <svg 
        ref={svgRef}
        viewBox="0 0 300 280" 
        className="w-full h-auto border border-slate-100 rounded-lg bg-yellow-50/20"
        style={{ touchAction: 'none' }}
      >
        {/* Staff Lines */}
        {Array.from({ length: STAFF_LINES }).map((_, i) => {
          const y = E4_Y - (i * STAFF_LINE_GAP); 
          return (
            <line 
              key={i} 
              x1="20" 
              y1={y} 
              x2="280" 
              y2={y} 
              stroke="#334155" 
              strokeWidth="2" 
            />
          );
        })}

        {/* Treble Clef (G Clef) - Text based */}
        {/* Using Unicode Character '𝄞' (U+1D11E) */}
        {/* Positioned to wrap around the G Line (Line 2, Y=140) */}
        <text 
            x="40" 
            y="160" 
            fontSize="130" 
            fontFamily="serif" 
            fill="#1e1b4b" 
            style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
            𝄞
        </text>

        {/* The Note */}
        <g transform={`translate(${renderNoteX}, ${renderNoteY})`}>
             <g 
                onMouseDown={feedbackStatus !== 'correct' ? handleMouseDown : undefined}
                onTouchStart={feedbackStatus !== 'correct' ? handleMouseDown : undefined}
                className={`
                    transition-transform duration-200 ease-out
                    ${!isDragging && feedbackStatus !== 'correct' ? 'hover:scale-110' : ''}
                    ${feedbackStatus === 'correct' ? 'cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab'} 
                `}
                style={{ transformOrigin: '0px 0px' }}
                role="button"
                aria-label="Music Note"
             >
                
                {/* Ledger Lines inside the Note Group */}
                {renderLedgerLines()}

                {/* Whole Note: Hollow ellipse with stroke, tilted */}
                <ellipse 
                    cx="0" 
                    cy="0" 
                    rx="14" 
                    ry="10" 
                    fill="white" 
                    stroke={getStrokeColor()}
                    strokeWidth="3.5" 
                    transform="rotate(-15)" 
                />

                {/* Text Label "Drag Me" only when in dock */}
                {!userNote && !isDragging && (
                    <text x="0" y="35" textAnchor="middle" fontSize="12" fill="#64748b" className="pointer-events-none">Drag Me</text>
                )}
             </g>
        </g>
        
        {/* Feedback Text inside SVG */}
        {feedbackStatus === 'incorrect' && !isDragging && (
            <text x="150" y="240" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ef4444" className="animate-wiggle">
                Not quite! Try another line.
            </text>
        )}
      </svg>
    </div>
  );
};

export default MusicStaff;
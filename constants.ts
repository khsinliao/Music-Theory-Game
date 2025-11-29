import { NoteName, NoteDefinition } from './types';

// Staff Configuration
export const STAFF_LINE_GAP = 20; // Pixels between lines
export const STAFF_LINES = 5;
// Note: Actual Y rendering is handled in MusicStaff.tsx relative to E4_Y

export const NOTES: Record<NoteName, NoteDefinition> = {
  [NoteName.C4]: { id: NoteName.C4, solfege: 'Do', label: 'C4', frequency: 261.63, positionIndex: -2 },
  [NoteName.D4]: { id: NoteName.D4, solfege: 'Re', label: 'D4', frequency: 293.66, positionIndex: -1 },
  [NoteName.E4]: { id: NoteName.E4, solfege: 'Mi', label: 'E4', frequency: 329.63, positionIndex: 0 }, // Line 1
  [NoteName.F4]: { id: NoteName.F4, solfege: 'Fa', label: 'F4', frequency: 349.23, positionIndex: 1 },
  [NoteName.G4]: { id: NoteName.G4, solfege: 'Sol', label: 'G4', frequency: 392.00, positionIndex: 2 }, // Line 2
  [NoteName.A4]: { id: NoteName.A4, solfege: 'La', label: 'A4', frequency: 440.00, positionIndex: 3 },
  [NoteName.B4]: { id: NoteName.B4, solfege: 'Si', label: 'B4', frequency: 493.88, positionIndex: 4 }, // Line 3
  [NoteName.C5]: { id: NoteName.C5, solfege: 'Do', label: 'C5', frequency: 523.25, positionIndex: 5 },
  [NoteName.D5]: { id: NoteName.D5, solfege: 'Re', label: 'D5', frequency: 587.33, positionIndex: 6 }, // Line 4
  [NoteName.E5]: { id: NoteName.E5, solfege: 'Mi', label: 'E5', frequency: 659.25, positionIndex: 7 },
  [NoteName.F5]: { id: NoteName.F5, solfege: 'Fa', label: 'F5', frequency: 698.46, positionIndex: 8 }, // Line 5
  [NoteName.G5]: { id: NoteName.G5, solfege: 'Sol', label: 'G5', frequency: 783.99, positionIndex: 9 },
  [NoteName.A5]: { id: NoteName.A5, solfege: 'La', label: 'A5', frequency: 880.00, positionIndex: 10 }, // Ledger Line 1 Above
  [NoteName.B5]: { id: NoteName.B5, solfege: 'Si', label: 'B5', frequency: 987.77, positionIndex: 11 },
  [NoteName.C6]: { id: NoteName.C6, solfege: 'Do', label: 'C6', frequency: 1046.50, positionIndex: 12 }, // Ledger Line 2 Above
};

export const ALL_NOTES = Object.values(NOTES);
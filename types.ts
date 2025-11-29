export enum NoteName {
  C4 = 'C4',
  D4 = 'D4',
  E4 = 'E4',
  F4 = 'F4',
  G4 = 'G4',
  A4 = 'A4',
  B4 = 'B4',
  C5 = 'C5',
  D5 = 'D5',
  E5 = 'E5',
  F5 = 'F5',
  G5 = 'G5',
  A5 = 'A5',
  B5 = 'B5',
  C6 = 'C6'
}

export interface NoteDefinition {
  id: NoteName;
  solfege: string; // Do, Re, Mi...
  frequency: number;
  label: string;
  positionIndex: number; // 0 for Bottom Line (E4), increment per half step
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  SUCCESS = 'SUCCESS'
}

export interface Position {
  x: number;
  y: number;
}
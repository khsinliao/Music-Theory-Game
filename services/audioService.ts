class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  // Synthesize a Piano-like sound
  public playTone(frequency: number, duration: number = 1.0) {
    this.init();
    if (!this.audioContext || !this.masterGain) return;

    // Resume context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const now = this.audioContext.currentTime;
    
    // Create multiple oscillators to simulate piano harmonics
    const harmonics = [
      { ratio: 1.0, gain: 1.0, type: 'triangle' }, // Fundamental
      { ratio: 2.0, gain: 0.3, type: 'sine' },     // 2nd Harmonic
      { ratio: 3.0, gain: 0.1, type: 'sine' }      // 3rd Harmonic
    ];

    harmonics.forEach(harmonic => {
      if (!this.audioContext || !this.masterGain) return;

      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = harmonic.type as OscillatorType;
      osc.frequency.value = frequency * harmonic.ratio;
      
      // Envelope: Fast attack, exponential decay
      const attackTime = 0.02;
      const decayTime = duration;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(harmonic.gain, now + attackTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + attackTime + decayTime);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + attackTime + decayTime + 0.1);
    });
  }

  public playSuccess() {
    // Play a major chord arpeggio for success
    setTimeout(() => this.playTone(523.25, 0.4), 0);   // C5
    setTimeout(() => this.playTone(659.25, 0.4), 100); // E5
    setTimeout(() => this.playTone(783.99, 0.6), 200); // G5
    setTimeout(() => this.playTone(1046.50, 0.8), 300); // C6
  }

  public playError() {
    // Play a dissonant chord for error
    setTimeout(() => this.playTone(146.83, 0.4), 0);  // D3
    setTimeout(() => this.playTone(155.56, 0.4), 0);  // Eb3 (Minor 2nd clash)
  }
}

export const audioService = new AudioService();
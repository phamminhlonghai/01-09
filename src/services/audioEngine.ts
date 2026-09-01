// Web Audio API engine to generate realistic, pleasant vocal harmonic waveforms and playback
class AudioPlaybackEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;
  private currentTalentId: string | null = null;
  private currentSampleId: string | null = null;
  private playbackStartTime: number = 0;
  private playbackDuration: number = 0;
  private timerInterval: any = null;
  private playbackRate: number = 1.0;

  private onProgressCallback: ((progress: number, currentTime: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playSample(
    talentId: string,
    sampleId: string,
    soundType: string = 'warm',
    durationSec: number = 15,
    baseFreq: number = 220,
    onProgress?: (progress: number, currentTime: number) => void,
    onEnd?: () => void
  ) {
    this.stop();
    this.init();

    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.currentTalentId = talentId;
    this.currentSampleId = sampleId;
    this.playbackDuration = durationSec;
    this.playbackStartTime = this.ctx.currentTime;
    this.onProgressCallback = onProgress || null;
    this.onEndCallback = onEnd || null;

    // Harmonic profile tailored to vocal types
    let f1 = baseFreq;
    let type: OscillatorType = 'sine';

    if (soundType === 'deep') {
      f1 = 130;
      type = 'triangle';
    } else if (soundType === 'warm') {
      f1 = 200;
      type = 'sine';
    } else if (soundType === 'energetic') {
      f1 = 280;
      type = 'triangle';
    } else if (soundType === 'soft') {
      f1 = 240;
      type = 'sine';
    } else if (soundType === 'dramatic') {
      f1 = 150;
      type = 'sawtooth';
    }

    // Create melodic voice notes sequence
    const notes = [
      f1,
      f1 * 1.12,
      f1 * 1.25,
      f1 * 1.33,
      f1 * 1.5,
      f1 * 1.25,
      f1 * 1.12,
      f1
    ];

    const noteDuration = 0.55 / this.playbackRate;
    const totalLoops = Math.ceil(durationSec / (notes.length * noteDuration));

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const formantFilter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();

    formantFilter.type = 'bandpass';
    formantFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
    formantFilter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    osc.type = type;
    subOsc.type = 'sine';

    const now = this.ctx.currentTime;
    let t = now;

    for (let loop = 0; loop < totalLoops; loop++) {
      for (let i = 0; i < notes.length; i++) {
        if (t - now > durationSec) break;
        const noteFreq = notes[i];
        osc.frequency.setValueAtTime(noteFreq, t);
        subOsc.frequency.setValueAtTime(noteFreq * 0.5, t);
        
        // Gentle vocal envelope
        gainNode.gain.setValueAtTime(0.01, t);
        gainNode.gain.linearRampToValueAtTime(0.28, t + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.12, t + noteDuration * 0.8);
        gainNode.gain.linearRampToValueAtTime(0.01, t + noteDuration);

        // Vocal formant frequency movement
        formantFilter.frequency.setValueAtTime(600 + (i % 3) * 300, t);

        t += noteDuration;
      }
    }

    osc.connect(formantFilter);
    subOsc.connect(formantFilter);
    formantFilter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + durationSec);
    subOsc.stop(now + durationSec);

    this.activeOscillators = [osc, subOsc];

    // Progress timer
    const startRealTime = Date.now();
    this.timerInterval = setInterval(() => {
      const elapsed = (Date.now() - startRealTime) / 1000 * this.playbackRate;
      const progress = Math.min(1, elapsed / durationSec);
      if (this.onProgressCallback) {
        this.onProgressCallback(progress, Math.min(elapsed, durationSec));
      }
      if (elapsed >= durationSec) {
        this.stop();
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      }
    }, 50);
  }

  public stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.activeOscillators = [];
    this.isPlaying = false;
    this.currentTalentId = null;
    this.currentSampleId = null;
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentPlaying() {
    return {
      talentId: this.currentTalentId,
      sampleId: this.currentSampleId,
      isPlaying: this.isPlaying,
    };
  }
}

export const audioEngine = new AudioPlaybackEngine();

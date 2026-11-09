// Web Audio 기반 효과음 (외부 음원 미사용)

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === 'suspended') void audioContext.resume();
    return audioContext;
  } catch {
    return null;
  }
}

function tone(frequency: number, duration: number, volume: number, type: OscillatorType, startOffset = 0): void {
  const ctx = getContext();
  if (!ctx) return;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime + startOffset;
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

/** 타자기 글자음 */
export function playBlip(pitch: number): void {
  tone(pitch + Math.random() * 60, 0.04, 0.025, 'square');
}

/** 컷인 효과음 */
export function playImpact(): void {
  tone(180, 0.25, 0.12, 'sawtooth');
  tone(90, 0.35, 0.1, 'square', 0.05);
}

/** 판결·개정 효과음 */
export function playGavel(): void {
  tone(140, 0.12, 0.15, 'triangle');
  tone(140, 0.12, 0.15, 'triangle', 0.22);
}

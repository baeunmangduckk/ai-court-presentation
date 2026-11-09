import { useEffect, useState } from 'react';
import type { Effect } from '../data/types';
import { playGavel, playImpact } from '../lib/sound';
import { usePresentation } from '../store/presentation';

interface ExclamationProps {
  effect: Effect;
  delay: number;
}

const labels: Record<Effect, string> = {
  objection: '이의 있습니다!',
  holdit: '잠깐!',
  verdict: '판결!',
  gavel: '개정!',
};

export const EXCLAMATION_MS = 950;

// 대사 진입 시 컷인 말풍선 (부모에서 대사마다 key로 재마운트)
export default function Exclamation({ effect, delay }: ExclamationProps) {
  const force = usePresentation((state) => state.forceComplete);
  const soundOn = usePresentation((state) => state.soundOn);
  const [phase, setPhase] = useState<'wait' | 'show' | 'gone'>(delay > 0 ? 'wait' : 'show');

  useEffect(() => {
    const showTimer = window.setTimeout(() => setPhase('show'), delay);
    const hideTimer = window.setTimeout(() => setPhase('gone'), delay + EXCLAMATION_MS);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [delay]);

  useEffect(() => {
    if (phase !== 'show' || !soundOn) return;
    if (effect === 'verdict' || effect === 'gavel') playGavel();
    else playImpact();
  }, [phase, soundOn, effect]);

  if (force || phase !== 'show') return null;

  const isStamp = effect === 'verdict' || effect === 'gavel';
  return (
    <div className="exclaim-layer" aria-hidden="true">
      {isStamp ? (
        <div className="stamp">{labels[effect]}</div>
      ) : (
        <div className={`burst burst-${effect}`}>
          <span>{labels[effect]}</span>
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import ActTitle, { ACT_TITLE_MS } from './components/ActTitle';
import CourtRecord from './components/CourtRecord';
import CourtScene from './components/CourtScene';
import DialogueBox from './components/DialogueBox';
import EvidencePanel from './components/EvidencePanel';
import Exclamation, { EXCLAMATION_MS } from './components/Exclamation';
import HelpOverlay from './components/HelpOverlay';
import TopBar from './components/TopBar';
import { acts, slides } from './data/slides';
import { usePresenter } from './hooks/usePresenter';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { getRevealCount, isTakeawayVisible } from './lib/progress';
import { usePresentation } from './store/presentation';

export default function App() {
  usePresenter();
  const reducedMotion = usePrefersReducedMotion();
  const slideIndex = usePresentation((state) => state.slideIndex);
  const lineIndex = usePresentation((state) => state.lineIndex);
  const entryMode = usePresentation((state) => state.entryMode);
  const overlay = usePresentation((state) => state.overlay);
  const next = usePresentation((state) => state.next);
  const [talking, setTalking] = useState(false);
  const [shaking, setShaking] = useState(false);

  const slide = slides[slideIndex];
  const line = slide.lines[lineIndex];
  const lineKey = `${slideIndex}-${lineIndex}`;
  const act = acts.find((item) => item.id === slide.act);

  // 막의 첫 장표에 앞으로/점프로 들어오면 막 타이틀 표시
  const isActStart = slideIndex === 0 || slides[slideIndex - 1].act !== slide.act;
  const showActTitle = !reducedMotion && isActStart && lineIndex === 0 && entryMode !== 'back' && act !== undefined;
  const showEffect = !reducedMotion && line.effect !== undefined && entryMode !== 'back';
  const effectDelay = showActTitle ? ACT_TITLE_MS : 0;
  const typingDelay = effectDelay + (showEffect ? EXCLAMATION_MS : 0);

  // 컷인 시점에 화면 흔들림
  useEffect(() => {
    if (!showEffect) return undefined;
    const start = window.setTimeout(() => setShaking(true), effectDelay + 120);
    const stop = window.setTimeout(() => setShaking(false), effectDelay + 620);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
      setShaking(false);
    };
  }, [lineKey, showEffect, effectDelay]);

  const handleTalking = useCallback((value: boolean) => setTalking(value), []);

  return (
    <main className="app">
      <div className={`stage ${shaking ? 'shake' : ''}`} onClick={() => next()}>
        <CourtScene speaker={line.speaker} expression={line.expression ?? 'normal'} talking={talking} />
        <div className="panel-area">
          <EvidencePanel
            slide={slide}
            slideNumber={slideIndex + 1}
            reveal={getRevealCount(slide, lineIndex)}
            showTakeaway={isTakeawayVisible(slide, lineIndex)}
          />
        </div>
        <div className="dialogue-area">
          <DialogueBox line={line} lineKey={lineKey} delay={typingDelay} onTalkingChange={handleTalking} />
        </div>
        <TopBar />
        {showEffect && line.effect && <Exclamation key={`fx-${lineKey}`} effect={line.effect} delay={effectDelay} />}
        {showActTitle && act && <ActTitle key={`act-${slideIndex}`} act={act} />}
        {overlay === 'record' && <CourtRecord />}
        {overlay === 'help' && <HelpOverlay />}
      </div>
    </main>
  );
}

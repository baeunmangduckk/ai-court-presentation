import { useEffect, useState } from 'react';
import { acts, cumulativeSeconds, slides } from '../data/slides';
import { toggleFullscreen } from '../hooks/usePresenter';
import { formatClock } from '../lib/progress';
import { usePresentation } from '../store/presentation';

// 상단 진행 정보: 막·장표 번호·발표 경과 시간(배정 시간 대비) + 조작 버튼
export default function TopBar() {
  const slideIndex = usePresentation((state) => state.slideIndex);
  const startedAt = usePresentation((state) => state.startedAt);
  const soundOn = usePresentation((state) => state.soundOn);
  const toggleOverlay = usePresentation((state) => state.toggleOverlay);
  const toggleSound = usePresentation((state) => state.toggleSound);
  const resetTimer = usePresentation((state) => state.resetTimer);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[slideIndex];
  const act = acts.find((item) => item.id === slide.act);
  const elapsed = startedAt === null ? 0 : (now - startedAt) / 1000;
  const planned = cumulativeSeconds[slideIndex];
  const total = cumulativeSeconds[cumulativeSeconds.length - 1];
  const overTime = elapsed > planned;
  const progress = ((slideIndex + 1) / slides.length) * 100;

  return (
    <div className="topbar" onClick={(event) => event.stopPropagation()}>
      <span className="topbar-act">
        제{slide.act}막 · {act?.title}
      </span>
      <span className="topbar-spacer" />
      <span className="topbar-info">
        {slideIndex + 1} / {slides.length}
      </span>
      <button
        type="button"
        className={`topbar-info topbar-btn ${overTime ? 'text-coral' : ''}`}
        title={`이 장표까지 배정 ${formatClock(planned)} · 전체 ${formatClock(total)} (클릭하면 초기화)`}
        onClick={resetTimer}
      >
        ⏱ {formatClock(elapsed)} / {formatClock(planned)}
      </button>
      <button type="button" className="topbar-btn" onClick={() => toggleOverlay('record')} title="증거 목록 (E)">
        🗂
      </button>
      <button type="button" className="topbar-btn" onClick={toggleSound} title="효과음 (M)">
        {soundOn ? '🔊' : '🔇'}
      </button>
      <button type="button" className="topbar-btn" onClick={toggleFullscreen} title="전체화면 (F)">
        ⛶
      </button>
      <button type="button" className="topbar-btn" onClick={() => toggleOverlay('help')} title="도움말 (H)">
        ?
      </button>
      <span className="topbar-progress" style={{ width: `${progress}%` }} />
    </div>
  );
}

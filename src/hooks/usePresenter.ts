import { useEffect } from 'react';
import { slides } from '../data/slides';
import { usePresentation } from '../store/presentation';

interface HashTarget {
  slide: number;
  line: number;
}

/** #s7 → 7번 장표, #s7-3 → 7번 장표 3번째 대사 */
function parseHash(hash: string): HashTarget | null {
  const match = /^#s(\d+)(?:-(\d+))?$/i.exec(hash);
  if (!match) return null;
  const slide = Number(match[1]) - 1;
  const line = match[2] ? Number(match[2]) - 1 : 0;
  return slide >= 0 && slide < slides.length ? { slide, line } : null;
}

export function toggleFullscreen(): void {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void document.documentElement.requestFullscreen().catch(() => undefined);
  }
}

/** 키보드 조작 + URL 해시(#s7) 동기화 */
export function usePresenter(): void {
  const slideIndex = usePresentation((state) => state.slideIndex);

  // 최초 진입 및 해시 직접 변경 시 해당 장표로 이동
  useEffect(() => {
    const syncFromHash = (): void => {
      const target = parseHash(window.location.hash);
      const state = usePresentation.getState();
      if (target !== null && (target.slide !== state.slideIndex || target.line !== state.lineIndex)) {
        state.goToSlide(target.slide, target.line);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  // 장표 이동 시 해시 갱신 (히스토리는 쌓지 않음)
  useEffect(() => {
    const hash = `#s${slideIndex + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }, [slideIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const store = usePresentation.getState();
      const key = event.key;

      if (key === 'Escape') {
        store.closeOverlay();
        return;
      }
      if (key === 'e' || key === 'E') {
        store.toggleOverlay('record');
        return;
      }
      if (key === 'h' || key === 'H' || key === '?') {
        store.toggleOverlay('help');
        return;
      }
      if (key === 'f' || key === 'F') {
        toggleFullscreen();
        return;
      }
      if (key === 'm' || key === 'M') {
        store.toggleSound();
        return;
      }
      if (store.overlay !== 'none') return;

      switch (key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          event.preventDefault();
          store.next();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          event.preventDefault();
          store.prev();
          break;
        case 'PageDown':
        case 'ArrowDown':
          event.preventDefault();
          store.nextSlide();
          break;
        case 'PageUp':
        case 'ArrowUp':
          event.preventDefault();
          store.prevSlide();
          break;
        case 'Home':
          store.goToSlide(0);
          break;
        case 'End':
          store.goToSlide(slides.length - 1);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}

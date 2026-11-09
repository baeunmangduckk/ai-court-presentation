import { create } from 'zustand';
import { slides } from '../data/slides';

export type Overlay = 'none' | 'record' | 'help';
// 진입 방식: 뒤로 가기일 때는 연출·타이핑을 생략한다
export type EntryMode = 'forward' | 'back' | 'jump';

interface PresentationState {
  slideIndex: number;
  lineIndex: number;
  entryMode: EntryMode;
  typingDone: boolean;
  forceComplete: boolean;
  overlay: Overlay;
  soundOn: boolean;
  startedAt: number | null;
  next: () => void;
  prev: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number, line?: number) => void;
  setTypingDone: () => void;
  toggleOverlay: (overlay: Overlay) => void;
  closeOverlay: () => void;
  toggleSound: () => void;
  resetTimer: () => void;
}

const lastSlide = slides.length - 1;

const clampSlide = (index: number): number => Math.min(Math.max(index, 0), lastSlide);

const lineReset = { typingDone: false, forceComplete: false };

export const usePresentation = create<PresentationState>((set, get) => ({
  slideIndex: 0,
  lineIndex: 0,
  entryMode: 'jump',
  typingDone: false,
  forceComplete: false,
  overlay: 'none',
  soundOn: false,
  startedAt: null,

  next: () => {
    const { slideIndex, lineIndex, typingDone, startedAt } = get();
    const started = startedAt ?? Date.now();
    // 타이핑 중이면 먼저 문장을 완성
    if (!typingDone) {
      set({ forceComplete: true, startedAt: started });
      return;
    }
    const lineCount = slides[slideIndex].lines.length;
    if (lineIndex < lineCount - 1) {
      set({ lineIndex: lineIndex + 1, entryMode: 'forward', startedAt: started, ...lineReset });
    } else if (slideIndex < lastSlide) {
      set({ slideIndex: slideIndex + 1, lineIndex: 0, entryMode: 'forward', startedAt: started, ...lineReset });
    }
  },

  prev: () => {
    const { slideIndex, lineIndex } = get();
    if (lineIndex > 0) {
      set({ lineIndex: lineIndex - 1, entryMode: 'back', typingDone: false, forceComplete: true });
    } else if (slideIndex > 0) {
      const target = slideIndex - 1;
      set({
        slideIndex: target,
        lineIndex: slides[target].lines.length - 1,
        entryMode: 'back',
        typingDone: false,
        forceComplete: true,
      });
    }
  },

  nextSlide: () => get().goToSlide(get().slideIndex + 1),
  prevSlide: () => get().goToSlide(get().slideIndex - 1),

  goToSlide: (index, line = 0) => {
    const target = clampSlide(index);
    const lineIndex = Math.min(Math.max(line, 0), slides[target].lines.length - 1);
    if (lineIndex > 0) {
      // 대사 중간으로 직행할 때는 연출 없이 바로 표시
      set({ slideIndex: target, lineIndex, entryMode: 'back', overlay: 'none', typingDone: false, forceComplete: true });
      return;
    }
    set({ slideIndex: target, lineIndex: 0, entryMode: 'jump', overlay: 'none', ...lineReset });
  },

  setTypingDone: () => set({ typingDone: true }),

  toggleOverlay: (overlay) => set((state) => ({ overlay: state.overlay === overlay ? 'none' : overlay })),
  closeOverlay: () => set({ overlay: 'none' }),
  toggleSound: () => set((state) => ({ soundOn: !state.soundOn })),
  resetTimer: () => set({ startedAt: null }),
}));

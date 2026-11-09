import type { Slide } from '../data/types';

/** 현재 대사까지 공개된 증거 패널 항목 수 (reveal 미지정 장표는 전부 공개) */
export function getRevealCount(slide: Slide, lineIndex: number): number {
  const hasReveal = slide.lines.some((line) => line.reveal !== undefined);
  if (!hasReveal) return Number.POSITIVE_INFINITY;
  let count = 0;
  for (let i = 0; i <= lineIndex && i < slide.lines.length; i += 1) {
    const reveal = slide.lines[i].reveal;
    if (reveal !== undefined) count = reveal;
  }
  return count;
}

/** 개발자 시사점 띠 노출 여부 */
export function isTakeawayVisible(slide: Slide, lineIndex: number): boolean {
  if (!slide.takeaway) return false;
  const hasFlag = slide.lines.some((line) => line.takeaway);
  if (!hasFlag) return true;
  return slide.lines.slice(0, lineIndex + 1).some((line) => line.takeaway);
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

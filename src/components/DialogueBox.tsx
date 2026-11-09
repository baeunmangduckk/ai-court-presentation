import { useEffect, useMemo, useRef } from 'react';
import { characters } from '../data/characters';
import type { Line } from '../data/types';
import { useTypewriter } from '../hooks/useTypewriter';
import { parseEmphasis, segmentsLength, sliceSegments } from '../lib/emphasis';
import { playBlip } from '../lib/sound';
import { usePresentation } from '../store/presentation';

interface DialogueBoxProps {
  line: Line;
  lineKey: string;
  delay: number;
  onTalkingChange: (talking: boolean) => void;
}

const blipPitch: Record<Line['speaker'], number> = {
  lawyer: 620,
  prosecutor: 520,
  judge: 300,
  defendant: 880,
};

export default function DialogueBox({ line, lineKey, delay, onTalkingChange }: DialogueBoxProps) {
  const force = usePresentation((state) => state.forceComplete);
  const soundOn = usePresentation((state) => state.soundOn);
  const setTypingDone = usePresentation((state) => state.setTypingDone);
  const segments = useMemo(() => parseEmphasis(line.text), [line.text]);
  const total = segmentsLength(segments);
  const { count, done } = useTypewriter({ resetKey: lineKey, total, delay, speed: 32, force });
  const speaker = characters[line.speaker];
  const lastBlip = useRef(0);

  useEffect(() => {
    if (done) setTypingDone();
  }, [done, setTypingDone]);

  useEffect(() => {
    onTalkingChange(count > 0 && !done);
  }, [count, done, onTalkingChange]);

  // 두 글자마다 짧은 타자음
  useEffect(() => {
    if (!soundOn || done || count === 0) return;
    if (count - lastBlip.current >= 2 || count < lastBlip.current) {
      lastBlip.current = count;
      playBlip(blipPitch[line.speaker]);
    }
  }, [count, done, soundOn, line.speaker]);

  const visible = sliceSegments(segments, count);

  return (
    <div className="dialogue">
      <div className="dialogue-name" style={{ backgroundColor: speaker.color }}>
        {speaker.name}
        <span className="dialogue-role">{speaker.role}</span>
      </div>
      <p className="dialogue-text" aria-live="polite">
        {visible.map((segment, index) =>
          segment.strong ? (
            <strong key={index} className="dialogue-strong">
              {segment.text}
            </strong>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
        {/* 레이아웃 흔들림 방지용 나머지 텍스트(투명) */}
        <span className="opacity-0" aria-hidden="true">
          {segments.map((s) => s.text).join('').slice(count)}
        </span>
      </p>
      {done && <span className="dialogue-next">▼</span>}
    </div>
  );
}

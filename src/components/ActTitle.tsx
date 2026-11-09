import { useEffect, useState } from 'react';
import type { Act } from '../data/types';
import { usePresentation } from '../store/presentation';

export const ACT_TITLE_MS = 1500;

// 막 전환 타이틀 카드 (부모에서 장표마다 key로 재마운트)
export default function ActTitle({ act }: { act: Act }) {
  const force = usePresentation((state) => state.forceComplete);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), ACT_TITLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible || force) return null;
  return (
    <div className="act-title" aria-hidden="true">
      <span className="act-no">제{act.id}막</span>
      <span className="act-name">{act.title}</span>
    </div>
  );
}

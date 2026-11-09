import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface TypewriterOptions {
  /** 대사가 바뀌면 처음부터 다시 타이핑 */
  resetKey: string;
  total: number;
  delay: number;
  speed: number;
  force: boolean;
}

interface TypewriterResult {
  count: number;
  done: boolean;
}

export function useTypewriter({ resetKey, total, delay, speed, force }: TypewriterOptions): TypewriterResult {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setCount(total);
      return undefined;
    }
    setCount(0);
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCount((current) => {
          if (current >= total) {
            window.clearInterval(intervalId);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
    // force는 아래 effect에서 별도 처리
  }, [resetKey, total, delay, speed, reducedMotion]);

  useEffect(() => {
    if (force) setCount(total);
  }, [force, total]);

  const shown = force || reducedMotion ? total : count;
  return { count: shown, done: shown >= total };
}

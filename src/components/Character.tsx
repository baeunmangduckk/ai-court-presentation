import type { Expression, SpeakerId } from '../data/types';

// 오리지널 SVG 캐릭터 — 표정은 눈·눈썹·입 조합으로 표현

interface FaceProps {
  expression: Expression;
  cx: number;
  cy: number;
  gap: number;
  eyeColor: string;
  mouthColor: string;
  mouthOffset: number;
  showMouth?: boolean;
  showBrows?: boolean;
  cheeks?: boolean;
}

function Eye({ x, y, expression, color }: { x: number; y: number; expression: Expression; color: string }) {
  switch (expression) {
    case 'smile':
      return <path d={`M ${x - 7} ${y + 2} Q ${x} ${y - 7} ${x + 7} ${y + 2}`} stroke={color} strokeWidth={3.5} fill="none" strokeLinecap="round" />;
    case 'shock':
      return (
        <g>
          <circle cx={x} cy={y} r={9} fill="#fff" stroke={color} strokeWidth={2.5} />
          <circle cx={x} cy={y} r={2.6} fill={color} />
        </g>
      );
    case 'think':
      return (
        <g>
          <ellipse cx={x + 3} cy={y + 1} rx={4.5} ry={5.5} fill={color} />
          <path d={`M ${x - 7} ${y - 5} L ${x + 7} ${y - 3}`} stroke={color} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case 'confident':
      return (
        <g>
          <path d={`M ${x - 7} ${y - 1} L ${x + 7} ${y - 1}`} stroke={color} strokeWidth={3} strokeLinecap="round" />
          <path d={`M ${x - 5} ${y} Q ${x} ${y + 6} ${x + 5} ${y}`} fill={color} />
        </g>
      );
    default:
      return (
        <g>
          <ellipse cx={x} cy={y} rx={5} ry={7} fill={color} />
          <circle cx={x + 1.8} cy={y - 2.5} r={1.8} fill="#fff" />
        </g>
      );
  }
}

function Brows({ cx, cy, gap, expression, color }: { cx: number; cy: number; gap: number; expression: Expression; color: string }) {
  const y = cy - 16;
  const l = cx - gap;
  const r = cx + gap;
  const shapes: Record<Expression, [string, string]> = {
    normal: [`M ${l - 8} ${y} Q ${l} ${y - 4} ${l + 8} ${y}`, `M ${r - 8} ${y} Q ${r} ${y - 4} ${r + 8} ${y}`],
    smile: [`M ${l - 8} ${y - 2} Q ${l} ${y - 6} ${l + 8} ${y - 2}`, `M ${r - 8} ${y - 2} Q ${r} ${y - 6} ${r + 8} ${y - 2}`],
    shock: [`M ${l - 8} ${y - 6} Q ${l} ${y - 11} ${l + 8} ${y - 6}`, `M ${r - 8} ${y - 6} Q ${r} ${y - 11} ${r + 8} ${y - 6}`],
    think: [`M ${l - 8} ${y + 1} L ${l + 8} ${y + 2}`, `M ${r - 8} ${y - 5} Q ${r} ${y - 9} ${r + 8} ${y - 4}`],
    sweat: [`M ${l - 8} ${y + 2} L ${l + 8} ${y - 4}`, `M ${r - 8} ${y - 4} L ${r + 8} ${y + 2}`],
    confident: [`M ${l - 8} ${y - 4} L ${l + 8} ${y + 1}`, `M ${r - 8} ${y + 1} L ${r + 8} ${y - 4}`],
  };
  const [left, right] = shapes[expression];
  return (
    <g stroke={color} strokeWidth={3.2} fill="none" strokeLinecap="round">
      <path d={left} />
      <path d={right} />
    </g>
  );
}

function Mouth({ x, y, expression, color }: { x: number; y: number; expression: Expression; color: string }) {
  switch (expression) {
    case 'smile':
      return <path d={`M ${x - 10} ${y} Q ${x} ${y + 13} ${x + 10} ${y} Z`} fill={color} />;
    case 'shock':
      return <ellipse cx={x} cy={y + 3} rx={6} ry={8} fill={color} />;
    case 'think':
      return <path d={`M ${x - 6} ${y + 1} L ${x + 6} ${y - 1}`} stroke={color} strokeWidth={3} strokeLinecap="round" />;
    case 'sweat':
      return <path d={`M ${x - 9} ${y + 2} Q ${x - 4.5} ${y - 3} ${x} ${y + 2} T ${x + 9} ${y + 2}`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />;
    case 'confident':
      return <path d={`M ${x - 7} ${y + 1} Q ${x + 1} ${y + 5} ${x + 9} ${y - 3}`} stroke={color} strokeWidth={3.2} fill="none" strokeLinecap="round" />;
    default:
      return <path d={`M ${x - 6} ${y} Q ${x} ${y + 5} ${x + 6} ${y}`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />;
  }
}

function Face({ expression, cx, cy, gap, eyeColor, mouthColor, mouthOffset, showMouth = true, showBrows = true, cheeks = true }: FaceProps) {
  return (
    <g>
      {showBrows && <Brows cx={cx} cy={cy} gap={gap} expression={expression} color={eyeColor} />}
      <Eye x={cx - gap} y={cy} expression={expression} color={eyeColor} />
      <Eye x={cx + gap} y={cy} expression={expression} color={eyeColor} />
      {cheeks && (
        <g fill="#ff8fa3" opacity={0.45}>
          <ellipse cx={cx - gap - 9} cy={cy + 13} rx={7} ry={4} />
          <ellipse cx={cx + gap + 9} cy={cy + 13} rx={7} ry={4} />
        </g>
      )}
      {showMouth && <Mouth x={cx} y={cy + mouthOffset} expression={expression} color={mouthColor} />}
      {expression === 'sweat' && <path d={`M ${cx + gap + 26} ${cy - 30} Q ${cx + gap + 33} ${cy - 18} ${cx + gap + 26} ${cy - 13} Q ${cx + gap + 19} ${cy - 18} ${cx + gap + 26} ${cy - 30} Z`} fill="#8fd3ff" stroke="#4aa3d8" strokeWidth={1.5} />}
      {expression === 'shock' && (
        <g stroke="#ff6b6b" strokeWidth={3} strokeLinecap="round">
          <path d={`M ${cx - 46} ${cy - 50} l -10 -10`} />
          <path d={`M ${cx} ${cy - 66} l 0 -12`} />
          <path d={`M ${cx + 46} ${cy - 50} l 10 -10`} />
        </g>
      )}
    </g>
  );
}

function Lawyer({ expression }: { expression: Expression }) {
  return (
    <g>
      <path d="M 28 250 Q 32 165 100 152 Q 168 165 172 250 Z" fill="#2b3a67" />
      <path d="M 82 154 L 100 196 L 118 154 Z" fill="#fff" />
      <path d="M 96 162 L 104 162 L 109 202 L 100 214 L 91 202 Z" fill="#3ec1a0" />
      <circle cx={142} cy={186} r={7} fill="#ffcc4d" stroke="#c99a1e" strokeWidth={2} />
      <rect x={90} y={136} width={20} height={20} rx={6} fill="#f7cfb2" />
      <circle cx={100} cy={95} r={50} fill="#ffe0c7" />
      <path d="M 48 98 Q 44 38 100 36 Q 156 38 152 98 Q 146 70 120 62 Q 104 78 74 70 Q 58 78 48 98 Z" fill="#6b4226" />
      <path d="M 100 38 Q 108 16 124 22" stroke="#6b4226" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Face expression={expression} cx={100} cy={100} gap={18} eyeColor="#3a2a1e" mouthColor="#c4505a" mouthOffset={24} showBrows={false} />
      <g stroke="#2b2b2b" strokeWidth={3} fill="none">
        <circle cx={82} cy={100} r={13} />
        <circle cx={118} cy={100} r={13} />
        <path d="M 95 100 L 105 100" />
      </g>
    </g>
  );
}

function Prosecutor({ expression }: { expression: Expression }) {
  return (
    <g>
      <path d="M 28 250 Q 32 165 100 152 Q 168 165 172 250 Z" fill="#e8615a" />
      <path d="M 84 154 L 100 190 L 116 154 Z" fill="#fff" />
      <path d="M 88 168 L 100 176 L 112 168 L 112 184 L 100 176 L 88 184 Z" fill="#2b2b2b" />
      <rect x={90} y={136} width={20} height={20} rx={6} fill="#f2c6a6" />
      <circle cx={100} cy={30} r={20} fill="#1f1f2e" />
      <circle cx={100} cy={95} r={50} fill="#ffe3cf" />
      <path d="M 48 104 Q 42 40 100 40 Q 158 40 152 104 L 140 72 L 128 82 L 118 64 L 100 78 L 86 62 L 72 80 L 60 70 Z" fill="#1f1f2e" />
      <Face expression={expression} cx={100} cy={100} gap={18} eyeColor="#1f1f2e" mouthColor="#b8424a" mouthOffset={24} />
    </g>
  );
}

function Judge({ expression }: { expression: Expression }) {
  return (
    <g>
      <ellipse cx={100} cy={178} rx={66} ry={70} fill="#8a6a4f" />
      <path d="M 34 250 Q 38 172 100 162 Q 162 172 166 250 Z" fill="#2a2438" />
      <path d="M 88 164 L 100 186 L 112 164 Z" fill="#fff" />
      <path d="M 48 60 L 56 26 L 76 52 Z" fill="#a07b5a" />
      <path d="M 152 60 L 144 26 L 124 52 Z" fill="#a07b5a" />
      <ellipse cx={100} cy={96} rx={62} ry={54} fill="#a07b5a" />
      <circle cx={77} cy={96} r={25} fill="#f6ead7" />
      <circle cx={123} cy={96} r={25} fill="#f6ead7" />
      <Face expression={expression} cx={100} cy={96} gap={23} eyeColor="#2a1d12" mouthColor="#e09a2b" mouthOffset={20} showMouth={false} cheeks={false} />
      <path d={expression === 'shock' ? 'M 92 112 L 108 112 L 100 130 Z' : 'M 92 114 L 108 114 L 100 126 Z'} fill="#f2a93b" stroke="#c97d14" strokeWidth={2} />
      <path d="M 60 44 Q 100 24 140 44 L 134 54 Q 100 38 66 54 Z" fill="#2a2438" />
    </g>
  );
}

function Robot({ expression }: { expression: Expression }) {
  const bulb = expression === 'shock' || expression === 'sweat' ? '#ff6b6b' : expression === 'smile' ? '#7ff0d2' : '#ffcc4d';
  return (
    <g>
      <rect x={62} y={146} width={76} height={86} rx={24} fill="#d9eef9" stroke="#6aa9cf" strokeWidth={4} />
      <circle cx={100} cy={186} r={12} fill="#7ff0d2" stroke="#3a8fb7" strokeWidth={3} />
      <rect x={38} y={160} width={22} height={50} rx={11} fill="#d9eef9" stroke="#6aa9cf" strokeWidth={4} />
      <rect x={140} y={160} width={22} height={50} rx={11} fill="#d9eef9" stroke="#6aa9cf" strokeWidth={4} />
      <path d="M 100 44 L 100 22" stroke="#6aa9cf" strokeWidth={4} />
      <circle cx={100} cy={18} r={8} fill={bulb} stroke="#3a8fb7" strokeWidth={2.5} />
      <rect x={36} y={84} width={14} height={26} rx={6} fill="#9fd0ea" />
      <rect x={150} y={84} width={14} height={26} rx={6} fill="#9fd0ea" />
      <rect x={44} y={42} width={112} height={100} rx={32} fill="#bfe3f5" stroke="#6aa9cf" strokeWidth={4} />
      <rect x={58} y={58} width={84} height={66} rx={20} fill="#1f2a44" />
      <Face expression={expression} cx={100} cy={86} gap={18} eyeColor="#7ff0d2" mouthColor="#7ff0d2" mouthOffset={20} showBrows={false} cheeks={false} />
    </g>
  );
}

interface CharacterProps {
  speaker: SpeakerId;
  expression: Expression;
}

export default function Character({ speaker, expression }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full overflow-visible" role="img" aria-hidden="true">
      {speaker === 'lawyer' && <Lawyer expression={expression} />}
      {speaker === 'prosecutor' && <Prosecutor expression={expression} />}
      {speaker === 'judge' && <Judge expression={expression} />}
      {speaker === 'defendant' && <Robot expression={expression} />}
    </svg>
  );
}

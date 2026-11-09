import { characters } from '../data/characters';
import type { Expression, SpeakerId } from '../data/types';
import Character from './Character';

interface CourtSceneProps {
  speaker: SpeakerId;
  expression: Expression;
  talking: boolean;
}

// 화자 위치에 따라 배경(변호인석·검사석·재판장석·증언대)을 전환
export default function CourtScene({ speaker, expression, talking }: CourtSceneProps) {
  const position = characters[speaker].position;
  return (
    <div className={`scene scene-${position}`} aria-hidden="true">
      <div className="scene-wall" />
      {position === 'bench' && <div className="scene-emblem">⚖</div>}
      <div className="scene-char">
        <div key={speaker} className={`char-enter h-full w-full ${talking ? 'char-talk' : ''}`}>
          <Character speaker={speaker} expression={expression} />
        </div>
        <div className={`scene-desk desk-${position}`} />
      </div>
    </div>
  );
}

import { characters } from '../data/characters';
import { usePresentation } from '../store/presentation';

const keys: [string, string][] = [
  ['→ · Space · 클릭', '다음 대사 (타이핑 중이면 즉시 완성)'],
  ['← · Backspace', '이전 대사'],
  ['↓ · PageDown / ↑ · PageUp', '다음 / 이전 장표'],
  ['Home / End', '처음 / 마지막 장표'],
  ['E', '증거 목록'],
  ['F', '전체화면'],
  ['M', '효과음 켜기/끄기'],
  ['H · ?', '도움말'],
];

export default function HelpOverlay() {
  const closeOverlay = usePresentation((state) => state.closeOverlay);
  return (
    <div className="overlay" onClick={(event) => { event.stopPropagation(); closeOverlay(); }}>
      <div className="overlay-card" onClick={(event) => event.stopPropagation()}>
        <div className="mb-[1em] flex items-center justify-between">
          <h2 className="t-headline">❓ 조작법</h2>
          <button type="button" className="overlay-close" onClick={closeOverlay}>
            닫기 (Esc)
          </button>
        </div>
        <dl className="help-grid t-small">
          {keys.map(([key, desc]) => (
            <div key={key} className="contents">
              <dt className="help-key">{key}</dt>
              <dd>{desc}</dd>
            </div>
          ))}
        </dl>
        <h3 className="t-small mt-[1.2em] mb-[0.4em] font-bold text-ink-soft">등장인물</h3>
        <ul className="flex flex-wrap gap-[0.5em] t-small">
          {Object.values(characters).map((character) => (
            <li key={character.id} className="chip" style={{ borderColor: character.color }}>
              <b>{character.name}</b> · {character.role}
            </li>
          ))}
        </ul>
        <p className="t-small mt-[1em] text-ink-soft">URL 끝에 #s7 처럼 붙이면 해당 장표로 바로 이동합니다.</p>
      </div>
    </div>
  );
}

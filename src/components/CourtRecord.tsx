import { acts, slides } from '../data/slides';
import { usePresentation } from '../store/presentation';

// 증거 목록: 막별 장표 목록에서 바로 이동
export default function CourtRecord() {
  const slideIndex = usePresentation((state) => state.slideIndex);
  const goToSlide = usePresentation((state) => state.goToSlide);
  const closeOverlay = usePresentation((state) => state.closeOverlay);

  return (
    <div className="overlay" onClick={(event) => { event.stopPropagation(); closeOverlay(); }}>
      <div className="overlay-card" onClick={(event) => event.stopPropagation()}>
        <div className="mb-[1em] flex items-center justify-between">
          <h2 className="t-headline">🗂 증거 목록</h2>
          <button type="button" className="overlay-close" onClick={closeOverlay}>
            닫기 (Esc)
          </button>
        </div>
        <div className="flex flex-col gap-[1em]">
          {acts.map((act) => (
            <section key={act.id}>
              <h3 className="t-small mb-[0.4em] font-bold text-ink-soft">
                제{act.id}막 · {act.title}
              </h3>
              <div className="record-grid">
                {slides.map((slide, index) =>
                  slide.act === act.id ? (
                    <button
                      key={slide.id}
                      type="button"
                      className={`record-item t-small ${index === slideIndex ? 'record-current' : ''}`}
                      onClick={() => goToSlide(index)}
                    >
                      <b>No.{index + 1}</b> {slide.headline}
                    </button>
                  ) : null,
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

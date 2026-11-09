import type {
  CasePanel,
  ChainPanel,
  ChecklistPanel,
  GatePanel,
  LayersPanel,
  Panel,
  PipelinePanel,
  ScenariosPanel,
  Slide,
  SpectrumPanel,
  StatsPanel,
  TitlePanel,
  BulletsPanel,
  VersusPanel,
} from '../data/types';

interface EvidencePanelProps {
  slide: Slide;
  slideNumber: number;
  reveal: number;
  showTakeaway: boolean;
}

// 공개 여부에 따라 등장 애니메이션 또는 자리 유지(투명)
function shownClass(index: number, reveal: number): string {
  return index < reveal ? 'pop-in' : 'is-hidden';
}

function TitleView({ panel }: { panel: TitlePanel }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[3%] text-center">
      <p className="t-body text-ink-soft">{panel.subtitle}</p>
      <div className="flex flex-wrap justify-center gap-[0.8em] t-body">
        {panel.tags.map((tag) => (
          <span key={tag} className="chip chip-accent">
            {tag}
          </span>
        ))}
      </div>
      <p className="t-small text-ink-soft">{panel.meta}</p>
    </div>
  );
}

function CaseView({ panel, reveal }: { panel: CasePanel; reveal: number }) {
  return (
    <div className="flex h-full flex-col gap-[3%]">
      <p className="case-meta t-small">📁 {panel.meta}</p>
      <div className="case-steps">
        {panel.steps.map((step, index) => (
          <div key={step.label} className={`case-step ${shownClass(index, reveal)}`}>
            <span className={`case-label case-label-${index}`}>{step.label}</span>
            <p className="t-body">{step.text}</p>
          </div>
        ))}
      </div>
      {panel.band && (
        <div className={`band ${reveal >= panel.steps.length ? 'pop-in' : 'is-hidden'}`}>
          <p className="t-small font-bold text-ink-soft">{panel.bandTitle}</p>
          <div className="band-row">
            {panel.band.map((cell) => (
              <div key={cell.label} className="band-cell t-small">
                <b>{cell.label}</b> {cell.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BulletsView({ panel, reveal }: { panel: BulletsPanel; reveal: number }) {
  const offset = panel.hero ? 1 : 0;
  return (
    <div className="flex h-full flex-col justify-center gap-[4%]">
      {panel.hero && (
        <div className={`hero ${shownClass(0, reveal)}`}>
          <span className="t-big text-coral">{panel.hero.value}</span>
          <span className="t-body">{panel.hero.label}</span>
        </div>
      )}
      <ul className="flex flex-col gap-[0.6em]">
        {panel.items.map((item, index) => (
          <li key={item} className={`bullet t-body ${shownClass(index + offset, reveal)}`}>
            <span className="bullet-mark">{panel.numbered ? index + 1 : '◆'}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatsView({ panel, reveal }: { panel: StatsPanel; reveal: number }) {
  return (
    <div className="stats">
      {panel.stats.map((stat, index) => (
        <div key={stat.label} className={`stat stat-${stat.tone} ${shownClass(index, reveal)}`}>
          <span className="t-big">{stat.value}</span>
          <span className="t-body">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function SpectrumView({ panel }: { panel: SpectrumPanel }) {
  return (
    <div className="spectrum t-small">
      <div />
      {panel.columns.map((column, index) => (
        <div key={column} className={`spectrum-head spectrum-head-${index}`}>
          {column}
        </div>
      ))}
      {panel.rows.map((row) => (
        <Row key={row.field} field={row.field} cells={row.cells} />
      ))}
    </div>
  );
}

function Row({ field, cells }: { field: string; cells: string[] }) {
  return (
    <>
      <div className="spectrum-field">{field}</div>
      {cells.map((cell, index) => (
        <div key={cell} className={`spectrum-cell spectrum-cell-${index}`}>
          {cell}
        </div>
      ))}
    </>
  );
}

function ChainView({ panel, reveal }: { panel: ChainPanel; reveal: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[6%]">
      <div className={`chain ${shownClass(0, reveal)}`}>
        {panel.chain.map((item, index) => (
          <span key={item} className="contents">
            {index > 0 && <span className="chain-neq t-big">≠</span>}
            <span className="chain-item t-body">{item}</span>
          </span>
        ))}
      </div>
      {panel.conditions && (
        <div className={`flex flex-col items-center gap-[0.5em] ${shownClass(1, reveal)}`}>
          <p className="t-small font-bold text-ink-soft">{panel.conditionsTitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-[0.5em] t-body">
            {panel.conditions.map((condition, index) => (
              <span key={condition} className="contents">
                {index > 0 && <span className="font-display text-coral">+</span>}
                <span className="chip">{condition}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {panel.notes && (
        <ul className={`flex flex-col gap-[0.5em] ${shownClass(1, reveal)}`}>
          {panel.notes.map((note) => (
            <li key={note} className="bullet t-body">
              <span className="bullet-mark">◆</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LayersView({ panel, reveal }: { panel: LayersPanel; reveal: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[3%]">
      <ol className="layers">
        {panel.layers.map((layer, index) => (
          <li
            key={layer}
            className={`layer t-body ${index === panel.highlight ? 'layer-hl' : ''} ${shownClass(index, reveal)}`}
            style={{ marginInline: `${index * 2.5}%` }}
          >
            <span className="layer-no">{index + 1}</span>
            {layer}
          </li>
        ))}
      </ol>
      {panel.footer && <p className="text-center t-body font-display text-navy">{panel.footer}</p>}
    </div>
  );
}

function ScenariosView({ panel, reveal }: { panel: ScenariosPanel; reveal: number }) {
  return (
    <div className="flex h-full flex-col gap-[3%]">
      <span className="chip chip-warn self-start t-small">🧪 {panel.label}</span>
      <div className="scenarios">
        {panel.scenarios.map((scenario, index) => (
          <div key={scenario.title} className={`scenario ${shownClass(index, reveal)}`}>
            <p className="t-body font-display text-navy">{scenario.title}</p>
            <ul className="flex flex-col gap-[0.35em]">
              {scenario.factors.map((factor) => (
                <li key={factor} className="t-body">
                  · {factor}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function GateView({ panel, reveal }: { panel: GatePanel; reveal: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[4%]">
      <div className={`flex flex-wrap items-center gap-[0.5em] t-small ${shownClass(0, reveal)}`}>
        <span className="font-bold text-ink-soft">감독 방식</span>
        {panel.methods.map((method) => (
          <span key={method} className="chip">
            {method}
          </span>
        ))}
      </div>
      <div className={`gate ${shownClass(1, reveal)}`}>
        <div className="gate-conditions">
          {panel.conditions.map((condition) => (
            <span key={condition} className="gate-cond t-small">
              🔑 {condition}
            </span>
          ))}
        </div>
        <div className="gate-out t-body">
          <span className="gate-pass">✔ 모두 갖추면 → {panel.pass}</span>
          <span className="gate-fail">✘ 하나라도 없으면 → {panel.fail}</span>
        </div>
      </div>
      <p className={`band-warn t-body ${shownClass(2, reveal)}`}>{panel.band}</p>
    </div>
  );
}

function VersusView({ panel, reveal }: { panel: VersusPanel; reveal: number }) {
  return (
    <div className="versus">
      <div className={`versus-side ${shownClass(0, reveal)}`}>
        <p className="t-body font-display">{panel.left.title}</p>
        {panel.left.items.map((item) => (
          <span key={item} className="chip t-small">
            {item}
          </span>
        ))}
      </div>
      <div className={`versus-mid t-small ${shownClass(1, reveal)}`}>
        <span className="t-big text-coral">⇄</span>
        {panel.middle}
      </div>
      <div className={`versus-side versus-right ${shownClass(1, reveal)}`}>
        <p className="t-body font-display">{panel.right.title}</p>
        {panel.right.items.map((item) => (
          <span key={item} className="chip chip-warn t-small">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function PipelineView({ panel, reveal }: { panel: PipelinePanel; reveal: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[6%]">
      <div className={`pipeline t-small ${shownClass(0, reveal)}`}>
        {panel.steps.map((step, index) => (
          <span key={step} className="contents">
            {index > 0 && <span className="pipeline-arrow">→</span>}
            <span className="pipeline-step">{step}</span>
          </span>
        ))}
      </div>
      <div className={`flex flex-col gap-[0.5em] ${shownClass(1, reveal)}`}>
        <p className="t-small font-bold text-ink-soft">🗂 {panel.chipsTitle}</p>
        <div className="flex flex-wrap gap-[0.5em] t-small">
          {panel.chips.map((chip) => (
            <span key={chip} className="chip chip-accent">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChecklistView({ panel, reveal }: { panel: ChecklistPanel; reveal: number }) {
  return (
    <ol className="flex h-full flex-col justify-center gap-[0.55em]">
      {panel.items.map((item, index) => (
        <li key={item} className={`check t-body ${shownClass(index, reveal)}`}>
          <span className="check-box">Q{index + 1}</span>
          {item}
        </li>
      ))}
    </ol>
  );
}

function PanelBody({ panel, reveal }: { panel: Panel; reveal: number }) {
  switch (panel.type) {
    case 'title':
      return <TitleView panel={panel} />;
    case 'case':
      return <CaseView panel={panel} reveal={reveal} />;
    case 'bullets':
      return <BulletsView panel={panel} reveal={reveal} />;
    case 'stats':
      return <StatsView panel={panel} reveal={reveal} />;
    case 'spectrum':
      return <SpectrumView panel={panel} />;
    case 'chain':
      return <ChainView panel={panel} reveal={reveal} />;
    case 'layers':
      return <LayersView panel={panel} reveal={reveal} />;
    case 'scenarios':
      return <ScenariosView panel={panel} reveal={reveal} />;
    case 'gate':
      return <GateView panel={panel} reveal={reveal} />;
    case 'versus':
      return <VersusView panel={panel} reveal={reveal} />;
    case 'pipeline':
      return <PipelineView panel={panel} reveal={reveal} />;
    case 'checklist':
      return <ChecklistView panel={panel} reveal={reveal} />;
  }
}

export default function EvidencePanel({ slide, slideNumber, reveal, showTakeaway }: EvidencePanelProps) {
  const isTitle = slide.panel.type === 'title';
  return (
    <section key={slide.id} className="panel panel-enter" aria-label={`장표 ${slideNumber}`}>
      <span className="panel-tape" aria-hidden="true" />
      <header className="panel-head">
        <span className="panel-badge t-small">증거 No.{slideNumber}</span>
        <h1 className={isTitle ? 't-title' : 't-headline'}>{slide.headline}</h1>
      </header>
      <div className="panel-body">
        <PanelBody panel={slide.panel} reveal={reveal} />
      </div>
      {slide.caution && <p className="panel-caution t-small">{slide.caution}</p>}
      {slide.takeaway && (
        <p className={`takeaway t-body ${showTakeaway ? 'pop-in' : 'is-hidden'}`}>
          <span className="takeaway-tag">개발자 시사점</span>
          {slide.takeaway}
        </p>
      )}
    </section>
  );
}

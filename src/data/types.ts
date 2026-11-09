// 발표 데이터 타입 정의

export type SpeakerId = 'lawyer' | 'prosecutor' | 'judge' | 'defendant';

export type Expression = 'normal' | 'smile' | 'shock' | 'think' | 'sweat' | 'confident';

// 대사 진입 시 화면 연출
export type Effect = 'objection' | 'holdit' | 'verdict' | 'gavel';

export type Position = 'defense' | 'prosecution' | 'bench' | 'witness';

export interface Line {
  speaker: SpeakerId;
  /** **강조** 표기 지원 */
  text: string;
  expression?: Expression;
  effect?: Effect;
  /** 이 대사부터 증거 패널에 공개할 항목 수 */
  reveal?: number;
  /** 이 대사부터 '개발자 시사점' 띠 공개 */
  takeaway?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  tone: 'good' | 'warn' | 'bad';
}

export interface TitlePanel {
  type: 'title';
  subtitle: string;
  tags: string[];
  meta: string;
}

export interface CasePanel {
  type: 'case';
  meta: string;
  steps: { label: string; text: string }[];
  bandTitle?: string;
  band?: { label: string; text: string }[];
}

export interface BulletsPanel {
  type: 'bullets';
  numbered?: boolean;
  hero?: { value: string; label: string };
  items: string[];
}

export interface StatsPanel {
  type: 'stats';
  stats: StatItem[];
}

export interface SpectrumPanel {
  type: 'spectrum';
  columns: string[];
  rows: { field: string; cells: string[] }[];
}

export interface ChainPanel {
  type: 'chain';
  chain: string[];
  conditionsTitle?: string;
  conditions?: string[];
  notes?: string[];
}

export interface LayersPanel {
  type: 'layers';
  layers: string[];
  highlight?: number;
  footer?: string;
}

export interface ScenariosPanel {
  type: 'scenarios';
  label: string;
  scenarios: { title: string; factors: string[] }[];
}

export interface GatePanel {
  type: 'gate';
  methods: string[];
  conditions: string[];
  pass: string;
  fail: string;
  band: string;
}

export interface VersusPanel {
  type: 'versus';
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
  middle: string;
}

export interface PipelinePanel {
  type: 'pipeline';
  steps: string[];
  chipsTitle: string;
  chips: string[];
}

export interface ChecklistPanel {
  type: 'checklist';
  items: string[];
}

export type Panel =
  | TitlePanel
  | CasePanel
  | BulletsPanel
  | StatsPanel
  | SpectrumPanel
  | ChainPanel
  | LayersPanel
  | ScenariosPanel
  | GatePanel
  | VersusPanel
  | PipelinePanel
  | ChecklistPanel;

export interface Act {
  id: number;
  title: string;
}

export interface Slide {
  id: string;
  act: number;
  /** 발표 배정 시간(초) */
  seconds: number;
  headline: string;
  panel: Panel;
  /** 각 막 마지막 장의 개발자 시사점 */
  takeaway?: string;
  /** 수치 해석 단서(※) */
  caution?: string;
  lines: Line[];
}

export interface CharacterInfo {
  id: SpeakerId;
  name: string;
  role: string;
  position: Position;
  color: string;
}

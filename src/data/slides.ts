import type { Act, Slide } from './types';

// 근거: plan/02_slide_map_v2.md(화면 영역) + plan/06_script.md(대본 압축)
// 조문·사건번호는 화면에 노출하지 않는다.

export const acts: Act[] = [
  { id: 1, title: '도입 — AI가 지어낸 판례' },
  { id: 2, title: '어디까지 맡길 수 있나' },
  { id: 3, title: '틀리면 누가 책임지나' },
  { id: 4, title: '안전장치의 함정' },
  { id: 5, title: '개발자는 무엇을 만들어야 하나' },
];

export const slides: Slide[] = [
  // ───────── 1막 ─────────
  {
    id: 'S1',
    act: 1,
    seconds: 20,
    headline: 'AI가 틀리면, 누가 책임지는가',
    panel: {
      type: 'title',
      subtitle: 'AI의 법적 책임과 분야별 진입 가능성 분석',
      tags: ['의료', '사법', '자율주행'],
      meta: '프로그래밍 언어 · 2026년 11월 3일 기준',
    },
    lines: [
      { speaker: 'judge', effect: 'gavel', text: '지금부터 개정합니다. 오늘의 사건은 **AI가 틀리면, 누가 책임지는가**입니다.' },
      { speaker: 'lawyer', expression: 'smile', text: '의료·사법·자율주행 세 분야를 **실제 사건**으로 따라가 보겠습니다. 먼저 미국 법정의 한 사건으로 시작하겠습니다.' },
    ],
  },
  {
    id: 'S2',
    act: 1,
    seconds: 80,
    headline: 'AI가 지어낸 판례가 법원에 그대로 제출됐다',
    panel: {
      type: 'case',
      meta: 'Mata v Avianca · 2023년 6월 22일 · 미국 뉴욕남부연방지방법원',
      steps: [
        { label: '사건', text: 'AI가 만든 존재하지 않는 판결을 제출' },
        { label: '쟁점', text: '지적받은 뒤에도 유지 → 법원 제재' },
        { label: '교훈', text: '문제는 AI 사용이 아니라 검증 누락' },
      ],
    },
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '2023년 미국 법정에 AI가 만들어 낸 **존재하지 않는 판결과 허위 인용**이 제출됐습니다.' },
      { speaker: 'defendant', expression: 'sweat', reveal: 1, text: '그, 그럴듯해 보이는 판례였습니다만…' },
      { speaker: 'lawyer', expression: 'shock', reveal: 2, text: '더 큰 문제는 지적을 받은 뒤에도 이를 유지했다는 점이며, 법원은 변호사 등의 행위를 **제재**했습니다.' },
      { speaker: 'prosecutor', expression: 'confident', reveal: 2, text: '그렇다면 AI를 쓴 것 자체가 잘못이었다는 말씀이군요!' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 3, text: '이의 있습니다! 법원은 AI를 보조로 쓴 것 자체는 문제 삼지 않았고, 핵심은 **원문 검증과 정정 의무**였습니다.' },
      { speaker: 'judge', reveal: 3, text: '다만 모든 AI 오류를 사용자 혼자 떠안는다거나, 모델 공급자의 책임을 부정한 판결은 아닙니다.' },
    ],
  },
  {
    id: 'S3',
    act: 1,
    seconds: 50,
    headline: '오늘 답할 질문은 세 가지다',
    panel: {
      type: 'bullets',
      numbered: true,
      items: ['AI에게 어디까지 맡길 수 있나', '틀리면 누가 책임지나', '그래서 무엇을 만들어야 하나'],
    },
    takeaway: "설명·감독·계약은 '출시 조건'이다",
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '이 사건 하나가 세 가지 질문을 던집니다. 첫째, **AI에게 어디까지 맡길 수 있는가**입니다.' },
      { speaker: 'lawyer', reveal: 3, text: '둘째, **틀리면 누가 책임지는가**. 셋째, **그래서 무엇을 만들어야 하는가**입니다.' },
      { speaker: 'judge', reveal: 3, takeaway: true, text: '설명·감독·계약은 **제품의 출시 조건**입니다. 그리고 **원인과 책임을 입증할 기록**이 곧 개발자의 몫임을 기억해 두십시오.' },
    ],
  },

  // ───────── 2막 ─────────
  {
    id: 'S4',
    act: 2,
    seconds: 55,
    headline: '같은 정확도라도, 맡기는 일에 따라 허용 범위가 다르다',
    panel: {
      type: 'spectrum',
      columns: ['보조', '조건부', '관문'],
      rows: [
        { field: '의료', cells: ['영상 분석·기록 초안', '허가 기능·의료 자격 조건부', '의료행위 자격 + 제품 심사'] },
        { field: '사법·법률', cells: ['검색·요약·초안', '민간은 법률사무 해당성 검토', 'AI 독립 재판권 행사 불가'] },
        { field: '자율주행', cells: ['운전자 보조', '조건부·한정 자동주행', '수준·ODD·허가 조건별 상이'] },
      ],
    },
    lines: [
      { speaker: 'prosecutor', expression: 'confident', text: '정확도만 높으면 어디든 맡겨도 되는 것 아닙니까?' },
      { speaker: 'lawyer', effect: 'holdit', text: '잠깐! 같은 정확도의 AI라도 **맡기는 업무와 실패 대응 체계**에 따라 허용 범위가 달라집니다.' },
      { speaker: 'lawyer', expression: 'think', text: '왼쪽 보조 열은 비슷하지만, 오른쪽으로 갈수록 자격·재판권·운행 승인이라는 **관문**이 달라집니다.' },
      { speaker: 'judge', text: '다만 이 구분은 분석을 위한 표현이며, **법정 허가등급은 아닙니다.**' },
    ],
  },
  {
    id: 'S5',
    act: 2,
    seconds: 50,
    headline: "생성형 AI도 '판독 보조'라는 정해진 역할로 허가됐다",
    panel: {
      type: 'bullets',
      items: [
        '2026년 4월 1일, 국내 최초 생성형 AI 디지털의료기기 허가',
        '흉부 X선 → 텍스트 예비소견서, 용도는 판독 보조',
        "'참고용'이라고 써도 진단 기능은 진단 기능",
      ],
    },
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '2026년 4월 1일, 식약처가 **국내 최초 생성형 AI 디지털의료기기** 허가를 발표했습니다.' },
      { speaker: 'defendant', expression: 'smile', reveal: 2, text: '흉부 X선을 분석해 예비소견서를 만드는 일입니다! 허가 용도는 전문의의 **판독 보조**입니다.' },
      { speaker: 'lawyer', expression: 'think', reveal: 3, text: "개발자가 기억할 점이 있습니다. **'참고용'이라는 문구만으로 실제 진단 기능이 비의료기기가 되지는 않습니다.**" },
    ],
  },
  {
    id: 'S6',
    act: 2,
    seconds: 50,
    headline: '의료 AI, 써본 의사는 많은데 지침과 교육은 드물다',
    panel: {
      type: 'stats',
      stats: [
        { value: '47.7%', label: '활용 경험', tone: 'good' },
        { value: '5.1%', label: '기관 내 지침 보유', tone: 'bad' },
        { value: '24.1%', label: '교육 경험', tone: 'warn' },
      ],
    },
    caution: '※ 의사 2,125명 응답 기준 — 전체 의료기관의 지침 보유율 아님',
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '현장은 준비가 되어 있을까요? 2025년 조사에서 의사 2,125명 중 의료 AI 활용 경험은 **47.7%**였습니다.' },
      { speaker: 'lawyer', expression: 'shock', reveal: 3, text: '반면 기관 내 지침 보유 사례는 **5.1%**, 교육 경험은 **24.1%**에 그쳤습니다.' },
      { speaker: 'judge', reveal: 3, text: '단, 5.1%는 의사 응답 기준이므로 **전체 의료기관의 지침 보유율**로 보면 안 됩니다.' },
      { speaker: 'lawyer', reveal: 3, text: '제품 검증과 함께 **운영 지침과 교육**도 갖춰야 한다는 신호입니다.' },
    ],
  },
  {
    id: 'S7',
    act: 2,
    seconds: 60,
    headline: '위험 점수는 판사를 도울 뿐, 대신하지 못한다',
    panel: {
      type: 'case',
      meta: 'State v. Loomis · 2016년 · 미국 위스콘신주 대법원',
      steps: [
        { label: '사건', text: '재범위험 점수(COMPAS)를 양형에 고려' },
        { label: '쟁점', text: '점수가 형량을 정해도 되는가' },
        { label: '교훈', text: '점수는 참고, 결정적 근거는 아니다' },
      ],
    },
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '이번에는 법정입니다. 2016년 위스콘신주 대법원에서 **COMPAS 위험평가**를 고려한 양형이 쟁점이 됐습니다.' },
      { speaker: 'prosecutor', expression: 'confident', reveal: 2, text: '점수가 정확하다면, 형량도 점수로 정하면 되지 않습니까?' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 3, text: '이의 있습니다! 법원은 적법절차 위반은 아니라고 보면서도, 점수가 **결정적 근거가 되어서는 안 된다**는 한계를 제시했습니다.' },
      { speaker: 'judge', reveal: 3, text: '우리 헌법도 사법권을 법원에 둡니다. AI는 검색·요약·초안을 도울 수 있어도 **독립적으로 재판권을 행사할 수는 없습니다.**' },
    ],
  },
  {
    id: 'S8',
    act: 2,
    seconds: 70,
    headline: '사람 한 명을 배치해 두는 것만으로는 감독이 되지 않는다',
    panel: {
      type: 'case',
      meta: 'Uber Tempe · 2018년 · 미국 애리조나주 · NTSB 안전조사',
      steps: [
        { label: '사건', text: '자율주행 시험차 보행자 사망 사고' },
        { label: '쟁점', text: '주된 원인은 안전요원의 감시 실패' },
        { label: '교훈', text: '조직의 안전문화 문제도 기여 요인' },
      ],
      bandTitle: '자동화 단계별 사람의 역할',
      band: [
        { label: 'L2', text: '계속 감시' },
        { label: 'L3', text: '요청 시 인수' },
        { label: 'L4', text: 'ODD 내 인수 전제 안 함' },
        { label: 'L5', text: '개입 불필요' },
      ],
    },
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '2018년 애리조나주 Tempe에서 자율주행 시험차의 **보행자 사망 사고**가 있었습니다.' },
      { speaker: 'prosecutor', expression: 'confident', reveal: 1, text: '안전요원이 타고 있었지요. 그 사람이 감시를 못 한 것이 원인입니다!' },
      { speaker: 'lawyer', effect: 'holdit', reveal: 2, text: '잠깐! NTSB는 안전요원의 감시 실패를 **주된 원인**으로 보았지만, 분석은 거기서 끝나지 않았습니다.' },
      { speaker: 'lawyer', expression: 'think', reveal: 3, text: '위험평가 미흡, 안전요원 감독 부실 같은 **안전문화 문제**와 공적 감독 부족도 기여 요인으로 지적됐습니다.' },
      { speaker: 'judge', reveal: 3, text: '사람 한 명을 배치하는 것만으로 **감독이 실효성을 갖추지는 못합니다.**' },
    ],
  },
  {
    id: 'S9',
    act: 2,
    seconds: 45,
    headline: 'AI 권한을 넓히는 순간, 처음부터 다시 따져야 한다',
    panel: {
      type: 'bullets',
      items: [
        '관문: 의료 = 자격·제품 심사 / 사법 = 재판권 / 자율주행 = ODD·운행 승인',
        '추천 → 실행, 내부용 → 대고객용 = 별도 심사',
        '시험 성능이 좋다는 이유만으로 넓히지 않는다',
      ],
    },
    takeaway: '탐지·추천·실행 권한을 나눠 설계한다',
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '정리하면, 의료는 자격과 제품 심사, 사법은 재판권, 자율주행은 ODD와 운행 승인이 관문입니다.' },
      { speaker: 'lawyer', reveal: 2, text: '추천에서 실행으로, 내부용에서 대고객용으로 넓힐 때마다 목적·영향·데이터·감독 체계를 **다시 검토**해야 합니다.' },
      { speaker: 'judge', effect: 'verdict', reveal: 3, takeaway: true, text: '시험 성능만으로 권한을 넓히지 마십시오. 처음부터 **탐지·추천·실행 권한을 나눠 설계**해야 합니다.' },
    ],
  },

  // ───────── 3막 ─────────
  {
    id: 'S10',
    act: 3,
    seconds: 45,
    headline: 'AI가 틀렸다고 곧바로 누군가의 책임이 되지는 않는다',
    panel: {
      type: 'chain',
      chain: ['출력의 오류', '제품의 결함', '법적 책임'],
      conditionsTitle: '민사 책임 = 모두 확인되어야',
      conditions: ['의무 위반·결함', '손해', '인과관계'],
    },
    lines: [
      { speaker: 'prosecutor', expression: 'confident', reveal: 0, text: 'AI가 틀렸습니다. 그러니 당연히 누군가 책임져야겠지요!' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 1, text: '이의 있습니다! 보고서는 **출력의 오류, 제품의 결함, 법적 책임**을 구분합니다.' },
      { speaker: 'lawyer', reveal: 2, text: '민사 책임이 인정되려면 의무 위반이나 결함, 손해, 그리고 그 사이의 **인과관계**가 모두 확인되어야 합니다.' },
      { speaker: 'judge', reveal: 2, text: '책임을 가르는 기준은 오류 자체가 아니라 **의무 위반과 손해의 원인**입니다.' },
    ],
  },
  {
    id: 'S11',
    act: 3,
    seconds: 55,
    headline: 'AI 서비스 하나에 책임을 따질 주체가 다섯 층 있다',
    panel: {
      type: 'layers',
      layers: ['개발사·모델 공급자', '통합·서비스 공급자', '도입사·운영기관', '전문직 사용자', '일반 사용자'],
      highlight: 1,
      footer: '여러분은 어느 층에서 일하게 될까요?',
    },
    lines: [
      { speaker: 'lawyer', reveal: 5, text: 'AI 서비스 하나에는 책임을 따져 볼 주체가 **다섯 층** 있습니다.' },
      { speaker: 'defendant', expression: 'think', reveal: 5, text: '범용 모델인 저에게 RAG를 붙이고 프롬프트와 권한을 설계하면… 그쪽도 **통합·서비스 공급자**가 되는 건가요?' },
      { speaker: 'lawyer', expression: 'smile', reveal: 5, text: '그렇습니다. 이 층에서는 **자료 선정과 권한 설계, 변경 관리**를 봅니다.' },
      { speaker: 'judge', reveal: 5, text: '다만 위아래는 공급 흐름일 뿐, **책임 순위나 비율이 아닙니다.** 여러분은 어느 층에서 일하게 되겠습니까?' },
    ],
  },
  {
    id: 'S12',
    act: 3,
    seconds: 60,
    headline: '챗봇의 잘못된 안내도 도입한 회사의 책임이 된다',
    panel: {
      type: 'case',
      meta: 'Moffatt v Air Canada · 2024년 · 캐나다 BC 민사해결심판소',
      steps: [
        { label: '사건', text: '챗봇이 사별 할인 신청 조건을 잘못 안내' },
        { label: '쟁점', text: '다른 웹페이지엔 정확한 정보가 있었다' },
        { label: '교훈', text: '그래도 챗봇 안내의 책임은 남았다' },
      ],
    },
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '2024년 캐나다의 **Moffatt v Air Canada** 사건입니다. 항공사 챗봇이 사별 할인 조건을 잘못 안내했습니다.' },
      { speaker: 'prosecutor', expression: 'confident', reveal: 2, text: '하지만 다른 웹페이지에는 정확한 정보가 있었습니다! 확인하지 않은 고객의 탓입니다.' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 3, text: '이의 있습니다! 심판소는 정확한 정보를 제공할 **주의의무**와 고객의 **합리적 신뢰**를 인정했습니다.' },
      { speaker: 'judge', reveal: 3, text: '다만 확인된 것은 **도입사의 책임**이며, 범용 모델 제공자의 책임까지 판단한 사건은 아닙니다.' },
    ],
  },
  {
    id: 'S13',
    act: 3,
    seconds: 55,
    headline: '운전자가 있었어도 제조사의 결함 책임이 함께 인정될 수 있다',
    panel: {
      type: 'case',
      meta: 'Benavides v Tesla · 2026년 2월 20일 · 미국 플로리다남부연방지방법원',
      steps: [
        { label: '사건', text: 'Autopilot 관련 사고, 설계·경고 결함 평결' },
        { label: '쟁점', text: '운전자 역할이 있는데 제조사 책임은?' },
        { label: '교훈', text: '운전자 역할과 제조사 결함 책임은 병존 가능' },
      ],
    },
    caution: '※ 배심의 Tesla 책임 비율 33% — 다른 사고에 적용할 고정 비율 아님',
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '2026년 2월 20일 **Benavides v Tesla** 결정입니다. Autopilot 관련 사고에서 설계·경고 결함 평결이 나왔고, 법원은 평결 후 신청을 기각했습니다.' },
      { speaker: 'prosecutor', expression: 'confident', reveal: 2, text: '운전석에 사람이 있었습니다. 운전자 책임이면 충분하지 않습니까?' },
      { speaker: 'lawyer', effect: 'holdit', reveal: 3, text: '잠깐! 운전자에게 역할이 있었더라도 **제조사의 결함 책임이 병존할 수 있습니다.**' },
      { speaker: 'judge', reveal: 3, text: '33%는 이 사건 배심이 판단한 Tesla의 책임 비율일 뿐, **다른 사고에 적용할 고정 비율은 아닙니다.**' },
    ],
  },
  {
    id: 'S14',
    act: 3,
    seconds: 55,
    headline: '마지막에 클릭한 사람에게 모든 책임을 돌리지 않는다',
    panel: {
      type: 'scenarios',
      label: '가정 사례',
      scenarios: [
        { title: '의료 AI 병변 누락', factors: ['취약 환자군을 숨긴 공급자', '검증·교육을 생략한 병원', '불일치를 확인하지 않은 의료인'] },
        { title: '허위 판례 서면 제출', factors: ['검색 결함', '검증 실패'] },
        { title: '레벨 3 차량 공사구간 충돌', factors: ['늦은 인수 요구 설계', '운전자의 요청 무시'] },
      ],
    },
    takeaway: '기록은 누가 무엇을 통제·실행했는지 보여야 한다',
    lines: [
      { speaker: 'judge', reveal: 0, text: '이 장은 책임 검토 순서를 보여 주는 **가정 사례**이며, 확정 판례가 아닙니다.' },
      { speaker: 'lawyer', reveal: 1, text: '의료 AI가 병변을 놓쳤다면 공급자, 병원, 의료인이 **함께 원인**이 될 수 있습니다.' },
      { speaker: 'lawyer', reveal: 3, text: '허위 판례 서면은 검색 결함과 검증 실패를, 레벨 3 차량은 늦은 인수 요구 설계와 운전자의 요청 무시를 함께 봅니다.' },
      { speaker: 'prosecutor', expression: 'sweat', reveal: 3, text: '그, 그래도 마지막에 버튼을 누른 사람이…' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 3, text: '이의 있습니다! **모든 손해를 마지막에 클릭한 사람에게 돌리지 않습니다.**' },
      { speaker: 'judge', effect: 'verdict', reveal: 3, takeaway: true, text: '그러므로 기록은 **누가 무엇을 통제·실행했는지** 보여 주어야 합니다.' },
    ],
  },

  // ───────── 4막 ─────────
  {
    id: 'S15',
    act: 4,
    seconds: 65,
    headline: '사람을 앉혀 두는 것은 감독이 아니다',
    panel: {
      type: 'gate',
      methods: ['사전 승인', '감시·개입', '제한된 자동 실행'],
      conditions: ['정보·역량', '충분한 시간', '번복·중단 권한', '대체 절차'],
      pass: '실효적 감독',
      fail: '형식적 승인',
      band: '감독자 배치 ≠ 개발·도입자 책임 면제',
    },
    lines: [
      { speaker: 'prosecutor', expression: 'confident', reveal: 0, text: '사람이 최종 승인만 하면 안전장치는 충분합니다!' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 1, text: '이의 있습니다! 감독은 업무에 따라 사전 승인, 감시·개입, 제한된 자동 실행 중에서 고릅니다.' },
      { speaker: 'lawyer', reveal: 2, text: '그러나 정보와 역량, **충분한 시간**, 번복·중단 권한, 대체 절차가 없으면 승인은 **형식**에 그칩니다.' },
      { speaker: 'defendant', expression: 'sweat', reveal: 2, text: '제가 검토자가 감당 못 할 만큼 출력을 쏟아내면… 사전 승인이 **형식화**될 수 있겠네요.' },
      { speaker: 'judge', reveal: 3, text: '또한 감독자를 배치했다고 **개발·도입자의 책임이 면제되지는 않습니다.**' },
    ],
  },
  {
    id: 'S16',
    act: 4,
    seconds: 50,
    headline: '그럴듯한 설명이 정확하다는 보증은 아니다',
    panel: {
      type: 'chain',
      chain: ['설명', '정확성', '인과', '면책'],
      notes: [
        'SHAP·LIME·히트맵은 근사이거나 국소적일 수 있다',
        "생성형 AI의 '자기 설명'은 실제 판단 과정의 기록이 아니다",
      ],
    },
    lines: [
      { speaker: 'defendant', expression: 'smile', reveal: 1, text: '제가 이렇게 판단한 이유는요… 아주 그럴듯하게 설명해 드릴 수 있습니다!' },
      { speaker: 'lawyer', effect: 'holdit', reveal: 2, text: '잠깐! LLM의 **자기 설명**은 실제 판단 과정의 충실한 기록으로 볼 수 없습니다. SHAP·LIME·히트맵 같은 **사후 설명**도 근사이거나 국소적일 수 있습니다.' },
      { speaker: 'judge', reveal: 2, text: '설명가능성은 정확성과 면책을 보장하지 않습니다. 설명은 원문·입력·버전·결정 사유를 연결해 **검증과 이의제기**를 가능하게 해야 합니다.' },
    ],
  },
  {
    id: 'S17',
    act: 4,
    seconds: 65,
    headline: '출처가 달려 있어도, 검증은 따로 해야 한다',
    panel: {
      type: 'bullets',
      hero: { value: '17~33%', label: '상용 RAG 법률 도구 환각 비율' },
      items: ['출처 표시 ≠ 검증', 'AI에게 다시 묻기 ≠ 독립 검증'],
    },
    caution: '※ 2024년 평가 당시의 도구·질문·평가 정의에 한정된 결과',
    lines: [
      { speaker: 'prosecutor', expression: 'confident', reveal: 0, text: '출처까지 달아 주는 RAG라면 믿어도 되지 않습니까?' },
      { speaker: 'lawyer', effect: 'holdit', reveal: 1, text: '잠깐! 2024년 평가에서 시험한 상용 RAG 법률 도구의 환각 비율은 **17~33%**였습니다.' },
      { speaker: 'judge', reveal: 1, text: '당시의 도구·질문·평가 정의에 한정된 결과이므로, **현재 제품의 오류율로 쓰면 안 됩니다.**' },
      { speaker: 'lawyer', reveal: 2, text: '그래도 **출처 표시만으로 검증을 대체할 수 없다**는 실무상 근거는 됩니다.' },
      { speaker: 'defendant', expression: 'smile', reveal: 2, text: '그럼 제 요약이 맞는지 저한테 다시 물어보시면 되겠네요!' },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 3, text: '이의 있습니다! AI에게 다시 묻는 것은 **독립적인 검증이 아닙니다.**' },
    ],
  },
  {
    id: 'S18',
    act: 4,
    seconds: 60,
    headline: '"모든 책임은 이용자에게" 한 줄로 안전 의무를 대신할 수 없다',
    panel: {
      type: 'versus',
      left: { title: '상류 모델 약관', items: ['책임상한', '정확성 불보증'] },
      right: { title: '하류 고객 약속', items: ['무오류', '무중단', '무제한 배상'] },
      middle: '상류에 동일한 보증·지원 없음',
    },
    takeaway: '화면·광고·약관이 약속하는 기능을 일치시킨다',
    lines: [
      { speaker: 'prosecutor', expression: 'confident', reveal: 0, text: "약관에 '참고용', '모든 책임은 이용자에게'라고 적어 두었습니다. 이것으로 끝입니다!" },
      { speaker: 'lawyer', effect: 'objection', expression: 'confident', reveal: 0, text: '이의 있습니다! 그 한 줄만으로는 **안전 의무를 대신할 수 없습니다.** 강행규정과 피해자의 법정 청구권도 따져야 합니다.' },
      { speaker: 'lawyer', reveal: 2, text: '상류 약관엔 책임상한과 정확성 불보증이 있는데 고객에게 무오류·무제한 배상을 약속하면 **잔여 위험**이 커집니다.' },
      { speaker: 'judge', effect: 'verdict', reveal: 2, takeaway: true, text: '잔여 위험은 용도·권한·가격·보험에 반영하고, **화면·광고·약관이 약속하는 기능을 일치**시키십시오.' },
    ],
  },

  // ───────── 5막 ─────────
  {
    id: 'S19',
    act: 5,
    seconds: 70,
    headline: '책임을 가리는 증거는 개발 단계에서 만들어진다',
    panel: {
      type: 'pipeline',
      steps: ['입력', '당시 출력', '모델 버전', '검색 문서', '설정', '승인', '수정 이력'],
      chipsTitle: '개발 산출물',
      chips: ['모델카드·데이터 출처', '전문가 검수 시험셋', '집단별·중대 오류 결과', '인간 검토 기록', '변경 승인·롤백 기록'],
    },
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '사고가 났다고 가정해 봅시다. 어떤 입력에 어떤 모델 버전이 무엇을 출력했고, 누가 승인·수정했는지 보여 줄 수 있습니까?' },
      { speaker: 'defendant', expression: 'think', reveal: 1, text: '제 기록을 하나씩 따로 두지 말고 **서로 연결**해 두어야겠군요!' },
      { speaker: 'lawyer', reveal: 2, text: '여기에 모델카드, 검수 시험셋, 오류 결과, 변경 승인·롤백 기록을 **묶어 관리**합니다. 모두 **개발 단계의 산출물**입니다.' },
      { speaker: 'judge', reveal: 2, text: '다만 민감정보를 원문째 오래 쌓아 두는 것은 피해야 합니다.' },
    ],
  },
  {
    id: 'S20',
    act: 5,
    seconds: 55,
    headline: '출시 전, 이 다섯 가지 질문에 답할 수 있는가',
    panel: {
      type: 'checklist',
      items: [
        'AI가 추천·승인·실행하는 범위가 명확한가',
        '허위 인용·누락·주입·유출·무단 실행을 시험했는가',
        '검토자에게 역량·시간·권한·대체 절차가 있는가',
        '모델·데이터 변경 시 재검증·중단 기준이 있는가',
        '사고 시 자료 보전·통지·피해 구제가 가능한가',
      ],
    },
    lines: [
      { speaker: 'judge', effect: 'gavel', reveal: 0, text: '그럼 출시 전 **심문**을 시작하겠습니다. 다섯 가지 질문에 답할 수 있습니까?' },
      { speaker: 'lawyer', reveal: 2, text: '첫째, 추천·승인·실행 범위가 명확한가. 둘째, 허위 인용·누락·주입·유출·무단 실행을 시험했는가.' },
      { speaker: 'lawyer', reveal: 3, text: '셋째, 검토자에게 역량·시간·권한·대체 절차가 있는가.' },
      { speaker: 'lawyer', reveal: 5, text: '넷째, 변경 시 재검증과 중단 기준이 있는가. 다섯째, 자료 보전·통지·피해 구제가 가능한가.' },
      { speaker: 'defendant', expression: 'sweat', reveal: 5, text: '여러분의 프로젝트는… 몇 개에 답할 수 있습니까?' },
      { speaker: 'judge', reveal: 5, text: '단, 이 점검표 자체가 **적법성 인증이나 면책 기준은 아닙니다.**' },
    ],
  },
  {
    id: 'S21',
    act: 5,
    seconds: 55,
    headline: 'AI의 권한은 쌓인 통제 증거만큼만 넓힌다',
    panel: {
      type: 'bullets',
      items: [
        '다시 Mata: 원문 검증과 정정 절차가 있었다면',
        '정확도가 아니라 권한·실행 구조가 경계를 정한다',
        '한 사람의 최종 승인으로 책임이 정해지지 않는다',
      ],
    },
    takeaway: '원문 대조·검증 이력·정정 절차를 제품 기능으로 만든다',
    lines: [
      { speaker: 'lawyer', reveal: 1, text: '처음의 Mata 사건으로 돌아가 보겠습니다. 핵심은 **원문 검증과 정정 의무**였습니다.' },
      { speaker: 'lawyer', reveal: 2, text: '경계를 정한 것은 AI의 지능보다 **권한과 실행 구조**였습니다.' },
      { speaker: 'lawyer', reveal: 3, text: '그리고 책임은 **최종 승인 한 번**으로 정해지지 않았습니다.' },
      { speaker: 'judge', effect: 'verdict', reveal: 3, takeaway: true, text: '판결합니다. 검증 절차를 사용자의 선의에 맡기지 말고 **원문 대조·검증 이력·정정 기능**으로 제품에 넣으십시오. AI의 권한은 **통제 증거가 쌓인 만큼만** 넓힙니다.' },
      { speaker: 'lawyer', expression: 'smile', reveal: 3, takeaway: true, text: '감사합니다. 질문 받겠습니다!' },
      { speaker: 'defendant', expression: 'smile', reveal: 3, takeaway: true, text: '(휴… 저도 검증받으면서 일하겠습니다!)' },
    ],
  },
];

// 각 장표 종료 시점까지의 누적 배정 시간(초)
export const cumulativeSeconds: number[] = slides.reduce<number[]>((acc, slide) => {
  const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
  acc.push(prev + slide.seconds);
  return acc;
}, []);

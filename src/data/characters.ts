import type { CharacterInfo, SpeakerId } from './types';

// 오리지널 등장인물 (특정 게임 캐릭터와 무관)
export const characters: Record<SpeakerId, CharacterInfo> = {
  lawyer: { id: 'lawyer', name: '나바름', role: '개발자 출신 변호사', position: 'defense', color: '#3ec1a0' },
  prosecutor: { id: 'prosecutor', name: '강단언', role: '검사', position: 'prosecution', color: '#ff7a6b' },
  judge: { id: 'judge', name: '부엉 재판장', role: '재판장', position: 'bench', color: '#ffcc4d' },
  defendant: { id: 'defendant', name: '토큰이', role: 'AI 피고', position: 'witness', color: '#7cc8f0' },
};

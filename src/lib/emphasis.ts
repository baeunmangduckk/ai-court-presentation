// **강조** 표기를 구간 단위로 분리해 타자기 효과에서 글자 수 기준으로 잘라 쓴다

export interface TextSegment {
  text: string;
  strong: boolean;
}

export function parseEmphasis(source: string): TextSegment[] {
  return source
    .split('**')
    .map((text, index) => ({ text, strong: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

export function segmentsLength(segments: TextSegment[]): number {
  return segments.reduce((sum, segment) => sum + segment.text.length, 0);
}

/** 앞에서부터 count 글자만 남긴 구간 목록 */
export function sliceSegments(segments: TextSegment[], count: number): TextSegment[] {
  const result: TextSegment[] = [];
  let remaining = count;
  for (const segment of segments) {
    if (remaining <= 0) break;
    result.push({ text: segment.text.slice(0, remaining), strong: segment.strong });
    remaining -= segment.text.length;
  }
  return result;
}

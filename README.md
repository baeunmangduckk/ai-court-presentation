# AI 책임 법정 — 법정 게임풍 발표 페이지

「AI가 틀리면, 누가 책임지는가」 발표(21장, 약 19분 30초)를 법정 비주얼노벨 형식으로 진행하는 웹페이지입니다.
등장인물·그림은 모두 CSS/SVG로 직접 만든 오리지널입니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 체크 + 정적 빌드(dist/)
npm run preview  # 빌드 결과 미리보기
```

## 조작법

| 키 | 동작 |
|---|---|
| → · Space · Enter · 클릭 | 다음 대사 (타이핑 중이면 즉시 완성) |
| ← · Backspace | 이전 대사 |
| ↓ · PageDown / ↑ · PageUp | 다음 / 이전 장표 |
| Home / End | 처음 / 마지막 장표 |
| E | 증거 목록(장표 바로 이동) |
| F | 전체화면 |
| M | 효과음 켜기/끄기 |
| H · ? | 도움말 |

- URL `#s7` → 7번 장표, `#s7-3` → 7번 장표의 3번째 대사로 바로 이동합니다.
- 상단 ⏱ 은 발표 경과 시간 / 현재 장표까지의 배정 시간이며, 배정을 넘기면 빨간색으로 바뀝니다. 클릭하면 초기화됩니다.

## 내용 수정

- 장표·대사: `src/data/slides.ts`
  - `lines[].reveal`: 해당 대사부터 증거 패널에 공개할 항목 수
  - `lines[].effect`: `objection`(이의 있습니다!) · `holdit`(잠깐!) · `verdict`(판결!) · `gavel`(개정!)
  - `lines[].expression`: `normal` · `smile` · `shock` · `think` · `sweat` · `confident`
  - 대사 안 `**강조**` 는 노란색으로 표시됩니다.
- 등장인물: `src/data/characters.ts`, 그림: `src/components/Character.tsx`

## GitHub Pages 배포

1. GitHub에서 빈 저장소를 만듭니다.
2. 이 폴더에서 원격 저장소를 연결하고 push 합니다.
   ```bash
   git remote add origin https://github.com/<계정>/<저장소>.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 바꿉니다.
4. `main` 에 push 할 때마다 `.github/workflows/deploy.yml` 이 빌드·배포합니다.
   주소: `https://<계정>.github.io/<저장소>/`

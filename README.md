# Portfolio

React + Vite + TanStack Router + Tailwind CSS v4 + shadcn/ui 기반의 반응형 개인 포트폴리오 사이트입니다.
React Bits와 Magic UI 컴포넌트로 인터랙션을 구성했습니다.

## 시작하기

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ 생성 (+ SPA용 404.html)
npm run preview
```

## 콘텐츠 수정

| 무엇을 | 어디서 |
| --- | --- |
| 이름, 소개, 이메일, 소셜 링크, 통계, 기술 스택 | `src/data/site.ts` → `site` |
| 프로젝트 3개 (제목, 설명, 태그, 커버 색상, 링크) | `src/data/site.ts` → `projects` |
| 히어로 이미지 | `src/assets/hero.svg` (본인 사진으로 교체 가능) |
| 파비콘 / 페이지 제목 | `public/favicon.svg`, `index.html` |

## 사용한 컴포넌트

- **shadcn/ui**: Button, Card, Input, Textarea, Label, Badge, Sheet(모바일 메뉴), Sonner(토스트), Separator
- **Magic UI**: BlurFade, MagicCard, BorderBeam, ShimmerButton, Marquee, DotPattern, AnimatedThemeToggler, NumberTicker
- **React Bits**: Aurora(히어로 배경), SplitText(헤드라인), ShinyText, GradientText(로고), SpotlightCard

## Contact 폼

GitHub Pages에는 서버가 없으므로 외부 폼 서비스(Formspree, Web3Forms 등)를 사용합니다.

```bash
cp .env.example .env.local
# VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

값이 없으면 제출 시 메일 앱(`mailto:`)이 열립니다.

## GitHub Pages 배포

> 배포는 자동으로 실행되지 않습니다. 아래 단계를 직접 진행하세요.

1. GitHub 저장소 생성 후 코드 push
2. **Settings → Pages → Source**를 **GitHub Actions**로 설정
3. (선택) **Settings → Secrets and variables → Actions → Variables**에 `VITE_CONTACT_ENDPOINT` 추가
4. **Actions → Deploy to GitHub Pages → Run workflow** 실행

워크플로(`.github/workflows/deploy.yml`)는 수동 실행(`workflow_dispatch`)만 허용하며,
저장소 이름에 맞춰 base 경로(`/<repo>/`, `<user>.github.io` 저장소면 `/`)를 자동 설정합니다.

로컬에서 Pages용 빌드를 확인하려면 `package.json`의 `build:pages` 스크립트에서 저장소 이름을 맞춘 뒤 실행하세요.

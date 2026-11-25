// 사이트에 표시되는 모든 콘텐츠는 이 파일에서 수정하면 됩니다.

export const site = {
  name: "sno",
  role: "Frontend Developer & UI Engineer",
  headline: "안녕하세요. 김요셉입니다.",
  intro:
    "사용자가 머무르고 싶어지는 웹을 만듭니다. React와 TypeScript를 중심으로 디자인 시스템, 인터랙션, 성능 최적화까지 제품 전반을 다룹니다.",
  location: "Seoul, Korea",
  email: "hello@example.com",
  available: true,
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years of experience" },
    { value: 40, suffix: "+", label: "Projects shipped" },
    { value: 12, suffix: "", label: "Happy clients" },
  ],
  stack: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "TanStack",
    "Next.js",
    "Node.js",
    "Figma",
    "Motion",
    "GSAP",
    "WebGL",
    "Storybook",
  ],
} as const

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  year: string
  role: string
  tags: string[]
  /** 카드 상단 커버 그라디언트 */
  cover: { from: string; via: string; to: string }
  icon: "chart" | "bag" | "sparkles"
  highlights: string[]
  links: { demo?: string; repo?: string }
}

export const projects: Project[] = [
  {
    slug: "pulse-dashboard",
    title: "Pulse Analytics",
    summary: "실시간 지표를 한눈에 보여주는 SaaS 분석 대시보드",
    description:
      "수백만 건의 이벤트 데이터를 실시간으로 시각화하는 B2B 분석 대시보드입니다. 가상 스크롤과 웹 워커 기반 집계로 대용량 데이터에서도 60fps 인터랙션을 유지했습니다.",
    year: "2026",
    role: "Lead Frontend",
    tags: ["React", "TanStack Query", "D3", "Web Worker"],
    cover: { from: "#4f46e5", via: "#7c3aed", to: "#22d3ee" },
    icon: "chart",
    highlights: [
      "초기 로딩 시간 62% 단축 (LCP 3.4s → 1.3s)",
      "디자인 토큰 기반 차트 테마 시스템 구축",
      "실시간 WebSocket 스트림과 낙관적 업데이트 적용",
    ],
    links: { demo: "#", repo: "#" },
  },
  {
    slug: "maru-commerce",
    title: "Maru Commerce",
    summary: "라이프스타일 브랜드를 위한 헤드리스 커머스 스토어프론트",
    description:
      "브랜드 감성을 살린 인터랙션과 빠른 구매 경험을 동시에 잡은 헤드리스 커머스 프로젝트입니다. 이미지 최적화와 엣지 캐싱으로 전환율을 개선했습니다.",
    year: "2025",
    role: "Frontend Engineer",
    tags: ["Next.js", "Shopify", "Tailwind", "Motion"],
    cover: { from: "#f97316", via: "#ec4899", to: "#8b5cf6" },
    icon: "bag",
    highlights: [
      "구매 전환율 18% 상승",
      "접근성 감사(WCAG 2.2 AA) 통과",
      "스크롤 기반 제품 스토리텔링 인터랙션 구현",
    ],
    links: { demo: "#", repo: "#" },
  },
  {
    slug: "lumen-ai",
    title: "Lumen AI Studio",
    summary: "생성형 AI로 이미지를 편집하는 크리에이티브 툴",
    description:
      "프롬프트와 브러시를 함께 사용해 이미지를 편집하는 웹 기반 크리에이티브 툴입니다. 캔버스 렌더링을 WebGL로 옮겨 고해상도 편집에서도 부드러운 경험을 제공합니다.",
    year: "2025",
    role: "UI Engineer",
    tags: ["TypeScript", "WebGL", "Zustand", "Vite"],
    cover: { from: "#10b981", via: "#06b6d4", to: "#6366f1" },
    icon: "sparkles",
    highlights: [
      "WebGL 캔버스로 렌더링 성능 4배 향상",
      "Undo/Redo 히스토리 & 키보드 단축키 시스템",
      "Storybook 기반 컴포넌트 문서화",
    ],
    links: { demo: "#", repo: "#" },
  },
]

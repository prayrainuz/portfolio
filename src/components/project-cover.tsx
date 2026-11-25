import { BarChart3Icon, ShoppingBagIcon, SparklesIcon } from "lucide-react"

import type { Project } from "@/data/site"
import { cn } from "@/lib/utils"

const ICONS = {
  chart: BarChart3Icon,
  bag: ShoppingBagIcon,
  sparkles: SparklesIcon,
} as const

/** 이미지 없이도 보기 좋은 그라디언트 커버. 실제 스크린샷이 있다면 <img>로 교체하세요. */
export function ProjectCover({ project, className }: { project: Project; className?: string }) {
  const Icon = ICONS[project.icon]
  const { from, via, to } = project.cover

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${via} 55%, ${to})` }}
    >
      {/* 그리드 텍스처 */}
      <div
        className="absolute inset-0 -z-10 opacity-25 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/25 blur-2xl" />

      {/* 미니 UI 목업 */}
      <div className="absolute inset-x-6 bottom-0 h-[62%] rounded-t-xl border border-white/30 bg-white/15 p-3 shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/70" />
          <span className="size-2 rounded-full bg-white/50" />
          <span className="size-2 rounded-full bg-white/30" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-white/90 text-zinc-900">
            <Icon className="size-4" />
          </span>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-2/3 rounded-full bg-white/80" />
            <div className="h-2 w-1/3 rounded-full bg-white/45" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-md bg-white/30" />
          <div className="h-10 rounded-md bg-white/20" />
          <div className="h-10 rounded-md bg-white/25" />
        </div>
      </div>
    </div>
  )
}

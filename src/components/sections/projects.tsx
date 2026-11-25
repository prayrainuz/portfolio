import { Link } from "@tanstack/react-router"
import { ArrowUpRightIcon } from "lucide-react"

import { ProjectCover } from "@/components/project-cover"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { projects, type Project } from "@/data/site"
import { useIsDark } from "@/hooks/use-is-dark"

function ProjectCard({ project }: { project: Project }) {
  const isDark = useIsDark()

  return (
    // Magic UI: MagicCard - 마우스를 따라다니는 그라디언트 테두리
    <MagicCard
      className="group h-full rounded-2xl"
      gradientColor={isDark ? "#262626" : "#e4e4e7"}
      gradientOpacity={isDark ? 0.8 : 0.6}
      gradientFrom={project.cover.from}
      gradientTo={project.cover.to}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-[inherit]">
        <ProjectCover project={project} className="aspect-16/10 w-full" />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{project.role}</span>
            <span className="font-mono">{project.year}</span>
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight">
            {/* 카드 전체를 클릭 가능한 영역으로 확장 */}
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="after:absolute after:inset-0 after:z-10 after:rounded-[inherit] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="사용 기술">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-1 text-sm font-medium text-foreground">
            자세히 보기
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </article>
    </MagicCard>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="최근 작업한 프로젝트"
          description="문제를 정의하고, 설계하고, 직접 구현한 프로젝트들입니다. 카드를 눌러 자세한 내용을 확인해 보세요."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <BlurFade inView delay={0.1 + i * 0.1} className="h-full">
                <ProjectCard project={project} />
              </BlurFade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

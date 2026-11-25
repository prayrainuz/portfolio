import { useEffect } from "react"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { ArrowLeftIcon, ArrowUpRightIcon, CheckIcon, CodeXmlIcon } from "lucide-react"

import { ProjectCover } from "@/components/project-cover"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/site"

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const index = projects.findIndex((p) => p.slug === params.slug)
    if (index === -1) throw notFound()
    return { project: projects[index], next: projects[(index + 1) % projects.length] }
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { project, next } = Route.useLoaderData()

  useEffect(() => {
    const prev = document.title
    document.title = `${project.title} · ${prev.split(" · ").pop()}`
    return () => {
      document.title = prev
    }
  }, [project.title])

  return (
    <article className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6 sm:pt-32">
      <BlurFade>
        <Button asChild variant="ghost" size="sm" className="-ml-2 rounded-full text-muted-foreground">
          <Link to="/" hash="projects">
            <ArrowLeftIcon />
            모든 프로젝트
          </Link>
        </Button>
      </BlurFade>

      <BlurFade delay={0.05}>
        <header className="mt-6">
          <p className="font-mono text-sm text-muted-foreground">
            {project.year} · {project.role}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="사용 기술">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline">{tag}</Badge>
              </li>
            ))}
          </ul>
        </header>
      </BlurFade>

      <BlurFade delay={0.15}>
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border">
          <ProjectCover project={project} className="aspect-video w-full" />
          <BorderBeam size={200} duration={10} colorFrom={project.cover.from} colorTo={project.cover.to} />
        </div>
      </BlurFade>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <BlurFade inView>
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>
          </section>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <section>
            <h2 className="text-xl font-semibold">Highlights</h2>
            <ul className="mt-3 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        </BlurFade>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.links.demo && (
          <Button asChild className="rounded-full">
            <a href={project.links.demo} target="_blank" rel="noreferrer">
              Live Demo
              <ArrowUpRightIcon />
            </a>
          </Button>
        )}
        {project.links.repo && (
          <Button asChild variant="outline" className="rounded-full">
            <a href={project.links.repo} target="_blank" rel="noreferrer">
              <CodeXmlIcon />
              Source
            </a>
          </Button>
        )}
      </div>

      <nav aria-label="다음 프로젝트" className="mt-20 border-t border-border pt-8">
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center justify-between gap-4 rounded-2xl p-4 -m-4 transition-colors hover:bg-accent/50"
        >
          <span>
            <span className="block text-xs text-muted-foreground uppercase tracking-widest">Next project</span>
            <span className="mt-1 block text-2xl font-semibold tracking-tight">{next.title}</span>
          </span>
          <ArrowUpRightIcon className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </nav>
    </article>
  )
}

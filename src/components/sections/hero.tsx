import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowDownIcon, MailIcon, MapPinIcon } from "lucide-react"

import heroImage from "@/assets/hero.svg"
import Aurora from "@/components/Aurora"
import ShinyText from "@/components/ShinyText"
import SplitText from "@/components/SplitText"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { site } from "@/data/site"
import { useIsDark } from "@/hooks/use-is-dark"

export function Hero() {
  const isDark = useIsDark()
  const navigate = useNavigate()

  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      {/* React Bits: Aurora 배경 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] opacity-80">
        <Aurora
          colorStops={["#4f46e5", "#a855f7", "#22d3ee"]}
          amplitude={1.1}
          blend={0.55}
          speed={0.6}
          lightMode={!isDark}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <BlurFade delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-sm backdrop-blur">
              {site.available && (
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
              )}
              <ShinyText
                text={site.available ? "새로운 프로젝트 제안을 받고 있어요" : site.role}
                color={isDark ? "#a1a1aa" : "#52525b"}
                shineColor={isDark ? "#ffffff" : "#18181b"}
                speed={3}
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p className="mt-6 font-mono text-sm tracking-widest text-muted-foreground uppercase">
              {site.role}
            </p>
          </BlurFade>

          {/* React Bits: SplitText 헤드라인 */}
          <SplitText
            tag="h1"
            text={site.headline}
            splitType="words"
            effect="blur"
            trigger="load"
            delay={60}
            duration={0.9}
            className="mt-4 text-4xl leading-[1.15] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            textAlign="inherit"
          />

          <BlurFade delay={0.35}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.intro}
            </p>
          </BlurFade>

          <BlurFade delay={0.45}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              {/* Magic UI: ShimmerButton */}
              <ShimmerButton
                type="button"
                onClick={() => navigate({ to: "/", hash: "projects" })}
                className="h-11 px-6 text-sm font-medium"
                background="linear-gradient(135deg, #4f46e5, #7c3aed)"
                shimmerColor="#e0e7ff"
              >
                프로젝트 둘러보기
                <ArrowDownIcon className="ml-2 size-4" />
              </ShimmerButton>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-6 backdrop-blur">
                <Link to="/" hash="contact">
                  <MailIcon />
                  연락하기
                </Link>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.55}>
            <dl className="mt-10 grid grid-cols-3 gap-6 sm:gap-10">
              {site.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <dd className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {/* Magic UI: NumberTicker */}
                    <NumberTicker value={stat.value} className="text-foreground" />
                    {stat.suffix}
                  </dd>
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </BlurFade>
        </div>

        {/* 히어로 이미지 */}
        <BlurFade delay={0.3} direction="left" className="mx-auto w-full max-w-md lg:max-w-none">
          <figure className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-tr from-indigo-500/30 via-violet-500/20 to-cyan-400/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-2xl shadow-indigo-950/30">
              <img
                src={heroImage}
                alt="코드 에디터, 차트, 프로필 카드가 떠 있는 추상적인 작업 공간 일러스트"
                width={640}
                height={640}
                className="aspect-square w-full object-cover"
                fetchPriority="high"
              />
              {/* Magic UI: BorderBeam */}
              <BorderBeam size={180} duration={8} colorFrom="#a855f7" colorTo="#22d3ee" borderWidth={2} />
            </div>
            <figcaption className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm whitespace-nowrap text-muted-foreground shadow-lg backdrop-blur">
              <MapPinIcon className="size-4 text-violet-500" />
              Based in {site.location}
            </figcaption>
          </figure>
        </BlurFade>
      </div>

      {/* Magic UI: Marquee - 기술 스택 */}
      <BlurFade delay={0.6} inView>
        <div className="relative mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <p className="mb-4 text-center text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Tools &amp; Technologies
          </p>
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:0.75rem]">
              {site.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background sm:w-24" />
          </div>
        </div>
      </BlurFade>
    </section>
  )
}

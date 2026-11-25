import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <BlurFade inView className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="font-mono text-xs font-medium tracking-[0.25em] text-violet-500 uppercase dark:text-violet-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </BlurFade>
  )
}

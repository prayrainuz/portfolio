import { Logo } from "@/components/site-header"
import { Separator } from "@/components/ui/separator"
import { site } from "@/data/site"

const YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <Logo />
        <nav aria-label="소셜 링크" className="flex items-center gap-1 text-sm">
          {site.socials.map((s, i) => (
            <span key={s.label} className="flex items-center gap-1">
              {i > 0 && <Separator orientation="vertical" className="mx-2 h-4" />}
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            </span>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          © {YEAR} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

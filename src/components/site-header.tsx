import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { MenuIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

import GradientText from "@/components/GradientText"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Home", hash: "home" },
  { label: "Projects", hash: "projects" },
  { label: "Contact", hash: "contact" },
] as const

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      hash="home"
      className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}
      aria-label={`${site.name} 홈으로`}
    >
      <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/30">
        {site.name.charAt(0).toUpperCase()}
      </span>
      <GradientText
        colors={["#818cf8", "#c084fc", "#22d3ee", "#818cf8"]}
        animationSpeed={6}
        className="text-lg font-bold"
      >
        {site.name}.dev
      </GradientText>
    </Link>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler
            theme={resolvedTheme === "light" ? "light" : "dark"}
            onThemeChange={setTheme}
            aria-label="테마 전환"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&_svg]:size-4"
          />

          <Button asChild size="sm" className="hidden rounded-full md:inline-flex">
            <Link to="/" hash="contact">
              Let&apos;s talk
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="메뉴 열기">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle asChild>
                  <div>
                    <Logo />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="모바일 메뉴" className="flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.hash}>
                    <Link
                      to="/"
                      hash={item.hash}
                      className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

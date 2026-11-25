import { Link, Outlet, createRootRoute } from "@tanstack/react-router"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster position="bottom-center" richColors />
    </ThemeProvider>
  )
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center px-4 pt-16 text-center">
      <p className="font-mono text-sm text-violet-500">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">페이지를 찾을 수 없어요</h1>
      <p className="mt-3 text-muted-foreground">주소가 바뀌었거나 삭제된 페이지일 수 있어요.</p>
      <Button asChild className="mt-8 rounded-full">
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </section>
  )
}

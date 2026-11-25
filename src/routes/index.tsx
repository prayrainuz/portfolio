import { createFileRoute } from "@tanstack/react-router"

import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Contact />
    </>
  )
}

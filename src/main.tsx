import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"
import "./index.css"

const router = createRouter({
  routeTree,
  // GitHub Pages 프로젝트 사이트(/repo-name/)에서도 동작하도록 Vite base를 그대로 사용
  basepath: import.meta.env.BASE_URL,
  scrollRestoration: true,
  defaultPreload: "intent",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

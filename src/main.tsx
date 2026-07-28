import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { HomeworkReview } from "@/components/homework-review"
import { ParentHome } from "@/components/parent-home"
import { cn } from "@/lib/utils"
import "./index.css"

function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash)
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const reviewOpen = route === "#homework-review"

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#f7f9fc]">
      <div
        className={cn(
          "home-pane min-h-dvh transition-[width] duration-300 ease-out",
          reviewOpen ? "w-full md:w-[40%]" : "w-full"
        )}
      >
        <ParentHome splitView={reviewOpen} />
      </div>

      <div
        aria-hidden={!reviewOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full translate-x-full border-l border-[#ccd2ea] bg-white shadow-[-18px_0_36px_rgba(34,52,86,0.08)] transition-transform duration-300 ease-out md:w-[60%]",
          reviewOpen && "translate-x-0"
        )}
      >
        <HomeworkReview embedded />
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

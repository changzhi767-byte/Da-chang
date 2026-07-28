import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { HomeworkReview } from "@/components/homework-review"
import { ParentHome } from "@/components/parent-home"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
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

  if (!reviewOpen) {
    return (
      <div className="home-pane min-h-dvh bg-[#f7f9fc]">
        <ParentHome />
      </div>
    )
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#f7f9fc]">
      <div className="hidden h-dvh md:block">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            id="home"
            defaultSize="40%"
            minSize="320px"
            maxSize="65%"
          >
            <div className="home-pane h-full bg-[#f7f9fc]">
              <ParentHome splitView />
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="z-50 w-2 cursor-col-resize bg-[#ccd2ea]/70 after:w-4 hover:bg-primary/15 focus-visible:ring-2 [&>div]:h-12 [&>div]:w-2 [&>div]:rounded-full [&>div]:border-[#9eabd0] [&>div]:bg-[#f5f7fc] [&>div]:text-[#77809a]"
          />

          <ResizablePanel id="review" defaultSize="60%" minSize="420px">
            <div className="h-full animate-in slide-in-from-right-8 duration-300">
              <HomeworkReview embedded />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="md:hidden">
        <div className="home-pane min-h-dvh">
          <ParentHome splitView />
        </div>
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-40 w-full translate-x-full border-l border-[#ccd2ea] bg-white shadow-[-18px_0_36px_rgba(34,52,86,0.08)] transition-transform duration-300 ease-out",
            reviewOpen && "translate-x-0"
          )}
        >
          <HomeworkReview embedded />
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

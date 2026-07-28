import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import avatar from "@/assets/parent-home/avatar.png"
import { HomeworkReview } from "@/components/homework-review"
import { ParentHome } from "@/components/parent-home"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import "./index.css"

function HomeWelcome() {
  return (
    <div className="flex h-full items-center justify-center bg-white px-8">
      <div className="flex -translate-y-8 flex-col items-center text-center">
        <img
          src={avatar}
          alt=""
          className="size-28 rounded-full object-cover ring-1 ring-[#ff9f66]"
        />
        <h1 className="mt-8 text-2xl font-semibold text-[#1c1f2e]">
          下午好，张老师
        </h1>
        <p className="mt-3 text-sm text-[#535b73]">
          今天有 5 份作业待审核，还有 1 份试卷待审核
        </p>
        <p className="mt-8 text-sm text-[#939bb5]">
          从左侧任意功能卡片开始今日工作
        </p>
      </div>
    </div>
  )
}

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
      <div className="hidden h-dvh md:block">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            id="home"
            defaultSize="40%"
            minSize="375px"
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

          <ResizablePanel id="detail" defaultSize="60%" minSize="420px">
            {reviewOpen ? (
              <div className="h-full animate-in slide-in-from-right-8 duration-300">
                <HomeworkReview embedded />
              </div>
            ) : (
              <HomeWelcome />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="md:hidden">
        <div className="home-pane min-h-dvh">
          <ParentHome />
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

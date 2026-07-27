import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { HomeworkReview } from "@/components/homework-review"
import { ParentHome } from "@/components/parent-home"
import "./index.css"

function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash)
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return route === "#homework-review" ? <HomeworkReview /> : <ParentHome />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

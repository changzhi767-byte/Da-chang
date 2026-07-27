import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type LearningTaskCardProps = {
  subject: string
  title: string
  description: string
  progress: number
  buttonLabel?: string
  className?: string
  onContinue?: () => void
}

export function LearningTaskCard({
  subject,
  title,
  description,
  progress,
  buttonLabel = "继续学习",
  className,
  onContinue,
}: LearningTaskCardProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress))

  return (
    <Card
      className={cn(
        "w-full max-w-md gap-0 overflow-hidden rounded-3xl border-border bg-background py-0 text-foreground shadow-sm",
        className,
      )}
    >
      <CardHeader className="gap-4 border-b border-border px-6 py-6 sm:px-8">
        <Badge className="border-primary bg-primary text-primary-foreground">
          {subject}
        </Badge>
        <div className="space-y-2">
          <CardTitle className="text-2xl tracking-tight sm:text-3xl">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-foreground/60">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">完成度</span>
          <span className="font-semibold text-primary">
            {normalizedProgress}%
          </span>
        </div>
        <Progress
          value={normalizedProgress}
          aria-label={`${title}完成度 ${normalizedProgress}%`}
          className="h-2.5 bg-muted"
        />
      </CardContent>

      <CardFooter className="border-t border-border bg-secondary px-6 py-6 sm:px-8">
        <Button
          type="button"
          size="lg"
          className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-primary focus-visible:ring-primary/30"
          onClick={onContinue}
        >
          {buttonLabel}
          <ArrowRight aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  )
}

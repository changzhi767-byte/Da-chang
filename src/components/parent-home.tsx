import {
  ArrowRightCircle,
  Download,
  Printer,
} from "lucide-react"

import avatar from "@/assets/parent-home/avatar.png"
import diagnosis from "@/assets/parent-home/diagnosis.png"
import exam from "@/assets/parent-home/exam.png"
import featureCardShape from "@/assets/parent-home/feature-card-shape.svg"
import homework from "@/assets/parent-home/homework.png"
import navHome from "@/assets/parent-home/nav-home.svg"
import navStore from "@/assets/parent-home/nav-store.svg"
import navStudents from "@/assets/parent-home/nav-students.svg"
import todoExam from "@/assets/parent-home/todo-exam.png"
import todoHomework from "@/assets/parent-home/todo-homework.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Feature = {
  title: string
  description: string
  accent: string
  href?: string
  illustration?: string
  illustrationClassName?: string
  illustrationCropClassName?: string
  illustrationImageClassName?: string
}

const primaryFeatures: Feature[] = [
  {
    title: "作业批改",
    description: "拍照/AI批改/推送家长",
    accent: "#ff88ce",
    href: "#homework-review",
    illustration: homework,
    illustrationClassName: "-top-1.5 right-0 h-[62px] w-[67px]",
    illustrationCropClassName: "size-full -scale-x-100",
    illustrationImageClassName:
      "absolute left-[-63.49%] top-[-31.41%] h-[171.18%] w-[223.93%] max-w-none",
  },
  {
    title: "试卷分析",
    description: "题卡分离/推题审核/报告",
    accent: "#35dd57",
    illustration: exam,
    illustrationClassName: "-top-[18px] right-0 h-[76px] w-[82px]",
    illustrationCropClassName: "h-[69px] w-[76px] rotate-6",
    illustrationImageClassName:
      "absolute left-[-3.95%] top-[-5.48%] h-[116.44%] w-[111.84%] max-w-none",
  },
  {
    title: "学习力诊断",
    description: "好专业测评/在线报告",
    accent: "#e6d011",
    illustration: diagnosis,
    illustrationClassName: "-top-1 right-1 size-[65px]",
    illustrationCropClassName: "size-full -scale-x-100",
    illustrationImageClassName:
      "absolute left-[-22.4%] top-[-24.03%] h-[151.17%] w-[145.65%] max-w-none",
  },
]

const secondaryFeatures: Feature[] = [
  {
    title: "学生错题本",
    description: "学科错题/知识点/举一反三",
    accent: "#0bc5e2",
  },
  {
    title: "语文作文批改",
    description: "作文上传/AI批改/批改报告",
    accent: "#635bff",
  },
]

function FeatureCard({
  feature,
  compact = false,
}: {
  feature: Feature
  compact?: boolean
}) {
  return (
    <Card
      role={feature.href ? "link" : undefined}
      tabIndex={feature.href ? 0 : undefined}
      onClick={() => {
        if (feature.href) window.location.hash = feature.href
      }}
      onKeyDown={(event) => {
        if (feature.href && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault()
          window.location.hash = feature.href
        }
      }}
      className={cn(
        "group relative min-w-0 cursor-pointer border-0 py-0 transition-transform hover:-translate-y-0.5",
        compact
          ? "h-[74px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05),inset_0_0_2px_rgba(255,255,255,0.9)]"
          : "h-[76px] overflow-visible bg-transparent shadow-none"
      )}
    >
      {!compact && (
        <img
          aria-hidden
          alt=""
          src={featureCardShape}
          className="pointer-events-none absolute -bottom-[36%] -left-[10%] -right-[10%] -top-[26%] h-[162%] w-[120%] max-w-none"
        />
      )}
      <CardContent
        className={cn(
          "relative z-10 flex h-full px-4",
          compact
            ? "items-center justify-between gap-3"
            : "flex-col justify-center gap-2"
        )}
      >
        <div className="flex min-w-0 items-center gap-1">
          <span
            aria-hidden
            className="h-[15px] w-1 shrink-0 rounded-full"
            style={{ backgroundColor: feature.accent }}
          />
          <span className="truncate text-base font-semibold leading-[22px]">
            {feature.title}
          </span>
          <ArrowRightCircle className="size-3.5 shrink-0 fill-foreground text-white" />
        </div>
        <p className="truncate text-[11px] leading-[1.4] text-foreground">
          {feature.description}
        </p>
      </CardContent>
      {feature.illustration && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-0 flex items-center justify-center",
            feature.illustrationClassName
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden",
              feature.illustrationCropClassName ?? "size-full"
            )}
          >
            <img
              alt=""
              src={feature.illustration}
              className={cn(
                "object-contain",
                feature.illustrationImageClassName ?? "size-full"
              )}
            />
          </div>
        </div>
      )}
    </Card>
  )
}

function TodoRow({
  icon,
  label,
  count,
}: {
  icon: string
  label: string
  count: number
}) {
  return (
    <div className="flex min-h-[60px] items-center gap-2 rounded-md bg-gradient-to-r from-black/[0.035] to-transparent px-4 py-3">
      <img alt="" src={icon} className="size-7 shrink-0 object-contain" />
      <div className="flex min-w-0 flex-1 items-center text-[15px] font-medium leading-[1.4]">
        <span className="truncate">{label}</span>
        <Badge
          variant="ghost"
          className="h-auto px-1 text-[12px] font-normal text-[#f53f3f]"
        >
          *{count}
        </Badge>
      </div>
      <Button className="h-7 rounded-full px-4 text-xs font-normal">
        去审核
      </Button>
    </div>
  )
}

function BottomNavigation() {
  const items = [
    { label: "首页", icon: navHome, active: true },
    { label: "到店", icon: navStore },
    { label: "学员", icon: navStudents },
  ]

  return (
    <nav
      aria-label="主导航"
      className="fixed bottom-8 left-1/2 z-30 flex h-[54px] w-[343px] -translate-x-1/2 items-center rounded-[28px] border border-[#b2b6c6]/35 bg-white/80 p-[3px] shadow-[15px_3px_22px_rgba(24,111,242,0.05),inset_0_0_3px_rgba(255,255,255,0.75)] backdrop-blur-md"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={cn(
            "flex h-12 flex-1 flex-col items-center justify-center rounded-[28px] text-[9px] leading-[14px]",
            item.active
              ? "bg-primary font-medium text-primary-foreground"
              : "text-foreground"
          )}
        >
          <img
            alt=""
            src={item.icon}
            className="size-6 shrink-0 object-contain"
          />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export function ParentHome() {
  return (
    <main className="min-h-[1024px] overflow-x-hidden bg-[#f7f9fc] px-4 pb-32 pt-8 text-[#1c1f2e]">
      <div className="mx-auto flex w-full max-w-[736px] flex-col gap-4">
        <header className="flex items-center gap-4 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <img
              alt="张老师头像"
              src={avatar}
              className="size-14 shrink-0 rounded-full border-2 border-white/25 object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-xs leading-[1.4]">下午好，张老师🎉</p>
              <h1 className="truncate text-xl font-bold leading-[22px]">
                太和区阳门店
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 gap-4">
            <Button
              variant="outline"
              className="h-8 rounded-full border-primary px-4 font-normal text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Download className="size-[15px]" />
              下载中心
            </Button>
            <Button className="h-8 rounded-full px-4 font-normal">
              <Printer className="size-[15px]" />
              打印管理
            </Button>
          </div>
        </header>

        <section aria-label="常用功能" className="flex flex-col gap-3 pt-4">
          <div className="grid grid-cols-3 gap-4">
            {primaryFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {secondaryFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} compact />
            ))}
          </div>
        </section>

        <Card className="gap-2 rounded-[10px] border-0 bg-white px-4 pb-4 pt-2 shadow-[0_9.6px_11.5px_rgba(34,52,86,0.08)]">
          <CardHeader className="px-0 pt-1">
            <CardTitle className="text-base font-semibold leading-[22px]">
              待办事项
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 px-0">
            <TodoRow icon={todoHomework} label="待审核作业" count={5} />
            <TodoRow icon={todoExam} label="待审核试卷" count={1} />
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </main>
  )
}

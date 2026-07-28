import { ArrowLeft, LoaderCircle, Plus, Search } from "lucide-react"

import activeAvatar from "@/assets/homework-review/avatar-active.png"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type ReviewItem = {
  name: string
  status: "start" | "continue" | "processing"
}

const reviewItems: ReviewItem[] = [
  { name: "孙丹", status: "start" },
  { name: "冯国安", status: "start" },
  { name: "孙东辉", status: "continue" },
  { name: "钱泽西", status: "start" },
  { name: "周铮", status: "processing" },
  { name: "吴彬", status: "processing" },
  { name: "钱均泽", status: "processing" },
  { name: "何能", status: "processing" },
]

function ProcessingStatus() {
  return (
    <div className="relative flex h-6 w-[118px] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#ccd2ea] text-xs text-[#5e637a]">
      <Progress
        value={50}
        className="absolute inset-0 h-full rounded-none bg-transparent [&_[data-slot=progress-indicator]]:bg-black/10"
      />
      <LoaderCircle className="relative z-10 size-[13px]" />
      <span className="relative z-10">处理中(50%)</span>
    </div>
  )
}

function ReviewRow({ item }: { item: ReviewItem }) {
  const processing = item.status === "processing"

  return (
    <div className="flex h-[54px] items-center gap-2 border-b border-[#ccd2ea] pb-2">
      <Avatar
        size="lg"
        className={cn(
          "bg-[#e0b8ff]",
          processing && "bg-[#8d8d8d] opacity-40"
        )}
      >
        <AvatarImage
          src={activeAvatar}
          alt={`${item.name}头像`}
          className={cn(processing && "grayscale")}
        />
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1 pl-1">
        <span className="truncate text-[15px] font-medium leading-[1.4]">
          {item.name}
        </span>
        <div className="flex gap-2 text-[11px] leading-[1.4] text-[#464b60]">
          <span>2页</span>
          <span>物理</span>
          <span>59分钟前</span>
        </div>
      </div>
      {processing ? (
        <ProcessingStatus />
      ) : (
        <Button className="h-6 rounded-full px-3 text-xs font-normal">
          {item.status === "continue" ? "继续审核" : "开始审核"}
        </Button>
      )}
    </div>
  )
}

export function HomeworkReview({ embedded = false }: { embedded?: boolean }) {
  return (
    <main
      className={cn(
        "min-h-[1025px] bg-white px-4 pb-28 pt-8 text-[#1c1f2e]",
        embedded && "relative h-dvh min-h-0 overflow-y-auto"
      )}
    >
      <div className="mx-auto flex w-full max-w-[736px] flex-col gap-4">
        <header className="relative flex h-9 items-center">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="返回"
            className="size-[22px] rounded-full"
            onClick={() => {
              window.history.pushState(null, "", window.location.pathname)
              window.dispatchEvent(new Event("hashchange"))
            }}
          >
            <ArrowLeft className="size-[18px]" />
          </Button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium leading-[1.4]">
            作业批改
          </h1>
          <Button
            variant="ghost"
            size="icon"
            aria-label="搜索"
            className="ml-auto size-9 rounded-full"
          >
            <Search className="size-[22px]" />
          </Button>
        </header>

        <section className="flex flex-col gap-4">
          <div className="flex h-[42px] items-center gap-2">
            <Tabs defaultValue="review" className="min-w-0 flex-1">
              <TabsList variant="line" className="h-[42px] gap-4 p-0">
                <TabsTrigger
                  value="review"
                  className="h-[42px] flex-none rounded-none px-0 py-2.5 text-base font-normal data-[state=active]:font-medium data-[state=active]:text-primary after:bottom-0 after:bg-primary"
                >
                  批改审核
                </TabsTrigger>
                <TabsTrigger
                  value="download"
                  className="h-[42px] flex-none rounded-none px-0 py-2.5 text-base font-normal after:bottom-0 after:bg-primary"
                >
                  待下载
                </TabsTrigger>
                <TabsTrigger
                  value="done"
                  className="h-[42px] flex-none rounded-none px-0 py-2.5 text-base font-normal after:bottom-0 after:bg-primary"
                >
                  已完成
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <label className="flex shrink-0 cursor-pointer items-center gap-0.5 text-[13px] text-black">
              <Switch size="sm" defaultChecked aria-label="仅看当天" />
              <span>仅看当天</span>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            {reviewItems.map((item) => (
              <ReviewRow key={item.name} item={item} />
            ))}
          </div>
        </section>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-20 bg-gradient-to-b from-white/0 via-white to-white px-4 pb-[34px] pt-4",
          embedded && "absolute"
        )}
      >
        <Button className="mx-auto flex h-11 w-full max-w-[640px] rounded-full text-[15px] font-normal">
          <Plus className="size-[17px]" />
          新增作业
        </Button>
      </div>
    </main>
  )
}

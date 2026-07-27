import { useState, type FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border/70 shadow-xl shadow-primary/5">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-2 flex size-11 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm">
            U
          </div>
          <CardTitle className="text-2xl">欢迎回来</CardTitle>
          <CardDescription>
            输入你的账号信息以继续访问工作台
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">邮箱</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">密码</FieldLabel>
                  <a
                    href="#forgot-password"
                    className="ml-auto text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    忘记密码？
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  登录
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  使用 Google 登录
                </Button>
                <FieldDescription className="text-center">
                  还没有账号？ <a href="#sign-up">立即注册</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

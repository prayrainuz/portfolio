import { useState, type FormEvent } from "react"
import { ArrowUpRightIcon, Loader2Icon, MailIcon, MapPinIcon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { SectionHeading } from "@/components/section-heading"
import SpotlightCard from "@/components/SpotlightCard"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/data/site"
import { useIsDark } from "@/hooks/use-is-dark"
import { cn } from "@/lib/utils"

/**
 * GitHub Pages는 서버가 없으므로 폼 전송은 외부 서비스를 사용합니다.
 * Formspree / Web3Forms 등 JSON POST를 받는 엔드포인트를 .env 에 지정하세요.
 *   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
 * 값이 없으면 메일 앱(mailto:)을 열어 내용을 채워줍니다.
 */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: "", email: "", message: "" }

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = "이름을 입력해 주세요."
  if (!values.email.trim()) errors.email = "이메일을 입력해 주세요."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "올바른 이메일 형식이 아니에요."
  if (values.message.trim().length < 10) errors.message = "메시지를 10자 이상 입력해 주세요."
  return errors
}

function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof Fields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    if (!CONTACT_ENDPOINT) {
      const subject = encodeURIComponent(`[Portfolio] ${values.name}님의 문의`)
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      toast.info("메일 앱을 열었어요", { description: "메일 앱에서 전송 버튼을 눌러 주세요." })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      toast.success("메시지를 보냈어요!", { description: "확인 후 빠르게 답장 드릴게요." })
      setValues(EMPTY)
    } catch {
      toast.error("전송에 실패했어요", { description: `잠시 후 다시 시도하거나 ${site.email}로 메일을 보내 주세요.` })
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = "h-11 bg-background/60"

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">이름</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="홍길동"
            value={values.name}
            onChange={(e) => update("name")(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">이메일</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => update("email")(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-message">메시지</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="프로젝트에 대해 자유롭게 알려 주세요. 일정, 예산, 참고 자료 등이 있으면 더 좋아요."
          value={values.message}
          onChange={(e) => update("message")(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="min-h-36 resize-y bg-background/60"
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="h-11 w-full rounded-full sm:w-auto sm:justify-self-end sm:px-8">
        {submitting ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
        {submitting ? "보내는 중…" : "메시지 보내기"}
      </Button>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} role={message ? "alert" : undefined} className={cn("text-sm text-destructive", !message && "sr-only")}>
      {message}
    </p>
  )
}

export function Contact() {
  const isDark = useIsDark()

  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Magic UI: DotPattern 배경 */}
      <DotPattern
        width={22}
        height={22}
        className="-z-10 text-neutral-400/40 mask-[radial-gradient(500px_circle_at_center,white,transparent)] dark:text-neutral-500/30"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="함께 만들어 볼까요?"
          description="새로운 프로젝트, 협업 제안, 가벼운 커피챗 모두 환영해요. 보통 하루 안에 답장 드립니다."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* React Bits: SpotlightCard */}
          <BlurFade inView delay={0.1} className="h-full">
            <SpotlightCard
              theme={isDark ? "dark" : "light"}
              spotlightColor="rgba(139, 92, 246, 0.35)"
              className="flex h-full flex-col justify-between gap-10 rounded-2xl p-6 sm:p-8"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Get in touch</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  폼을 작성하거나 아래 채널로 직접 연락 주세요.
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-center gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-accent/60"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                        <MailIcon className="size-4" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted-foreground">Email</span>
                        <span className="font-medium">{site.email}</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                      <MapPinIcon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Location</span>
                      <span className="font-medium">{site.location}</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <Button key={s.label} asChild variant="outline" size="sm" className="rounded-full bg-transparent">
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                      <ArrowUpRightIcon />
                    </a>
                  </Button>
                ))}
              </div>
            </SpotlightCard>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="rounded-2xl border-border/70 bg-card/70 py-0 backdrop-blur">
              <CardContent className="p-6 sm:p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

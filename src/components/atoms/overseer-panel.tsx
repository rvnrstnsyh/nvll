/* eslint-disable */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ── Response pool ──────────────────────────────────────────────────────────── */
const AI_POOL = [
  'Hello! How can I help you today?',
  'This product is very popular!',
  'Let me check if we have it in stock~',
  "Thank you for your inquiry, I'm happy to assist!",
  'Let me think about this...',
  'We offer multiple payment methods for your convenience!',
  "If you need more information, I'm always here!",
  'Got it, I understand your needs!',
  "I found the following related answers. If this isn't what you were asking, please rephrase.",
  'Our customer service team will assist you as soon as possible!'
]
const getRandResponses = () => [...AI_POOL].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1)

/* ── URL linkifier ──────────────────────────────────────────────────────────── */
function linkify(text: string): string {
  const saved: string[] = []
  let i = 0
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, lt, url) => {
    saved[i] = `<a href="${url}" target="_blank" rel="noopener noreferrer">${lt}</a>`
    return `@@${i++}@@`
  })
  text = text.replace(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
  saved.forEach((l, n) => {
    text = text.replace(`@@${n}@@`, l)
  })
  return text
}

/* ── Types ──────────────────────────────────────────────────────────────────── */
interface Msg {
  text: string
  type: 'user' | 'ai'
  id: number
  timestamp: number
}

/* ── Static icons (extracted to avoid JSX recreation each render) ───────────── */
const IcHome = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)
const IcChat = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
)
const IcOrders = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
  </svg>
)
const IcPromo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M12.79 2.04 2.04 12.79a1.5 1.5 0 0 0 0 2.12l7.05 7.05a1.5 1.5 0 0 0 2.12 0L21.96 11.2a1.5 1.5 0 0 0 .44-1.06V3.5A1.5 1.5 0 0 0 20.9 2h-6.64c-.4 0-.78.16-1.07.44zM17.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
)
const IcFaq = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
)
const IcSettings = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4a.484.484 0 0 0-.48.41l-.36 2.54a7.02 7.02 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.04.7 1.62.94l.36 2.54c.05.24.27.41.48.41h4c.24 0 .44-.17.47-.41l.36-2.54a7.02 7.02 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 0 1 8.4 12 3.6 3.6 0 0 1 12 8.4 3.6 3.6 0 0 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" />
  </svg>
)
const IcClose = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white block" aria-hidden="true">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)
const IcBurger = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white block" aria-hidden="true">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)
const IcExpand = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white block" aria-hidden="true">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
)
const IcCollapse = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white block" aria-hidden="true">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
)
const IcSend = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 16 16" className={`w-3.5 h-3.5 block ${on ? 'fill-white dark:fill-[#111]' : 'fill-white dark:fill-[#555]'}`} aria-hidden="true">
    <path d="M7.4 1.899a.85.85 0 0 1 1.201 0l4.5 4.5A.85.85 0 1 1 11.9 7.6L8.85 4.552V13.5a.85.85 0 0 1-1.7 0V4.552L4.101 7.601A.85.85 0 1 1 2.9 6.399z" />
  </svg>
)

/* ── Static sidebar data ────────────────────────────────────────────────────── */
const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', Icon: IcHome },
  { id: 'chat', label: 'Live Chat', Icon: IcChat },
  { id: 'orders', label: 'My Orders', Icon: IcOrders },
  { id: 'promo', label: 'Promotions', Icon: IcPromo },
  { id: 'faq', label: 'FAQ', Icon: IcFaq }
] as const

/* ── Time formatter (explicit locale → no SSR/client mismatch) ──────────────── */
const fmtTime = (ts: number) => new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

/* ── Reusable class builders ────────────────────────────────────────────────── */
const BUBBLE_BASE = 'max-w-full px-[11px] py-1.75 mx-[2.5px] break-words leading-[1.5] text-[13px] shadow-[0_1px_3px_rgba(0,0,0,.07)] dark:shadow-[0_1px_3px_rgba(0,0,0,.2)]'
const SENDER_CLS = 'text-[9px] font-bold tracking-[0.05em] uppercase leading-none px-0.5'
const TIME_CLS = 'text-[9px] leading-none px-0.5 text-[#bbb] dark:text-[#555]'
const AVATAR_CLS =
  'overseer-panel-avatar shrink-0 w-[26px] min-w-[26px] h-[30px] bg-transparent bg-center bg-bottom bg-contain bg-no-repeat self-center rounded-[12px] grayscale dark:invert dark:brightness-[0.85]'
const DIVIDER_H = 'h-0.5 w-8 rounded-sm shrink-0 my-1 bg-[#2e2e2e] dark:bg-[#2a2a2a]'
const DIVIDER_MOB = 'h-px mx-3 my-1.5 bg-[#2e2e2e] dark:bg-[#2a2a2a]'

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function OverseerPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [botHidden, setBotHidden] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [inputVal, setInputVal] = useState('')
  const [typing, setTyping] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [lastType, setLastType] = useState<'user' | 'ai' | null>(null)
  const [greetVisible, setGreetVisible] = useState(false)
  const [activeSb, setActiveSb] = useState('home')
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [sbAnimated, setSbAnimated] = useState(false)
  const [mobileSbOpen, setMobileSbOpen] = useState(false)

  /* refs — never read during render */
  const isMobile = useRef(false)
  const winRef = useRef<HTMLDivElement>(null)
  const msgsRef = useRef<HTMLDivElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const composing = useRef(false)
  const msgId = useRef(0)
  const isFirst = useRef(true)

  /* parallax SVG refs */
  const hairRef = useRef<SVGSVGElement>(null)
  const headRef = useRef<SVGSVGElement>(null)
  const faceRef = useRef<SVGSVGElement>(null)
  const exprRef = useRef<SVGSVGElement>(null)
  const eyeLRef = useRef<SVGPathElement>(null)
  const eyeRRef = useRef<SVGPathElement>(null)

  /* animation control refs */
  const tickRef = useRef<() => void>(null!)
  const scheduleBlinkRef = useRef<() => void>(null!)
  const mxRef = useRef(0),
    myRef = useRef(0)
  const rectRef = useRef<DOMRect | null>(null)
  const maxDRef = useRef(1)
  const rafRef = useRef(0)
  const blinkRef = useRef<ReturnType<typeof setTimeout>>(null)

  /* ── Init ── */
  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android|Windows Phone|webOS/i.test(navigator.userAgent)
    isMobile.current = mobile
    const t = setTimeout(() => {
      setIsMobileDevice(mobile)
      setIsMounted(true)
    }, 2150)
    return () => clearTimeout(t)
  }, [])

  /* ── Parallax ── */
  const LAYERS = useCallback(
    () => [
      { ref: hairRef, ox: 0, oy: -18, max: 4, rev: true },
      { ref: headRef, ox: 0, oy: 4, max: 4, rev: false },
      { ref: faceRef, ox: 0, oy: 7, max: 8, rev: false },
      { ref: exprRef, ox: 0, oy: 7, max: 12, rev: false }
    ],
    []
  )

  const tick = useCallback(() => {
    const rect = rectRef.current,
      maxD = maxDRef.current
    if (rect && maxD) {
      const cx = rect.left + rect.width / 2,
        cy = rect.top + rect.height / 2
      const dx = mxRef.current - cx,
        dy = myRef.current - cy
      const d = Math.hypot(dx, dy)
      if (d > 0) {
        const inf = Math.min(d / maxD, 1),
          nx = dx / d,
          ny = dy / d
        LAYERS().forEach(({ ref, ox, oy, max, rev }) => {
          if (!ref.current) return
          const f = rev ? -1 : 1
          ref.current.style.translate = `calc(-50% + ${ox + nx * max * inf * f}px) calc(-50% + ${oy + ny * max * inf * f}px)`
        })
      }
    }
    rafRef.current = requestAnimationFrame(tickRef.current)
  }, [LAYERS])

  useEffect(() => {
    tickRef.current = tick
  }, [tick])

  /* ── Blink ── */
  const doBlink = useCallback(() => {
    const le = eyeLRef.current,
      re = eyeRRef.current
    if (!le || !re) return
    const lb = le.getBBox(),
      rb = re.getBBox()
    le.style.transformOrigin = `${lb.x + lb.width / 2}px ${lb.y + lb.height / 2}px`
    re.style.transformOrigin = `${rb.x + rb.width / 2}px ${rb.y + rb.height / 2}px`
    ;[le, re].forEach((el) => {
      el.style.transition = 'transform 90ms ease-out'
      el.style.transform = 'scaleY(0.08)'
    })
    setTimeout(() => {
      ;[eyeLRef.current, eyeRRef.current].forEach((el) => {
        if (el) {
          el.style.transition = 'transform 140ms ease-out'
          el.style.transform = 'scaleY(1)'
        }
      })
    }, 220)
  }, [])

  const scheduleBlink = useCallback(() => {
    blinkRef.current = setTimeout(
      () => {
        doBlink()
        scheduleBlinkRef.current()
      },
      4500 + Math.random() * 5500
    )
  }, [doBlink])

  useEffect(() => {
    scheduleBlinkRef.current = scheduleBlink
  }, [scheduleBlink])

  /* ── Mount: start parallax + mouse tracking ── */
  useEffect(() => {
    if (!isMounted) return
    LAYERS().forEach(({ ref, ox, oy }) => {
      if (ref.current) ref.current.style.translate = `calc(-50% + ${ox}px) calc(-50% + ${oy}px)`
    })
    mxRef.current = window.innerWidth / 2
    myRef.current = window.innerHeight / 2
    maxDRef.current = Math.hypot(window.innerWidth, window.innerHeight) / 2
    if (btnRef.current) rectRef.current = btnRef.current.getBoundingClientRect()
    const onMM = (e: MouseEvent) => {
      mxRef.current = e.clientX
      myRef.current = e.clientY
    }
    const onR = () => {
      maxDRef.current = Math.hypot(window.innerWidth, window.innerHeight) / 2
      if (btnRef.current) rectRef.current = btnRef.current.getBoundingClientRect()
    }
    document.addEventListener('mousemove', onMM)
    window.addEventListener('resize', onR)
    rafRef.current = requestAnimationFrame(tickRef.current)
    scheduleBlink()
    return () => {
      document.removeEventListener('mousemove', onMM)
      window.removeEventListener('resize', onR)
      cancelAnimationFrame(rafRef.current)
      if (blinkRef.current) clearTimeout(blinkRef.current)
    }
  }, [isMounted, tick, scheduleBlink, LAYERS])

  /* ── Scroll to bottom on new messages ── */
  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    })
  }, [])

  useEffect(() => {
    scrollBottom()
  }, [msgs, typing, scrollBottom])

  /* ── Mobile viewport adjustment ── */
  useEffect(() => {
    if (!isMobile.current || !isOpen) return
    const vv = window.visualViewport
    if (!vv) return
    const apply = () => {
      const cw = winRef.current
      if (!cw) return
      cw.style.top = `${vv.offsetTop}px`
      cw.style.left = `${vv.offsetLeft}px`
      cw.style.width = `${vv.width}px`
      cw.style.height = `${vv.height}px`
      cw.style.bottom = 'auto'
      cw.style.right = 'auto'
      cw.style.maxHeight = `${vv.height}px`
      scrollBottom()
    }
    vv.addEventListener('resize', apply)
    vv.addEventListener('scroll', apply)
    apply()
    return () => {
      vv.removeEventListener('resize', apply)
      vv.removeEventListener('scroll', apply)
    }
  }, [isOpen, scrollBottom])

  /* ── Desktop sidebar positioning ── */
  useEffect(() => {
    if (!isOpen || isMobile.current) return
    const updatePos = (animated: boolean) => {
      const win = winRef.current,
        sb = sidebarRef.current
      if (!win || !sb) return
      if (!animated) sb.style.transition = 'none'
      sb.style.right = `${window.innerWidth - win.getBoundingClientRect().left}px`
      if (isExpanded) {
        sb.style.bottom = '0'
        sb.style.top = '0'
        sb.style.height = '100dvh'
        sb.style.borderRadius = '0'
      } else {
        sb.style.bottom = sb.style.top = sb.style.height = sb.style.borderRadius = ''
      }
      if (!animated)
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (sb) sb.style.transition = ''
          })
        )
    }
    if (isFirst.current) {
      isFirst.current = false
      const sb = sidebarRef.current
      if (sb) {
        sb.style.visibility = 'hidden'
        sb.style.transition = 'none'
        sb.style.clipPath = 'inset(0 0 0 100%)'
      }
      const t1 = setTimeout(() => {
        updatePos(false)
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (sb) {
              sb.style.visibility = ''
              sb.style.transition = 'clip-path 0.35s cubic-bezier(.34,1.56,.64,1)'
              sb.style.clipPath = 'inset(0 0 0 0%)'
              setTimeout(() => {
                if (sb) {
                  sb.style.transition = ''
                  sb.style.clipPath = ''
                }
              }, 400)
            }
          })
        )
      }, 350)
      const onR = () => updatePos(false)
      window.addEventListener('resize', onR)
      return () => {
        clearTimeout(t1)
        window.removeEventListener('resize', onR)
      }
    } else {
      const t1 = setTimeout(() => updatePos(true), 50)
      const t2 = setTimeout(() => updatePos(true), 400)
      const onR = () => updatePos(false)
      window.addEventListener('resize', onR)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        window.removeEventListener('resize', onR)
      }
    }
  }, [isOpen, isExpanded])

  /* ── Textarea auto-resize ── */
  const autosizeTA = useCallback(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }, [])

  /* ── Open / close ── */
  const openChat = useCallback(() => {
    setIsOpen(true)
    setBotHidden(true)
    if (!isMobile.current) setTimeout(() => taRef.current?.focus(), 150)
    if (msgs.length === 0) {
      setTimeout(() => {
        setMsgs([{ text: "Hello! I'm your Overseer — happy to help!", type: 'ai', id: msgId.current++, timestamp: Date.now() }])
        setLastType('ai')
      }, 320)
    }
  }, [msgs.length])

  const closeChat = useCallback(() => {
    if (winRef.current) winRef.current.style.transition = 'none'
    if (sidebarRef.current) sidebarRef.current.style.transition = 'none'
    setIsOpen(false)
    setIsExpanded(false)
    setBotHidden(false)
    setSbAnimated(false)
    setMobileSbOpen(false)
    isFirst.current = true
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (winRef.current) winRef.current.style.cssText = ''
        if (sidebarRef.current) sidebarRef.current.style.cssText = ''
      })
    )
  }, [])

  /* ── Send message ── */
  const sendMsg = useCallback(() => {
    const txt = inputVal.trim()
    if (!txt || disabled) return
    setMsgs((p) => [...p, { text: txt, type: 'user', id: msgId.current++, timestamp: Date.now() }])
    setLastType('user')
    setInputVal('')
    setTimeout(autosizeTA, 0)
    setDisabled(true)
    setTyping(true)
    const resps = getRandResponses()
    let delay = 1000
    resps.forEach((r, i) => {
      setTimeout(() => {
        setTyping(false)
        setMsgs((p) => [...p, { text: r, type: 'ai', id: msgId.current++, timestamp: Date.now() }])
        setLastType('ai')
        if (i < resps.length - 1) setTimeout(() => setTyping(true), 200)
        else
          setTimeout(() => {
            setDisabled(false)
            if (!isMobile.current) taRef.current?.focus()
          }, 200)
      }, delay)
      delay += 2200 + Math.random() * 2000
    })
  }, [inputVal, disabled, autosizeTA])

  /* ── Keyboard handler ── */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (composing.current || e.nativeEvent.isComposing || e.key !== 'Enter' || isMobile.current) return
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const el = taRef.current!,
          s = el.selectionStart ?? 0
        setInputVal(el.value.substring(0, s) + '\n' + el.value.substring(el.selectionEnd ?? s))
        setTimeout(() => {
          el.selectionStart = el.selectionEnd = s + 1
          autosizeTA()
        }, 0)
        return
      }
      e.preventDefault()
      sendMsg()
      setTimeout(autosizeTA, 0)
    },
    [sendMsg, autosizeTA]
  )

  /* ── Computed classes ── */
  const hasTxt = inputVal.trim().length > 0

  const sbItemCls = (id: string) =>
    `overseer-panel-sb-item relative flex items-center justify-center w-9 h-9 rounded-[10px] cursor-pointer shrink-0 ${activeSb === id ? 'active bg-[#404040] text-white dark:bg-[#333]' : 'text-[#888] hover:bg-[#2e2e2e] hover:text-white dark:hover:bg-[#222]'}`

  const mobSbItemCls = (id: string) =>
    `flex items-center gap-3 px-4 py-[10px] cursor-pointer rounded-[10px] mx-2 my-0.5 text-[13px] font-semibold transition-colors ${activeSb === id ? 'bg-[#404040] text-white dark:bg-[#333]' : 'text-[#888] hover:bg-[#2e2e2e] hover:text-white dark:hover:bg-[#222]'}`

  /* ── Message renderer ── */
  const renderMsgs = () =>
    msgs.map((m, idx) => {
      const grouped = m.type === 'ai' && msgs[idx - 1]?.type === 'ai'
      const html = m.type === 'ai' ? linkify(m.text.replace(/\n/g, '<br>')) : m.text.replace(/\n/g, '<br>')
      const time = fmtTime(m.timestamp)

      if (m.type === 'user')
        return (
          <div key={m.id} className="overseer-panel-msg flex items-end gap-1.5 justify-end">
            <div className="flex flex-col gap-0.5 max-w-[82%] sm:max-w-[78%] items-end">
              {!grouped && <span className={`${SENDER_CLS} text-[#aaa] dark:text-[#666]`}>You</span>}
              <div
                className={`${BUBBLE_BASE} overseer-panel-bubble-user rounded-[14px_14px_3px_14px] bg-[#111] text-white dark:bg-[#e0e0e0] dark:text-[#111]`}
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <span className={TIME_CLS} suppressHydrationWarning>
                {time}
              </span>
            </div>
          </div>
        )

      return (
        <div key={m.id} className={`overseer-panel-msg overseer-panel-msg-ai flex items-end gap-1.5 justify-start${grouped ? ' grouped' : ''}`}>
          <div className={AVATAR_CLS} aria-hidden="true" style={{ backgroundImage: `url("/images/png/overseer.png")` }} />
          <div className="flex flex-col gap-0.5 min-w-0 max-w-[calc(100%-38px)] sm:max-w-[78%] md:max-w-[76%] items-start">
            {!grouped && <span className={`${SENDER_CLS} text-[#666] dark:text-[#888]`}>Overseer - system</span>}
            <div className={`${BUBBLE_BASE} overseer-panel-bubble-ai bg-white text-[#1a1a1a] dark:bg-[#2c2c2c] dark:text-[#e8e8e8]`} dangerouslySetInnerHTML={{ __html: html }} />
            <span className={TIME_CLS} suppressHydrationWarning>
              {time}
            </span>
          </div>
        </div>
      )
    })

  /* ── Typing indicator ── */
  const renderTyping = () => (
    <div className={`overseer-panel-msg overseer-panel-msg-ai flex items-end gap-1.5 justify-start${lastType === 'ai' ? ' grouped' : ''}`}>
      <div className={AVATAR_CLS} aria-hidden="true" style={{ backgroundImage: `url("/images/png/overseer.png")` }} />
      <div className="flex flex-col gap-0.5 min-w-0 items-start">
        {lastType !== 'ai' && <span className={`${SENDER_CLS} text-[#666] dark:text-[#888]`}>Overseer - system</span>}
        <div className={`${BUBBLE_BASE} overseer-panel-bubble-ai bg-white dark:bg-[#2c2c2c]`}>
          <div className="flex items-center gap-1 py-0.75">
            {[0, 1, 2].map((i) => (
              <span key={i} className="overseer-panel-dot w-1.25 h-1.25 rounded-full shrink-0 bg-[#777] dark:bg-[#888]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <div suppressHydrationWarning>
      {/* ── Robot trigger button ── */}
      {isMounted && (
        <div
          ref={btnRef}
          className={`overseer-panel-btn${botHidden ? ' is-hidden' : ''}`}
          onClick={openChat}
          onMouseEnter={() => setGreetVisible(true)}
          onMouseLeave={() => setGreetVisible(false)}
          role="button"
          aria-label="Open chat assistant"
        >
          {/* Antenna */}
          <svg ref={hairRef} className="overseer-panel-layer overseer-panel-layer-hair text-[#111] dark:text-[#e8e8e8]" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d="M29.9988 24.148L5.8512 0L-5.0344e-05 5.85133L24.1476 29.9993L29.9988 24.148Z" fill="currentColor" />
            <path d="M24.1487 0.00046199L0.00109863 24.1484L5.85235 29.9998L30 5.8518L24.1487 0.00046199Z" fill="currentColor" />
          </svg>
          {/* Head */}
          <svg ref={headRef} className="overseer-panel-layer" width="52" height="50" viewBox="0 0 52 50" fill="none" aria-hidden="true">
            <path d="M26,0c20.24,0,26,5.49,26,26.47,0,23.84-10.75,23.53-26,23.53S0,50.31,0,26.47C0,5.49,5.76,0,26,0Z" fill="url(#overseer-panel-hc)" />
            <defs>
              <linearGradient id="overseer-panel-hc" x1="26" y1="0" x2="26" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e8e8e8" />
                <stop offset="1" stopColor="#b0b0b0" />
              </linearGradient>
            </defs>
          </svg>
          {/* Face */}
          <svg ref={faceRef} className="overseer-panel-layer" width="44" height="36" viewBox="0 0 44 36" fill="none" aria-hidden="true">
            <path d="M22,36c15.09,0,20.52-.87,21.83-16.94S39.44,0,22,0-1.1,3.45.17,19.06c1.3,16.07,6.74,16.94,21.83,16.94Z" fill="url(#overseer-panel-fc)" />
            <defs>
              <linearGradient id="overseer-panel-fc" x1="22" y1="0" x2="22" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2a2a2a" />
                <stop offset="1" stopColor="#444" />
              </linearGradient>
            </defs>
          </svg>
          {/* Eyes + mouth */}
          <svg ref={exprRef} className="overseer-panel-layer" width="30" height="15" viewBox="0 0 32 15" fill="none" aria-hidden="true">
            <path ref={eyeLRef} d="M3.78,12c3.45,0,3.78-2.7,3.78-6S7.56,0,3.78,0,0,2.7,0,6s.33,6,3.78,6Z" fill="white" />
            <path d="M13.05,12.76c-1.13-.45-.82,2.24,2.99,2.24,4.21,0,4.24-3.55,3.01-4.13-1.35-.64-1.75,3.6-5.99,1.89Z" fill="white" />
            <path ref={eyeRRef} d="M26.22,12c3.45,0,3.78-2.7,3.78-6s0-6-3.78-6-3.78,2.7-3.78,6,.33,6,3.78,6Z" fill="white" />
          </svg>

          {/* Greeting tooltip */}
          <div
            className={`overseer-panel-greet hidden sm:block absolute bottom-0.5 right-15.5 px-3 py-1.75 rounded-[10px] whitespace-nowrap text-[12px] font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif] leading-[1.4] z-10 bg-white text-[#333] shadow-[0_3px_12px_rgba(0,0,0,.13)] dark:bg-[#2c2c2c] dark:text-[#e0e0e0] dark:shadow-[0_3px_12px_rgba(0,0,0,.5)]${greetVisible ? ' is-visible' : ''}`}
            aria-hidden="true"
          >
            <span className="absolute -right-1.5 top-[60%] -translate-y-1/2 w-0 h-0 border-t-1.5 border-t-transparent border-b-1.5 border-b-transparent border-l-1.5 border-l-white dark:border-l-[#2c2c2c]" />
            <strong>Introduce your overseer</strong>
            <br />
            Use this service wisely
          </div>
        </div>
      )}

      {/* ── Expanded desktop backdrop ── */}
      {isExpanded && <div className="fixed inset-0 z-999 pointer-events-auto backdrop-blur-[5px] brightness-[0.4]" onClick={closeChat} aria-hidden="true" />}

      {/* ── Mobile sidebar overlay ── */}
      <div
        className={`fixed inset-0 z-1002 transition-opacity duration-300 backdrop-blur-xs brightness-50${mobileSbOpen ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'}`}
        onClick={() => setMobileSbOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile sidebar drawer ── */}
      <div className={`overseer-panel-mob-sidebar flex flex-col bg-[#1a1a1a] dark:bg-[#111]${mobileSbOpen ? ' is-open' : ''}`} role="dialog" aria-label="Navigation menu">
        <div className="flex items-center justify-between px-4 h-11.5 shrink-0 border-b border-[#2e2e2e]">
          <span className="text-[12px] font-bold tracking-widest uppercase text-[#666]">Menu</span>
          <button
            className="overseer-panel-icon-btn flex items-center justify-center w-8 h-8 border-0 rounded-full bg-transparent cursor-pointer text-[#888]"
            onClick={() => setMobileSbOpen(false)}
            aria-label="Close menu"
          >
            <IcClose />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto py-2">
          {SIDEBAR_ITEMS.map(({ id, label, Icon }, idx) => (
            <div key={id}>
              {idx === 1 && <div className={DIVIDER_MOB} />}
              <div
                className={mobSbItemCls(id)}
                onClick={() => {
                  setActiveSb(id)
                  setMobileSbOpen(false)
                }}
              >
                <Icon />
                <span>{label}</span>
              </div>
            </div>
          ))}
          <div className={DIVIDER_MOB} />
          <div
            className={mobSbItemCls('settings')}
            onClick={() => {
              setActiveSb('settings')
              setMobileSbOpen(false)
            }}
          >
            <IcSettings />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* ── Desktop sidebar ── */}
      <div
        ref={sidebarRef}
        className={`overseer-panel-sidebar flex flex-col items-center justify-between py-2 bg-[#1a1a1a] dark:bg-[#111]${isOpen ? ' is-open' : ''}${isExpanded ? ' is-expanded' : ''}${sbAnimated ? ' is-animated' : ''}`}
      >
        <div className="overseer-panel-sb-items flex flex-col items-center gap-1 flex-1 py-1 overflow-y-auto overflow-x-hidden">
          {SIDEBAR_ITEMS.map(({ id, label, Icon }, idx) => (
            <div key={id}>
              {idx === 1 && <div className={DIVIDER_H} />}
              <div className={sbItemCls(id)} onClick={() => setActiveSb(id)}>
                <Icon />
                <span className="overseer-panel-sb-tooltip">{label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1 py-1">
          <div className={DIVIDER_H} />
          <div className={sbItemCls('settings')} onClick={() => setActiveSb('settings')}>
            <IcSettings />
            <span className="overseer-panel-sb-tooltip">Settings</span>
          </div>
        </div>
      </div>

      {/* ── Chat window ── */}
      <div
        ref={winRef}
        className={`overseer-panel-win flex flex-col bg-white dark:bg-[#1a1a1a]${isOpen ? ' is-open' : ''}${isExpanded ? ' is-expanded' : ''}`}
        role="dialog"
        aria-label="Chat assistant"
        suppressHydrationWarning
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-1 px-1.5 h-11.5 sm:h-11 sm:px-2 shrink-0 bg-[#1a1a1a] dark:bg-[#111] text-white">
          {/* Burger — mobile only */}
          <button
            className="overseer-panel-icon-btn overseer-panel-burger-btn items-center justify-center w-8 h-8 border-0 rounded-full bg-transparent cursor-pointer shrink-0"
            onClick={() => setMobileSbOpen(true)}
            aria-label="Open navigation menu"
          >
            <IcBurger />
          </button>
          {/* Expand — desktop only */}
          <button
            className="overseer-panel-icon-btn overseer-panel-expand-btn items-center justify-center w-8 h-8 border-0 rounded-full bg-transparent cursor-pointer shrink-0"
            onClick={() => {
              setSbAnimated(true)
              setIsExpanded((v) => !v)
            }}
            aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
          >
            {isExpanded ? <IcCollapse /> : <IcExpand />}
          </button>
          <h3 className="flex-1 text-center text-[12.5px] sm:text-[13px] md:text-[13.5px] font-bold tracking-[0.01em] text-white whitespace-nowrap overflow-hidden text-ellipsis">
            AI Customer Service Assistant
          </h3>
          <button className="overseer-panel-icon-btn flex items-center justify-center w-8 h-8 border-0 rounded-full bg-transparent cursor-pointer shrink-0" onClick={closeChat} aria-label="Close chat">
            <IcClose />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={msgsRef}
          className="overseer-panel-msgs flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col gap-1.5 sm:gap-1.75 md:gap-2 p-[10px_10px_8px] md:p-[12px_12px_10px] bg-[#f2f2f2] dark:bg-[#141414] [&::-webkit-scrollbar-thumb]:bg-[#ccc] dark:[&::-webkit-scrollbar-thumb]:bg-[#3a3a3a]"
          role="log"
          aria-live="polite"
        >
          {renderMsgs()}
          {typing && renderTyping()}
        </div>

        {/* Input */}
        <div className="flex items-end gap-1.5 sm:gap-1.75 py-1.75 px-2 sm:px-2.5 md:px-3 md:py-2 shrink-0 border-t bg-white border-[#ebebeb] dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
          <div className="flex-1 min-w-0 flex items-end overflow-hidden rounded-xl border-[1.5px] transition-[border-color,box-shadow] duration-200 bg-[#f5f5f5] border-[#e0e0e0] dark:bg-[#2a2a2a] dark:border-[#3a3a3a] focus-within:border-[#888] focus-within:shadow-[0_0_0_2px_rgba(0,0,0,.05)] dark:focus-within:border-[#666] dark:focus-within:shadow-[0_0_0_2px_rgba(255,255,255,.04)]">
            <textarea
              ref={taRef}
              className="overseer-panel-textarea flex-1 min-w-0 border-0 outline-none bg-transparent py-1.75 px-2.75 min-h-8.5 max-h-25 text-3.5 md:text-[13px] text-[#111] placeholder-[#b8b8b8] dark:text-[#e8e8e8] dark:placeholder-[#555] disabled:opacity-45 font-[inherit]"
              placeholder="Send a message…"
              rows={1}
              enterKeyHint={isMobileDevice ? 'send' : 'enter'}
              value={inputVal}
              disabled={disabled}
              aria-label="Message input"
              onChange={(e) => {
                setInputVal(e.target.value)
                autosizeTA()
              }}
              onKeyDown={onKeyDown}
              onCompositionStart={() => {
                composing.current = true
              }}
              onCompositionEnd={() => {
                composing.current = false
              }}
            />
          </div>
          <button
            className={`shrink-0 flex items-center justify-center border-0 rounded-full w-8.5 h-8.5 md:w-8.25 md:h-8.25 transition-[background,transform] duration-200 ${hasTxt ? 'cursor-pointer bg-[#111] hover:bg-[#333] active:scale-[0.88] dark:bg-[#e0e0e0] dark:hover:bg-white' : 'cursor-not-allowed bg-[#d8d8d8] dark:bg-[#3a3a3a]'}`}
            onClick={sendMsg}
            disabled={disabled || !hasTxt}
            aria-label="Send message"
          >
            <IcSend on={hasTxt} />
          </button>
        </div>
      </div>
    </div>
  )
}

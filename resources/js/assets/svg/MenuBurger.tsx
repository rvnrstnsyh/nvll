interface Props {
  className1: string
  className2: string
  className3: string
}

export default function MenuBurger({ className1, className2, className3 }: Props) {
  return (
    <svg className={className1} stroke="currentColor" fill="none" viewBox="0 0 24 24">
      <path className={className2} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      <path className={className3} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

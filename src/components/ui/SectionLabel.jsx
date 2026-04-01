export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={`inline-block text-xs font-semibold tracking-widest uppercase text-secondary ${className}`}
    >
      {children}
    </span>
  )
}

import { Link } from 'react-router-dom'

export default function ArrowLink({ to, href, className = '', children, ...rest }) {
  const cls = `inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline transition-colors ${className}`

  const arrow = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
        {arrow}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
        {arrow}
      </Link>
    )
  }

  return (
    <span className={cls} role="link" tabIndex={0} {...rest}>
      {children}
      {arrow}
    </span>
  )
}

import { getFaIcon } from '../../utils/icons'

export function FaIcon({ icon, className = '', fallback, variant, ...rest }) {
  const faClass = getFaIcon(icon, fallback, variant)
  return <i className={`${faClass} ${className}`.trim()} aria-hidden="true" {...rest} />
}

export default FaIcon

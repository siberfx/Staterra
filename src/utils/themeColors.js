/**
 * Pick readable foreground (dark or light) for a solid background hex color.
 */
export function foregroundForBackground(hex) {
  if (!hex || typeof hex !== 'string') return '#ffffff'
  const m = hex.trim().match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i)
  if (!m) return '#ffffff'
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 160 ? '#111827' : '#ffffff'
}

/**
 * Merkezi sayfa konteyneri.
 * Padding ve max-width değişikliği için: src/index.css @theme içindeki
 * --max-width-page, --container-px, --container-px-sm, --container-px-lg
 */
export default function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`container-page ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

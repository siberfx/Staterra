import { useState, useRef, useEffect } from 'react'

const DEBOUNCE_MS = 300

function SearchInput({ onSearch, placeholder = 'Zoek in documentatie...' }) {
  const [value, setValue] = useState('')
  const debounceRef = useRef(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
      onSearch?.(value.trim())
    }, DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, onSearch])

  return (
    <div className="relative">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl focus:outline-none">
        search
      </span>
      <input
        type="text"
        role="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-lg bg-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        aria-label="Zoek in documentatie"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          aria-label="Wissen"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
    </div>
  )
}

export default SearchInput

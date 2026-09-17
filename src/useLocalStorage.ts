import { useCallback, useEffect, useRef, useState } from 'react'

// Storage throws rather than returning null in Safari private mode and when a
// site is blocked from storing data, so every access is guarded and falls back
// to in-memory state for the session.
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => read(key, initialValue))
  const skipWrite = useRef(false)

  useEffect(() => {
    // remove() resets state to the initial value, which would otherwise land
    // here and write the key straight back.
    if (skipWrite.current) {
      skipWrite.current = false
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Quota exceeded or storage blocked; the in-memory value still stands.
    }
  }, [key, value])

  // `storage` only fires in the *other* tabs, so this syncs rather than loops.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === key && event.newValue !== null) {
        setValue(JSON.parse(event.newValue) as T)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  const remove = useCallback(() => {
    skipWrite.current = true
    try {
      localStorage.removeItem(key)
    } catch {
      // Nothing to do; the next read falls back to the initial value.
    }
    setValue(initialValue)
  }, [key, initialValue])

  return [value, setValue, remove] as const
}

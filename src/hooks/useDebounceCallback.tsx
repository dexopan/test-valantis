import { useRef, MutableRefObject, useEffect } from 'react'

export const useDebounceCallback = (delay = 1000) => {
  const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  useEffect(() => clearTimeout(ref.current), [])

  return (callback: VoidFunction) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(callback, delay)
  }
}

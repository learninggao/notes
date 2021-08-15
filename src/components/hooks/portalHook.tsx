import { useEffect, useRef } from 'react'

export const usePortal = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    if (wrapperRef.current) modalRoot?.appendChild(wrapperRef.current)
    return () => {
      wrapperRef.current!.remove()
    }
  })

  function createWrapper() {
    if (!wrapperRef.current) {
      wrapperRef.current = document.createElement('div')
    }

    return wrapperRef.current
  }
  return createWrapper()
}

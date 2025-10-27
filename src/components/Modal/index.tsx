'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    const modalElement = document.getElementsByClassName('modal--wrapper')
    modalElement[0].classList.add('modal--exit')
    setTimeout(() => {
      router.back()
    }, 300)
  }, [router])

  useEffect(() => {    
    // Handle escape key
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onDismiss()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onDismiss])

  return (
    <div 
      className="modal--wrapper"
      onClick={onDismiss}
    >
      <div 
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal--inner">
          <div className="modal--inner-bg"></div>
          <button
            onClick={onDismiss}
            className="modal--close"
            aria-label="Close modal"
          >
            ✕
          </button>
          <div className="modal--draw">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
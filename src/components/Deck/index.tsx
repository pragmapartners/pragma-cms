'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useEffect, useRef } from 'react'

import type { StaticImageData } from 'next/image'
import type { DeckCardPostData } from '@/components/DeckCard'
import type { Media as MediaType } from '@/payload-types'

import { DeckCard } from '@/components/DeckCard'

export type DeckCard = {
  title: string
  description?: string
  link?: {
    url: string
    openInNewTab?: boolean
  }
  image?: StaticImageData | MediaType
}
export type DeckProps = {
  alignItems?: 'center'
  className?: string
  cards: DeckCard[]
  showDescription?: boolean
  title?: string
}

export const Deck: React.FC<DeckProps> = (props) => {

  const { alignItems, className, cards, showDescription, title } = props

  const fieldsetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fieldset = fieldsetRef.current
    if (!fieldset) return

    const radios = Array.from(fieldset.querySelectorAll<HTMLInputElement>('input'))
    const handlers = new Map<HTMLInputElement, (e: Event) => void>()

    radios.forEach((radio) => {
      const handler = (e: Event) => {
        if (!(document as any).startViewTransition) return
        e.preventDefault()
        ;(document as any).startViewTransition(() => {
          ;(e.target as HTMLInputElement).checked = true
        })
      }

      radio.addEventListener('click', handler)
      handlers.set(radio, handler)
    })

    return () => {
      handlers.forEach((handler, radio) => radio.removeEventListener('click', handler))
    }
  }, [cards])

  return (
    <div id="radiento" ref={fieldsetRef} className="bento">
      {cards && cards.length > 0 && (
        <>
          {cards.map((card, index) => {
            const doc = card as DeckCardPostData
            return (
              <DeckCard
                key={index}
                index={index}
                doc={doc}
              />
            )
          })}
        </>
      )}
    </div>
  )
}


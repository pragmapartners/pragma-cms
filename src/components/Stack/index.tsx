'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useEffect, useRef } from 'react'

import type { StaticImageData } from 'next/image'
import type { DeckCardPostData } from '@/components/DeckCard'
import type { Media as MediaType } from '@/payload-types'
import { StackItem } from '@/components/StackItem'

export type StackItem = {
  title: string
  description?: string
  link?: {
    url: string
    openInNewTab?: boolean
  }
  image?: StaticImageData | MediaType
  media: MediaType[]
  slug: string
}

export type StackProps = {
  className?: string
  items: StackItem[]
  style?: 'scale' | 'bloom' | null
  relationTo?: 'posts' | 'case-studies'
}

export const Stack: React.FC<StackProps> = (props) => {

  const { className, items, style, relationTo } = props

  //copy items into itself to mock 20 items for styling purposes
  const extendedItems = [...items, ...items, ...items, ...items, ...items]

  return (
    <section className={cn(
        'stack',
        className,
      )}
      data-variant={style}
      style={{
        '--stack-item-count': extendedItems.length > 5 ? 5 : extendedItems.length,
        '--stack-total-count': extendedItems.length
      } as React.CSSProperties}
    >
      {items && items.length > 0 && (
        <>
          {extendedItems.map((item, index) => {
            return (
              <StackItem
                key={index}
                index={index}
                doc={item}
                className={
                  style === 'scale' ? 'fullwidth' : ''
                }
                style={{'--index': index + 1} as React.CSSProperties}
                relationTo={relationTo}
              />
            )
          })}
        </>
      )}
    </section>
  )
}


'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

import type { Post, TeamMember } from '@/payload-types'
import type { StaticImageData } from 'next/image'

import { Media } from '@/components/Media'

export type DeckCardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'> & {
  profileImage?: NonNullable<TeamMember['profileImage']>
}

export const DeckCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: DeckCardPostData
  relationTo?: 'posts' | 'team-members'
  showCategories?: boolean
  title?: string
  staticImage?: StaticImageData
  index?: number
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, staticImage, index } = props

  const { slug, categories, meta, title, profileImage} = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const safeIndex = typeof index === 'number' ? index : 0
  const machinedTitle =
    (titleToUse || `card-${safeIndex}`).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  // deterministic "random" per index to avoid SSR/CSR mismatch
  function deterministicInt(seed: number, min = -3, max = 3) {
    const range = max - min + 1
    // small deterministic hash-like formula
    const v = Math.abs((seed * 927371 + 31) % 10000)
    return (v % range) + min
  }

  const [randomNumber] = useState(() => deterministicInt(safeIndex, -3, 3))

  return (
    <article
      className={cn(
        className,
      )}
      ref={card.ref}
      // ensure CSS vars are strings so SSR and client types match
      style={
        {
          ['--i' as string]: String(safeIndex + 1),
          ['--r' as string]: String(randomNumber),
        } as React.CSSProperties
      }
    >
      <input type="radio" id={machinedTitle} name="drone" value={title ?? ''} defaultChecked={safeIndex === 0}></input>
      <label htmlFor={machinedTitle}>
        
        {profileImage && typeof profileImage !== 'string' && (
          <Media resource={profileImage} size="33vw" imgClassName="w-full h-full object-cover" />
        )}
        {staticImage && <Media src={staticImage} size="33vw" />}
        <span>{title}</span>
        </label>
    </article>
  )
}
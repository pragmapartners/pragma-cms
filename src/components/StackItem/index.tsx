'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import React, { Fragment, useEffect, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'
import type { StaticImageData } from 'next/image'

import { Media } from '@/components/Media'
import Image from 'next/image'

export const StackItem: React.FC<{
  className?: string
  doc?: {
    title: string
    media: MediaType[]
    slug: string
  }
  title?: string
  staticImage?: StaticImageData
  index?: number
  relationTo?: 'posts' | 'case-studies'
  style?: React.CSSProperties
}> = (props) => {
  const router = useRouter()

  const { className, doc, title: titleFromProps, staticImage, index, relationTo, style } = props
  const { title, media, slug } = doc || {}

  const displayImage = staticImage || (media && media.length > 0 ? media[0] : null)

  const href = `/${relationTo}/${slug}`

  const titleCharacterCount = (title: string) => {
    let x = title.replace(/\s+/g, '').trim()
    x = x.replace(/[^\w\s]/gi, '') 
    return x.length
  }

  return (
    // @TODO replace with native Link component
    
      <article 
        className={cn('stack--item', className)}
        // onMouseEnter={() => router.prefetch(href)}
        // onClick={handleClick}
        style={{ 
          '--title-count': title ? titleCharacterCount(title) : 0,
          cursor: 'pointer',
          ...style 
        } as React.CSSProperties}
      >
        <Link href={href} scroll={false}>
          <div className="item--inner">
            <p>{titleFromProps || doc?.title}</p>
            {displayImage && (
              typeof displayImage === 'object' && 'url' in displayImage && displayImage.url ? (
                <picture>
                  <Image
                    src={displayImage.url}
                    alt={displayImage.alt || title || ''}
                    width={400}
                    height={300}
                    sizes="33vw"
                    priority={index !== undefined && index < 3}
                    className="stack-item-image"
                  />
                </picture>
              ) : (
                <Media 
                  htmlElement={null} 
                  resource={displayImage as MediaType} 
                  size="33vw"
                  priority={index !== undefined && index < 3}
                />
              )
            )}
          </div>
        </Link>
      </article>
  )
}
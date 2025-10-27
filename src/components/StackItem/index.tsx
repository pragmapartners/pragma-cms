'use client'
import { useRouter } from 'next/navigation'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import React, { Fragment, useEffect, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'
import type { StaticImageData } from 'next/image'

import { Media } from '@/components/Media'

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
}> = (props) => {
  const router = useRouter()

  const { className, doc, title: titleFromProps, staticImage, index, relationTo } = props
  const { title, media, slug } = doc || {}

  const displayImage = staticImage || (media && media.length > 0 ? media[0] : null)

  const href = `/${relationTo}/${slug}`

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("handling click")
    router.push(href, { scroll: false })
  }

  return (
    <article 
      className={cn('stack--item', className)}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="item--inner">
        <p>{titleFromProps || doc?.title}</p>
        {displayImage && <Media htmlElement={null} resource={displayImage as MediaType} size="33vw" />}
      </div>
    </article>
  )
}
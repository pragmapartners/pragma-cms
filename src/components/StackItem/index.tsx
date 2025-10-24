'use client'
import { useRouter } from 'next/navigation'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

import type { CaseStudy, Media as MediaType } from '@/payload-types'
import type { StaticImageData } from 'next/image'

import { Media } from '@/components/Media'

export const StackItem: React.FC<{
  className?: string
  doc?: CaseStudy
  title?: string
  staticImage?: StaticImageData
  index?: number
}> = (props) => {
  const router = useRouter()

  const { className, doc, title: titleFromProps, staticImage, index } = props
  const { title, media } = doc || {}

  const displayImage = staticImage || (media && media.length > 0 ? media[0] : null)

  return (
    <article className={cn(
        'stack--item',
        className,
      )}
    >
      <div className="item--inner">
        <p>{titleFromProps || doc?.title}</p>
        <button type="button" onClick={() => router.replace('/contact')}>
      Click me
    </button>
        {displayImage && <Media htmlElement={null} resource={displayImage as MediaType} size="33vw" />}
      </div>
    </article>
  )
}
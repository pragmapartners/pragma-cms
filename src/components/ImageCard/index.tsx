'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, TeamMember } from '@/payload-types'
import type { StaticImageData } from 'next/image'

import { Media } from '@/components/Media'

export type ImageCardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'> & {
  profileImage?: NonNullable<TeamMember['profileImage']>
}

export const ImageCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: ImageCardPostData
  relationTo?: 'posts' | 'team-members'
  showCategories?: boolean
  title?: string
  staticImage?: StaticImageData
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, staticImage } = props

  const { slug, categories, meta, title, profileImage, } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-3xl overflow-hidden bg-card hover:cursor-pointer',
        'max-w-md w-full',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full h-full">
        {!metaImage && !profileImage && !staticImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} size="33vw" />
        )}
        {profileImage && typeof profileImage !== 'string' && (
          <Media resource={profileImage} size="33vw" className='aspect-21/25 w-full' imgClassName="w-full h-full object-cover" />
        )}
        {staticImage && <Media src={staticImage} size="33vw" />}
      </div>
      {/* <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && <h3 className="mb-2 text-lg font-semibold">{titleToUse}</h3>}
        {sanitizedDescription && <p className="mb-4 text-sm">{sanitizedDescription}</p>}
        {slug && (
          <Link className="not-prose" href={href} ref={link.ref}>
            Read More
          </Link>
        )}
      </div> */}
    </article>
  )
}
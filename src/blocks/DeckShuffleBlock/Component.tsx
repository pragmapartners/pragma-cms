import React from 'react'

import type { StaticImageData } from 'next/image'
import type { Post, TeamMember } from '@/payload-types'
import type { DeckCardPostData } from '@/components/DeckCard'
import type { DeckShuffleBlock as DeckShuffleProps } from './type'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ImageCard } from '@/components/ImageCard'
import { Deck } from '@/components/Deck'
import { Card } from '@payloadcms/ui'

export const DeckShuffleBlock: React.FC<DeckShuffleProps> = async (props) => {
  
  const { 
    id,
    categories,
    eyebrow,
    introContent,
    limit: limitFromProps,
    populateBy,
    links,
    selectedDocs,
    relationTo
  } = props
  
  const limit = limitFromProps || 3

  let entities: (Post | TeamMember)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedContent = await payload.find({
      collection: relationTo || 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })
    entities = fetchedContent.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedContent = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      entities = filteredSelectedContent
    }
  }
  
  return (
    <div className="wrapper">
      <div className="grid grid-cols-2 gap-12">
        <div className="max-w-3xl grid">
          {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
          {introContent && <RichText className="mb-0" data={introContent} enableGutter={false} />}
          <div className="links-wrapper flex space-x-4 mt-6">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>

        <Deck cards={entities}/>
      </div>
    </div>
  )
}

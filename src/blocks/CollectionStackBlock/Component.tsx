import React from 'react'

import type { StaticImageData } from 'next/image'
import type { CaseStudy, Media as MediaType } from '@/payload-types'
import type { CollectionStackBlock as CollectionStackProps } from './type'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Stack } from '@/components/Stack'

export const CollectionStackBlock: React.FC<CollectionStackProps> = async (props) => {
  const { 
    style,
    limit: limitFromProps,
    relationTo
  } = props
  
  const limit = limitFromProps || 3

  let entities: (CaseStudy)[] = []

  const payload = await getPayload({ config: configPromise })

  const fetchedContent = await payload.find({
    collection: relationTo || 'case-studies',
    depth: 1,
    limit,
  })
  entities = fetchedContent.docs
  
  // Transform entities to match StackItem type
  const stackItems = entities
    .filter(entity => entity.slug && typeof entity.slug === 'string')
    .map(entity => ({
      ...entity,
      slug: entity.slug as string,
      media: Array.isArray(entity.media) ? entity.media.filter((item): item is MediaType => typeof item === 'object' && item !== null) : []
    }))
  
  return (
    <div className="wrapper">
      <Stack items={stackItems} style={style} relationTo={relationTo || undefined} />
    </div>
  )
}

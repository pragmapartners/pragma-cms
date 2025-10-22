import React from 'react'

import type { StaticImageData } from 'next/image'
import type { CaseStudy } from '@/payload-types'
import type { CollectionStackBlock as CollectionStackProps } from './type'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Stack } from '@/components/Stack'

export const CollectionStackBlock: React.FC<CollectionStackProps> = async (props) => {
  console.log("🚀 ~ file: Component.tsx:10 ~ CollectionStackBlock ~ props", props)
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
  
  return (
    <div className="wrapper">
      <Stack items={entities} style={style} />
    </div>
  )
}

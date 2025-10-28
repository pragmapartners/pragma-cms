import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

export const getCaseStudy = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      meta: true,
      hero: true,
      publishedAt: true,
      authors: true,
      categories: true,
    },
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})
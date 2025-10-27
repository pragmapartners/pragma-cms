import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Create a single cached Payload instance to reuse
const getPayloadInstance = cache(async () => {
  return await getPayload({ config: configPromise })
})

export default async function CaseStudiesPage() {
  const { isEnabled: draft } = await draftMode()
  const slug = 'case-studies'
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
    draft,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="relative">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const slug = 'case-studies'
  const page = await queryPageBySlug({
    slug,
    draft,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, draft }: { slug: string; draft?: boolean }) => {
  // Reuse the cached Payload instance
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'pages',
    draft: draft || false,
    limit: 1,
    pagination: false,
    overrideAccess: draft || false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
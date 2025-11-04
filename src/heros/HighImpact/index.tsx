'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSButton } from '@/components/Button'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, eyebrow }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="hero">
      <div className="wrapper">
        <div className="max-w-146">
          {eyebrow && <p className="mb-4 text-sm font-semibold uppercase">{eyebrow}</p>}
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSButton {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {/* <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div> */}
    </div>
  )
}

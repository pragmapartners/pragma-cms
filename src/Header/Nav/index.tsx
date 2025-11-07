'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { usePathname } from 'next/navigation'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  const isActivePath = (href: string): boolean => {
    if (!href) return false
    return pathname === href
  }

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className={isActivePath(link.url as string) ? 'font-bold underline' : ''} />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5" />
      </Link>
    </nav>
  )
}

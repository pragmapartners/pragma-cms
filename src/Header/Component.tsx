import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import Link from 'next/link'
import Wordmark from '@/components/Icons/Logo'
import { HeaderNav } from './Nav'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <header className="wrapper header">
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Wordmark />
        </Link>
        <HeaderNav data={headerData} />
      </div>
    </header>
  )

  // return <HeaderClient data={headerData} />
}

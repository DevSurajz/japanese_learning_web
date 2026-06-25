'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'
import { usePathname, useSearchParams } from 'next/navigation'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 })

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a[href]') as HTMLAnchorElement
      if (!target) return
      if (target.target === '_blank') return
      
      try {
        const currentUrl = new URL(window.location.href)
        const targetUrl = new URL(target.href)
        
        // Only trigger for internal links that actually change the path or search params
        if (currentUrl.origin !== targetUrl.origin) return
        if (currentUrl.pathname === targetUrl.pathname && currentUrl.search === targetUrl.search) return
        
        // Start the progress bar
        NProgress.start()
      } catch (err) {
        // Ignore invalid URLs
      }
    }
    
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

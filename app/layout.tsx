import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ScriptFlow - AI Screenwriting Platform',
  description: 'Professional screenwriting with AI assistance',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
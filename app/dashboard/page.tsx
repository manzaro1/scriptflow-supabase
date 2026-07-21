import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: scripts } = await supabase
    .from('scripts')
    .select('id, title, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ width: '100%', maxWidth: 900, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>Your Scripts</h1>
          <form action="/api/auth/signout" method="post">
            <button type="submit" style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14 }}>
              Sign out
            </button>
          </form>
        </div>

        {scripts?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 64, background: '#fff', borderRadius: 16, border: '2px dashed #e5e7eb' }}>
            <p style={{ color: '#6b7280', marginBottom: 24 }}>No scripts yet</p>
            <a href="/scripts/new" style={{ background: '#10b981', color: '#fff', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>
              Create your first script
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {scripts?.map((script: any) => (
              <Link key={script.id} href={`/scripts/${script.id}/editor`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', textDecoration: 'none' }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>{script.title}</p>
                  <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Updated {new Date(script.updated_at).toLocaleDateString()}</p>
                </div>
                <span style={{ color: '#9ca3af', fontSize: 20 }}>→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f5', padding: '60px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontSize: 56, fontWeight: 900, marginBottom: 16, letterSpacing: '-''2px' }}>
            <span style={{ color: '#6366f1' }}>Script</span><span style={{ color: '#f0f0f5' }}>Flow</span>
          </h1>
          <p style={{ fontSize: 20, color: '#7070a0', marginBottom: 32 }}>
            AI-powered screenwriting. Write, collaborate, and perfect your screenplay with intelligent assistance.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/signup" style={{ background: '#6366f1', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>
              Get Started Free
            </Link>
            <Link href="/login" style={{ background: 'transparent', color: '#f0f0f5', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 16, border: '1px solid #2a2a3a' }}>
              Sign In
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
          {[
            { title: '📝 Professional Format', desc: 'Industry-standard screenplay formatting automatically applied as you write.' },
            { title: '🤖 AI Assistance', desc: 'Get intelligent suggestions for dialogue, scene descriptions, and plot twists.' },
            { title: '👥 Real-time Collaboration', desc: 'Invite co-writers with role-based permissions. Work together seamlessly.' },
            { title: '📱 Telegram Bot', desc: 'Review and edit scripts directly from your phone via Telegram.' },
            { title: '🎬 Scene Breakdown', desc: 'Auto-generate shot lists, locations, and character requirements.' },
            { title: '💾 Version History', desc: 'Never lose work. Every change is saved and recoverable.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.title.split(' ')[0]}</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{f.title.slice(2)}</div>
              <div style={{ color: '#7070a0', fontSize: 14, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#7070a0', fontSize: 14 }}>
          Built on Supabase • Powered by AI • Available everywhere
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8" style={{background:'var(--background)'}}>
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold" style={{color:'var(--primary)'}}>ScriptFlow</h1>
          <p className="text-xl" style={{color:'var(--muted-foreground)'}}>
            AI-powered screenwriting. From idea to production-ready screenplay.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <button className="px-6 py-3 rounded-lg font-semibold text-white" style={{background:'var(--primary)'}}>
              Sign In
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="px-6 py-3 rounded-lg font-semibold border" style={{borderColor:'var(--border)', color:'var(--foreground)'}}>
              Create Account
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 text-left">
          {[
            {title:'AI Autocomplete', desc:'Smart scene and dialogue suggestions'},
            {title:'Industry Format', desc:'Auto-format to professional standards'},
            {title:'Character Chat', desc:'Talk to your characters to deepen them'},
          ].map(f => (
            <div key={f.title} className="p-4 rounded-lg" style={{background:'var(--card)', border:'1px solid var(--border)'}}>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm" style={{color:'var(--muted-foreground)'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

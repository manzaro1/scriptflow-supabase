import { createClient } from '@/utils/supabase-server'

export async function POST(request: Request) {
  const { email, title, genre } = await request.json()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data } = await supabase.from('scripts').insert({
    user_id: user.id, title, genre, status: 'draft'
  }).select().single()

  return Response.json(data)
}
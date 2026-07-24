import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { prompt, script_content, action } = await request.json()

  // Build the AI prompt based on action
  let systemPrompt = 'You are ScriptFlow AI, an expert screenwriting assistant.'
  let userPrompt = prompt

  if (action === 'continue') {
    systemPrompt += ' Continue the screenplay in proper format. Only output the new content.'
    userPrompt = `Continue this screenplay:\n\n${script_content || ''}\n\n--- Now continue from where it ends:`
  } else if (action === 'feedback') {
    systemPrompt += ' Provide constructive feedback on dialogue, pacing, and character consistency.'
    userPrompt = `Give feedback on this dialogue/scene:\n\n${prompt}`
  } else if (action === ' brainstorm') {
    systemPrompt += ' Help brainstorm plot points, character arcs, and story structures.'
  }

  // Use K2Think API
  const apiKey = process.env.K2THINK_API_KEY
  const baseUrl = process.env.K2THINK_BASE_URL || 'https://build-api.k2think.ai/v1'

  if (!apiKey) {
    return NextResponse.json({ error: 'AI not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'K2-Think-v2',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 2048,
        stream: false,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: `AI API error: ${err}` }, { status: response.status })
    }

    const result = await response.json()
    const content = result.choices?.[0]?.message?.content || ''

    // Log usage
    const service = await createServiceRoleClient()
    await service.from('ai_usage').insert({
      user_id: user.id,
      action,
      prompt_tokens: result.usage?.prompt_tokens || 0,
      completion_tokens: result.usage?.completion_tokens || 0,
    }).catch(() => {})

    return NextResponse.json({ content })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI request failed' }, { status: 500 })
  }
}

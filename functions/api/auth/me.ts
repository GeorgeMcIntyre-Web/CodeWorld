import { verifySession } from './_lib'

export async function onRequestGet(context: {
  env: { SESSION_SECRET?: string }
  request: Request
}) {
  const { env, request } = context
  const secret = env.SESSION_SECRET
  if (!secret) {
    return new Response(JSON.stringify({ error: 'Not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const cookie = request.headers.get('Cookie') ?? ''
  const match = cookie.match(/session=([^;]+)/)
  const token = match ? match[1].trim() : null
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const payload = await verifySession(token, secret)
  if (!payload) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return new Response(
    JSON.stringify({ login: payload.login, name: payload.name ?? payload.login }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  )
}

import { signSession } from './_lib'

export async function onRequestGet(context: {
  env: { GITHUB_CLIENT_ID?: string; GITHUB_CLIENT_SECRET?: string; SESSION_SECRET?: string }
  request: Request
}) {
  const { env, request } = context
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SESSION_SECRET } = env
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !SESSION_SECRET) {
    return new Response('Auth not configured', { status: 500 })
  }
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (!code) {
    return Response.redirect(url.origin + '/?error=no_code', 302)
  }
  const origin = url.origin
  const redirectUri = `${origin}/api/auth/callback`

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  })
  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string }
  if (tokenData.error || !tokenData.access_token) {
    return Response.redirect(origin + '/?error=token', 302)
  }

  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  const user = (await userRes.json()) as { id: number; login: string; name: string | null }
  if (!user.id || !user.login) {
    return Response.redirect(origin + '/?error=user', 302)
  }

  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 7 days
  const token = await signSession(
    { sub: user.id, login: user.login, name: user.name ?? null, exp },
    SESSION_SECRET
  )

  const cookie = `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
  return new Response(null, {
    status: 302,
    headers: {
      Location: origin + '/',
      'Set-Cookie': cookie,
    },
  })
}

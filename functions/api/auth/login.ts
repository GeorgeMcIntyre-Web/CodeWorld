export async function onRequestGet(context: {
  env: { GITHUB_CLIENT_ID?: string }
  request: Request
}) {
  const { env, request } = context
  const clientId = env.GITHUB_CLIENT_ID
  if (!clientId) {
    return new Response('GITHUB_CLIENT_ID not configured', { status: 500 })
  }
  const url = new URL(request.url)
  const origin = url.origin
  const redirectUri = `${origin}/api/auth/callback`
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`
  return Response.redirect(authUrl, 302)
}

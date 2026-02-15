export async function onRequestGet(context: { request: Request }) {
  const url = new URL(context.request.url)
  const origin = url.origin
  return new Response(null, {
    status: 302,
    headers: {
      Location: origin + '/',
      'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  })
}

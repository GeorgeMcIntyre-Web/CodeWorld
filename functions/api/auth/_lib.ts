export interface SessionPayload {
  sub: number
  login: string
  name: string | null
  exp: number
}

const BASE64URL = (buf: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

export async function signSession(payload: SessionPayload, secret: string): Promise<string> {
  const payloadStr = JSON.stringify(payload)
  const payloadB64 = BASE64URL(new TextEncoder().encode(payloadStr))
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
  return `${payloadB64}.${BASE64URL(sig)}`
}

export async function verifySession(token: string, secret: string): Promise<SessionPayload | null> {
  const dot = token.indexOf('.')
  if (dot === -1) return null
  const payloadB64 = token.slice(0, dot)
  const sigB64 = token.slice(dot + 1)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
  let sigB64Normal = sigB64.replace(/-/g, '+').replace(/_/g, '/')
  while (sigB64Normal.length % 4) sigB64Normal += '='
  const sigBin = Uint8Array.from(atob(sigB64Normal), (c) => c.charCodeAt(0))
  const ok = await crypto.subtle.verify('HMAC', key, sigBin, new TextEncoder().encode(payloadB64))
  if (!ok) return null
  try {
    let b64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const json = new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)))
    const payload = JSON.parse(json) as SessionPayload
    if (payload.exp && payload.exp < Date.now() / 1000) return null
    return payload
  } catch {
    return null
  }
}

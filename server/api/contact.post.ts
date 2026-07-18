import { UseSend } from 'usesend-js'

const rateLimit = new Map<string, { count: number, resetAt: number }>()
const RATE_MAX = 3
const RATE_WINDOW = 60_000

function getClientIp(event: any): string {
  const forwarded = event.node.req.headers['x-forwarded-for']
  if (forwarded) {
    if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
    if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0].trim()
  }
  const remote = event.node.req.socket?.remoteAddress
  return remote || 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_MAX) return false
  entry.count++
  return true
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const body = await readBody<{ name: string, email: string, subject: string, message: string, _hp?: string }>(event)

  if (!body.name || !body.email || !body.subject || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Tous les champs sont requis.' })
  }

  if (body._hp) {
    throw createError({ statusCode: 400, statusMessage: 'Spam detecté.' })
  }

  const ip = getClientIp(event)
  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Trop de requêtes. Réessayez plus tard.' })
  }

  const usesend = new UseSend(
    config.usesendApiKey as string,
    config.usesendBaseUrl as string | undefined
  )

  const html = `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom :</strong> ${body.name}</p>
    <p><strong>Email :</strong> ${body.email}</p>
    <p><strong>Sujet :</strong> ${body.subject}</p>
    <hr>
    <p>${body.message.replace(/\n/g, '<br>')}</p>
  `

  const text = `Nouveau message de contact\n\nNom : ${body.name}\nEmail : ${body.email}\nSujet : ${body.subject}\n\n${body.message}`

  try {
    await usesend.emails.send({
      to: config.contactEmail as string,
      from: config.fromEmail as string,
      subject: `[Portfolio] ${body.subject}`,
      html,
      text
    })

    return { success: true }
  } catch {
    throw createError({ statusCode: 500, statusMessage: 'Échec de l\'envoi. Réessayez plus tard.' })
  }
})

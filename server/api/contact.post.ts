import { UseSend } from 'usesend-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const usesend = new UseSend(
    config.usesendApiKey as string,
    config.usesendBaseUrl as string | undefined
  )

  const body = await readBody<{ name: string, email: string, subject: string, message: string }>(event)

  if (!body.name || !body.email || !body.subject || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Tous les champs sont requis.' })
  }

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

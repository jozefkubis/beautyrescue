import { Resend } from 'resend'

type ContactRequestBody = {
  name: string
  email: string
  message: string
}

type ContactEmailTemplateProps = {
  name: string
  email: string
  message: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function getContactEmailTemplate({
  name,
  email,
  message,
}: ContactEmailTemplateProps) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  return `
    <!DOCTYPE html>
    <html lang="sk">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nová správa z formulára</title>
      </head>
      <body style="margin:0; padding:0; background-color:#2d2425; font-family:Arial, Helvetica, sans-serif; color:#ffffff;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#2d2425; padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px; background:linear-gradient(135deg, #2d2425 0%, #3a292b 45%, #8b092c 100%); border-radius:24px; overflow:hidden; border:1px solid rgba(212,175,55,0.35);">
                
                <tr>
                  <td style="padding:34px 30px 20px 30px; text-align:center;">
                    <div style="font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#d4af37; font-weight:700;">
                      Beauty Rescue
                    </div>
                    <h1 style="margin:14px 0 8px 0; font-size:28px; line-height:1.25; color:#ffffff;">
                      Nová správa z webu
                    </h1>
                    <p style="margin:0; color:#f3d98b; font-size:14px;">
                      Prišla nová správa z kontaktného formulára.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 30px 8px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:rgba(255,255,255,0.08); border:1px solid rgba(212,175,55,0.25); border-radius:18px;">
                      <tr>
                        <td style="padding:22px;">
                          <p style="margin:0 0 6px 0; color:#d4af37; font-size:12px; text-transform:uppercase; letter-spacing:1.5px;">
                            Odosielateľ
                          </p>
                          <p style="margin:0; font-size:20px; font-weight:700; color:#ffffff;">
                            ${safeName}
                          </p>
                          <p style="margin:8px 0 0 0; font-size:14px;">
                            <a href="mailto:${safeEmail}" style="color:#f3d98b; text-decoration:none;">
                              ${safeEmail}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 30px 30px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; border-radius:18px;">
                      <tr>
                        <td style="padding:24px;">
                          <p style="margin:0 0 10px 0; color:#8b092c; font-size:12px; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">
                            Správa
                          </p>
                          <div style="font-size:16px; line-height:1.7; color:#2d2425;">
                            ${safeMessage}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 30px 34px 30px; text-align:center;">
                    <a href="mailto:${safeEmail}" style="display:inline-block; background:linear-gradient(90deg, #9d7410, #d4af37, #9d7410); color:#2d2425; text-decoration:none; padding:13px 22px; border-radius:999px; font-weight:700; font-size:14px;">
                      Odpovedať klientovi
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 30px; text-align:center; background-color:rgba(0,0,0,0.22);">
                    <p style="margin:0; color:#d4af37; font-size:12px;">
                      Tento email bol odoslaný automaticky z kontaktného formulára.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_EMAIL

    if (!apiKey) {
      console.error('Missing RESEND_API_KEY')
      return Response.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 })
    }

    if (!toEmail) {
      console.error('Missing RESEND_EMAIL')
      return Response.json({ error: 'Missing RESEND_EMAIL' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    const body: ContactRequestBody = await request.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Všetky polia sú povinné.' },
        { status: 400 }
      )
    }

    const result = await resend.emails.send({
      from: 'Beauty Rescue <noreply@beautyrescue.sk>',
      to: [toEmail],
      replyTo: email,
      subject: `Beauty Rescue - nová správa od ${name}`,
      html: getContactEmailTemplate({ name, email, message }),
      text: `Meno: ${name}\nEmail: ${email}\nSpráva:\n${message}`,
    })

    if (result.error) {
      console.error('RESEND ERROR:', result.error)
      return Response.json(
        { error: 'Resend error', details: result.error },
        { status: 500 }
      )
    }

    return Response.json({ ok: true, data: result.data })
  } catch (error: unknown) {
    console.error('POST ERROR:', error)

    return Response.json(
      {
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
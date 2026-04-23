import { Resend } from 'resend'

type ContactRequestBody = {
  name: string
  email: string
  message: string
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
    console.log('BODY:', body)

    const { name, email, message } = body

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Všetky polia sú povinné.' },
        { status: 400 }
      )
    }

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [toEmail],
      subject: 'Test contact form',
      text: `Meno: ${name}\nEmail: ${email}\nSpráva: ${message}`,
    })

    console.log('RESEND RESULT:', result)

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
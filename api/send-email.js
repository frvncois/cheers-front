export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS for your domain
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        error: 'All fields are required',
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          subject: !subject,
          message: !message
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get Brevo API key from environment variables
    const brevoApiKey = process.env.BREVO_API;
    if (!brevoApiKey) {
      console.error('BREVO_API key not found in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Prepare email data for Brevo API
    const emailData = {
      sender: {
        name: "Cheers Cannabis",
        email: "contact@cheerscannabis.com"
      },
      to: [
        {
          email: "contact@cheerscannabis.com",
          name: "Cheers Cannabis"
        }
      ],
      subject: subject,
      htmlContent: `
        <html>
          <head></head>
          <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </body>
        </html>
      `,
      textContent: `
        New Contact Form Submission

        From: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `,
      replyTo: {
        email: email,
        name: `${firstName} ${lastName}`
      }
    };

    // Send email via Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Brevo API error:', responseData);
      return res.status(response.status).json({
        error: 'Failed to send email',
        details: responseData
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: responseData.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}

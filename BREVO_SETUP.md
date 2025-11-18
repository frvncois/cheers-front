# Brevo Email Integration Setup

This document explains how to set up and configure the Brevo email integration for the contact form.

## Overview

The contact form uses Brevo's API to send emails through a Vercel serverless function. This ensures secure handling of API keys and provides a reliable email delivery system.

## Prerequisites

- Brevo account with API access
- Vercel deployment (or local Vercel CLI for testing)

## Environment Variables

You need to configure the following environment variables in Vercel:

### Required Variables

1. **BREVO_API** - Your Brevo API key
   - Get this from: Brevo Dashboard → SMTP & API → API Keys
   - Format: `xkeysib-xxxxxxxxxxxxxxxxxxxxx`

2. **BREVO_SMTP** (Optional - for reference)
   - Your Brevo SMTP key
   - Not used in current implementation (using REST API instead)

### SMTP Settings (For Reference)

If you need to use SMTP instead of the API:
- **Server**: smtp-relay.brevo.com
- **Port**: 587
- **Login**: 83b215001@smtp-brevo.com

## Vercel Configuration

### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variable:
   - Key: `BREVO_API`
   - Value: Your Brevo API key
   - Environments: Production, Preview, Development

### Local Development

For local testing with Vercel CLI:

1. Create a `.env` file in the project root (already gitignored):
   ```bash
   BREVO_API=your_brevo_api_key_here
   ```

2. Run the development server:
   ```bash
   vercel dev
   ```

   This will start both the Vite dev server and Vercel serverless functions locally.

## How It Works

### Architecture

1. **Frontend** (`src/components/contact/ContactForm.vue`)
   - Collects user input (firstName, lastName, email, subject, message)
   - Validates form data
   - Sends POST request to `/api/send-email`
   - Displays success/error messages

2. **Backend** (`api/send-email.js`)
   - Vercel serverless function
   - Validates request data
   - Sends email via Brevo API
   - Returns success/error response

### Email Flow

When a user submits the contact form:

1. Form data is validated on the client side
2. POST request sent to `/api/send-email` with form data
3. Serverless function validates data and email format
4. Email sent via Brevo API with:
   - **From**: User's name and email (as sender)
   - **To**: contact@cheersbrands.com (your receiving email)
   - **Reply-To**: User's email (allows easy response)
   - **Subject**: User's subject line
   - **Content**: Formatted HTML and text versions

## Configuration

### Changing the Recipient Email

To change where contact form submissions are sent:

Edit `/api/send-email.js` line 52:

```javascript
to: [
  {
    email: "your-email@example.com", // Change this
    name: "Your Company Name"        // Change this
  }
]
```

### Translation Strings

The form uses the translation store for all UI text. Add these keys if they're missing:

**English** (`translationStore.translations.contact.en`):
- `successMessage`: "Your message has been sent successfully!"
- `errorRequired`: "All fields are required"
- `errorEmail`: "Please enter a valid email address"
- `errorSending`: "Failed to send message. Please try again."
- `sending`: "Sending..."

**French** (`translationStore.translations.contact['fr-CA']`):
- `successMessage`: "Votre message a été envoyé avec succès!"
- `errorRequired`: "Tous les champs sont requis"
- `errorEmail`: "Veuillez entrer une adresse e-mail valide"
- `errorSending`: "Échec de l'envoi du message. Veuillez réessayer."
- `sending`: "Envoi en cours..."

## Testing

### Local Testing

1. Start the development server:
   ```bash
   vercel dev
   ```

2. Navigate to the contact page
3. Fill out and submit the form
4. Check the browser console for any errors
5. Check your email inbox for the test message

### Production Testing

After deploying to Vercel:

1. Navigate to your production contact page
2. Submit a test message
3. Verify email delivery
4. Check Vercel logs for any errors:
   ```bash
   vercel logs
   ```

## Troubleshooting

### Common Issues

**"Server configuration error"**
- Verify `BREVO_API` environment variable is set in Vercel
- Redeploy after setting environment variables

**"Failed to send email"**
- Check Brevo API key is valid
- Verify you haven't exceeded Brevo's sending limits
- Check Brevo dashboard for any account issues

**CORS errors**
- The API endpoint includes CORS headers
- Ensure you're testing on the correct domain

**Form not submitting**
- Check browser console for JavaScript errors
- Verify all form fields are filled out
- Check network tab for API request/response

### Debugging

Enable detailed logging by checking:

1. Browser console (client-side errors)
2. Vercel function logs:
   ```bash
   vercel logs --follow
   ```

## Security Considerations

- ✅ API keys stored securely in Vercel environment variables
- ✅ Server-side validation of all inputs
- ✅ Email validation to prevent invalid submissions
- ✅ CORS headers configured
- ✅ No sensitive data in client-side code

## Rate Limiting

Consider implementing rate limiting to prevent abuse:

1. Use Vercel Edge Config for rate limiting
2. Add IP-based throttling
3. Implement CAPTCHA for additional protection

## Support

For issues with:
- **Brevo API**: https://developers.brevo.com/
- **Vercel Functions**: https://vercel.com/docs/functions
- **This Integration**: Check the source code comments in:
  - `/api/send-email.js`
  - `/src/components/contact/ContactForm.vue`

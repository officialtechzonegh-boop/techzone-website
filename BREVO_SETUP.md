# Brevo Email Integration Setup Guide

## Overview
TechZone now has a complete email notification system using Brevo (formerly Sendinblue). The system sends:

1. **Login Confirmation Emails** - Sent to users when they log in or sign up
2. **Purchase Confirmation Emails** - Sent to customers with order details after purchase
3. **Admin Purchase Notifications** - Sent to admin when new orders are placed

## Setup Instructions

### Step 1: Create a Brevo Account
1. Go to [https://www.brevo.com](https://www.brevo.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key
1. Log in to your Brevo dashboard
2. Click on your profile name (top right) → **SMTP & API**
3. Click on **API Keys** tab
4. Click **Create a new API key**
5. Give it a name (e.g., "TechZone Production")
6. Copy the API key (starts with `xkeysib-`)

### Step 3: Configure Sender Email
1. In Brevo dashboard, go to **Senders** → **IPs & Domains**
2. Click **Add a Sender**
3. Enter your sender information:
   - **Name**: TechZone
   - **Email**: noreply@techzone.com (or your domain email)
4. Verify the sender email by clicking the verification link sent to your email

**Note**: For production, you should use your own domain. For testing, you can use the Brevo default sender.

### Step 4: Update Environment Variables

Open your `.env` file and update these values:

```env
# Brevo Email Service Configuration
VITE_BREVO_API_KEY=xkeysib-your-actual-api-key-here
VITE_BREVO_SENDER_EMAIL=noreply@techzone.com
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

Replace:
- `xkeysib-your-actual-api-key-here` with your actual Brevo API key
- `noreply@techzone.com` with your verified sender email
- `your-admin-email@example.com` with the admin email that should receive purchase notifications

### Step 5: Restart Your Development Server

After updating the `.env` file, restart your development server:

```bash
npm run dev
```

## Email Features

### 1. Login/Signup Emails
- **Triggered when**: User logs in or creates an account
- **Sent to**: The user's email address
- **Content**: Welcome message with TechZone branding
- **Includes**: Personalized greeting, call-to-action button

### 2. Purchase Confirmation (Customer)
- **Triggered when**: Customer completes checkout
- **Sent to**: Customer's email address
- **Content**: Order confirmation with full details
- **Includes**:
  - Order ID
  - List of purchased items with quantities and prices
  - Order summary with subtotal and total
  - Professional HTML email template with TechZone branding

### 3. Purchase Notification (Admin)
- **Triggered when**: Customer completes checkout
- **Sent to**: Admin email (configured in `.env`)
- **Content**: New order alert with customer and order details
- **Includes**:
  - Customer information (name, email, contact, location, address)
  - Payment method
  - Complete order details with items and pricing
  - Order summary

## Email Templates

All email templates are professionally designed with:
- TechZone branding (colors: #14213D, #FCA331)
- Responsive HTML email format
- Professional layouts
- Order details in table format
- Company footer with contact information

## Troubleshooting

### Emails Not Sending?
1. **Check API Key**: Ensure your Brevo API key is correct in `.env`
2. **Verify Sender Email**: Make sure your sender email is verified in Brevo
3. **Check Console**: Look for error messages in the browser console
4. **API Quota**: Free Brevo accounts have a limit of 300 emails/day

### Common Errors

**"api-key not found"**: 
- Check that `VITE_BREVO_API_KEY` is set correctly

**"sender email not authorized"**:
- Verify your sender email in Brevo dashboard
- Use a verified email or Brevo's default sender

**CORS errors**:
- This is normal in development. Emails will work in production

## Testing

To test the email system:

1. **Test Login Email**:
   - Create a new account or log in
   - Check the email inbox (and spam folder)

2. **Test Purchase Emails**:
   - Add items to cart
   - Go to checkout
   - Fill in customer details with your test email
   - Complete the order
   - Check both customer and admin email inboxes

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variables to your hosting platform:
   - `VITE_BREVO_API_KEY`
   - `VITE_BREVO_SENDER_EMAIL`
   - `VITE_ADMIN_EMAIL`

2. **Never commit your `.env` file** to version control
3. Use a proper domain email for production (not Gmail/Yahoo)

## Security Notes

- ✅ API keys are stored in environment variables (not hardcoded)
- ✅ Email sending failures won't block the checkout process
- ✅ Customer data is only sent to authorized emails
- ✅ Admin notifications go to a configured admin email only

## Support

For Brevo-related issues:
- Brevo Documentation: https://developers.brevo.com/
- Brevo Support: https://help.brevo.com/

For TechZone email integration issues:
- Check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure Brevo API key has SMTP permissions

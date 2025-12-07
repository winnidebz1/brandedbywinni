# Web3Forms Setup Instructions

## Get Your Free API Key

1. Go to https://web3forms.com
2. Click "Get Started" or "Create Access Key"
3. Enter your email: brandedbywinnistudio@gmail.com
4. You'll receive an access key instantly (no signup required)

## Update the Contact Form

Once you have your access key, replace the placeholder in:
`pages/ContactPage.tsx` line 53

Change this line:
```typescript
access_key: '6e8f7c4d-3b2a-4f1e-9d8c-5a6b7e8f9c0d', // Replace with your actual key
```

To:
```typescript
access_key: 'YOUR_ACTUAL_KEY_HERE',
```

## How It Works

When someone submits the contact form:
1. ✅ Form data is sent to Web3Forms
2. ✅ Web3Forms sends an email to: brandedbywinnistudio@gmail.com
3. ✅ User is redirected to WhatsApp with the same message
4. ✅ Form resets and shows success message

## Testing

After adding your API key:
1. Fill out the contact form on your website
2. Check your email (brandedbywinnistudio@gmail.com)
3. You should receive an email with the form submission
4. WhatsApp should also open with the message

## Note

The placeholder key I used won't work. You MUST get your own free key from web3forms.com for the email notifications to work.

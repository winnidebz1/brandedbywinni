# Website Analytics Setup Instructions

## Overview

Your website now includes an analytics tracker that will send you email notifications whenever someone visits your website. This helps you track visitor activity in real-time.

## What Information You'll Receive

When someone visits your website, you'll receive an email with:
- 📅 **Timestamp**: When the visit occurred
- 📄 **Page**: Which page they visited (e.g., /, /about, /services)
- 🔗 **Referrer**: Where they came from (e.g., Google, Facebook, Direct)
- 🌍 **IP Address**: Their approximate location

## Setup Instructions

### Step 1: Get a FREE Web3Forms API Key for Analytics

1. Go to https://web3forms.com
2. Click "Get Started" or "Create Access Key"
3. Enter your email: **brandedbywinnistudio@gmail.com**
4. You'll receive an access key instantly (no signup required)
5. **IMPORTANT**: Get a SEPARATE key for analytics (different from your contact form key)

### Step 2: Add the API Key to Your Environment

1. Open your `.env.local` file in the project root
2. Add this line:
   ```
   VITE_WEB3FORMS_ANALYTICS_KEY=your_analytics_key_here
   ```
3. Replace `your_analytics_key_here` with the actual key from Step 1
4. Save the file

### Step 3: Restart Your Development Server

After adding the key, restart your development server:
```bash
npm run dev
```

## Testing

1. Open your website in a browser
2. Navigate to different pages
3. Check your email (brandedbywinnistudio@gmail.com)
4. You should receive notifications for each page visit

## Important Notes

⚠️ **Privacy Consideration**: This tracker sends notifications for EVERY page view. On a live website with many visitors, this could result in many emails. Consider:
- Using a dedicated email for analytics
- Setting up email filters to organize these notifications
- Implementing rate limiting if needed

💡 **Alternative**: For production websites with high traffic, consider using Google Analytics or similar services instead of email notifications.

## Disabling Analytics

If you want to disable the analytics tracker:
1. Simply remove the `VITE_WEB3FORMS_ANALYTICS_KEY` from your `.env.local` file
2. Or comment out `<AnalyticsTracker />` in `App.tsx`

## Troubleshooting

**Not receiving emails?**
- Check that your API key is correct in `.env.local`
- Make sure you restarted the development server after adding the key
- Check your spam folder
- Verify the email address in Web3Forms dashboard

**Too many emails?**
- The tracker has a 2-second delay to prevent spam
- Consider implementing additional rate limiting
- Use email filters to organize notifications

## Files Modified

- `components/AnalyticsTracker.tsx` - The tracking component
- `App.tsx` - Integrated the tracker
- `.env.local` - Stores your API key (not committed to Git)

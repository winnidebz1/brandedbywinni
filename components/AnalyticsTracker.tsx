import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This will send you email notifications when someone visits your website
// You need to get a FREE Web3Forms API key for analytics notifications
// See ANALYTICS_SETUP.md for instructions
const WEB3FORMS_ANALYTICS_KEY = (import.meta as any).env?.VITE_WEB3FORMS_ANALYTICS_KEY || '';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            // Skip if no API key is configured
            if (!WEB3FORMS_ANALYTICS_KEY) {
                console.log('Analytics tracking disabled - no API key configured');
                return;
            }

            try {
                // Get visitor information
                const timestamp = new Date().toLocaleString();
                const page = location.pathname;
                const referrer = document.referrer || 'Direct';

                // Get approximate location using IP (optional - you can remove this if you prefer)
                let locationInfo = 'Unknown';
                try {
                    const ipResponse = await fetch('https://api.ipify.org?format=json');
                    const ipData = await ipResponse.json();
                    locationInfo = ipData.ip;
                } catch (error) {
                    console.log('Could not fetch IP');
                }

                // Send notification via Web3Forms
                const formData = new FormData();
                formData.append('access_key', WEB3FORMS_ANALYTICS_KEY);
                formData.append('subject', '🔔 New Website Visitor - Branded By Winni');
                formData.append('from_name', 'Website Analytics');
                formData.append('message', `
New visitor on your website!

📅 Time: ${timestamp}
📄 Page: ${page}
🔗 Referrer: ${referrer}
🌍 IP: ${locationInfo}
        `);

                await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

            } catch (error) {
                console.error('Analytics tracking error:', error);
            }
        };

        // Track page view with a small delay to avoid spam
        const timer = setTimeout(() => {
            trackPageView();
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);

    return null;
};

export default AnalyticsTracker;

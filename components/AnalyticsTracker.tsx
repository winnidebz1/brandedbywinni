import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AnalyticsTracker = () => {
    // strict mode causes double firing in dev, useRef helps prevent that
    const executedRef = useRef(false);

    useEffect(() => {
        const logVisit = async () => {
            // Only log unique sessions (per browser tab session)
            if (sessionStorage.getItem('visit_logged') && !(import.meta as any).env.DEV) {
                return;
            }

            if (executedRef.current) return;
            executedRef.current = true;

            try {
                // 1. Get Location Data (Country)
                let country = 'Unknown';
                try {
                    const res = await fetch('https://ipapi.co/json/');
                    const data = await res.json();
                    if (data.country_name) country = data.country_name;
                } catch (e) {
                    console.log('Geo-IP unavailable');
                }

                // 2. Identify Device
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const device = isMobile ? 'Mobile' : 'Desktop';

                // 3. Log to Supabase
                await supabase.from('site_visits').insert([{
                    page_path: window.location.pathname,
                    country: country,
                    device_type: device,
                    referrer: document.referrer || 'Direct'
                }]);

                // Mark as logged for this session
                sessionStorage.setItem('visit_logged', 'true');

            } catch (error) {
                console.error('Tracking Error:', error);
            }
        };

        logVisit();
    }, []);

    return null;
};

export default AnalyticsTracker;

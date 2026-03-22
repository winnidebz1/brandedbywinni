import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface WebsiteContent {
  [sectionKey: string]: any;
}

export const defaultSiteContent: WebsiteContent = {
  hero: {
    headline: "EMPOWERING BRANDS",
    subheadline: "through creative solutions.",
    description: "Every memorable brand begins with one clear idea and a lot of heart. We help you tell that story the right way, shaping your voice into visuals, websites, and campaigns that feel true to your brand and make customers trust you from the first look.",
    button1Text: "View Services",
    button2Text: "View Portfolio",
    heroImage: "/team-hero.png",
    statTitle: "Branded by Winni",
    statDesc: "Premium visuals for brands ready to grow.",
    eyebrow: "Elevate Your Brand"
  },
  about: {
    headline: "BRANDED BY WINNI",
    subheadline: "is your digital growth partner.",
    description: "We help visionaries and businesses translate their ideas into stunning visual identities and digital experiences. Our mission is to empower brands with premium graphic design, branding, and websites that don't just look good, they convert, engage, and grow your business.",
    yearsExp: "6+",
    satisfaction: "100%",
    aboutImage: "/teamphoto.png",
    storyHeadline: "More Than Just Code and Colors"
  }
};

export const useWebsiteContent = () => {
    const [content, setContent] = useState<WebsiteContent>(defaultSiteContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase.from('website_content').select('*');
            if (error || !data) {
                setLoading(false);
                return;
            }

            const formattedContent: WebsiteContent = { ...defaultSiteContent };
            data.forEach((item: any) => {
                if (formattedContent[item.section_id]) {
                    formattedContent[item.section_id] = {
                        ...formattedContent[item.section_id],
                        ...item.content
                    };
                } else {
                     formattedContent[item.section_id] = item.content;
                }
            });
            setContent(formattedContent);
        } catch (e) {
            console.warn("Website content table not ready, using defaults.");
        }
        setLoading(false);
    };

    return { content, loading, refetch: fetchContent };
};

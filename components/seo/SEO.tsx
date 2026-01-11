import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    schema?: object;
};

const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    schema
}: SEOProps) => {
    const siteTitle = 'Best Website Designer in Ghana | Branded By Winni';
    const defaultDescription = 'Branded By Winni is the best web designer in Ghana, offering custom web design, SEO services, and digital branding for businesses in Accra. high-converting, premium websites.';
    const siteUrl = 'https://brandedbywinni.com';
    const defaultImage = `${siteUrl}/og-default.png`;

    const finalTitle = title ? `${title} | Branded By Winni` : siteTitle;
    const finalDesc = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

    // Comprehensive Schema for "Best Web Designer in Ghana"
    const defaultSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": "Branded By Winni",
                "description": defaultDescription,
                "publisher": {
                    "@id": `${siteUrl}/#organization`
                },
                "inLanguage": "en-GH"
            },
            {
                "@type": ["LocalBusiness", "ProfessionalService", "WebDesignService"],
                "@id": `${siteUrl}/#organization`,
                "name": "Branded By Winni",
                "url": siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/logo-icon.png`,
                    "width": 112,
                    "height": 112
                },
                "image": finalImage,
                "description": defaultDescription,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Accra",
                    "addressLocality": "Accra",
                    "addressRegion": "Greater Accra",
                    "postalCode": "00233",
                    "addressCountry": "GH"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 5.6037,
                    "longitude": -0.1870
                },
                "areaServed": {
                    "@type": "Country",
                    "name": "Ghana"
                },
                "priceRange": "$$",
                "telephone": "+233202326851", // Updates based on Hero.tsx logic (verify number if possible, using what was in Hero)
                "sameAs": [
                    "https://www.instagram.com/brandedbywinni",
                    "https://www.linkedin.com/company/brandedbywinni",
                    "https://www.tiktok.com/@brandedbywinni"
                ],
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "17:00"
                }
            }
        ]
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDesc} />
            <meta name="keywords" content={keywords?.join(', ') || 'Best Website Designer in Ghana, Best Web Designer in Ghana, web design ghana, seo services ghana, branding agency accra, digital marketing ghana, website design accra'} />
            <link rel="canonical" href={finalUrl} />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDesc} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content="Branded By Winni" />
            <meta property="og:locale" content="en_GH" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalUrl} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDesc} />
            <meta name="twitter:image" content={finalImage} />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(schema || defaultSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;

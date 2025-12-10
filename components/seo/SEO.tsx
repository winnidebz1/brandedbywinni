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
    const siteTitle = 'Branded By Winni | Creative Agency';
    const defaultDescription = 'Branded By Winni offers brand identity design, packaging design, web design, and SEO services. Elevate your brand with our creative solutions.';
    const siteUrl = 'https://brandedbywinni.com'; // Replace with actual domain
    const defaultImage = `${siteUrl}/og-default.png`; // Should be a branded image

    const finalTitle = title ? `${title} | Branded By Winni` : siteTitle;
    const finalDesc = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Branded By Winni",
        "image": finalImage,
        "description": defaultDescription,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "GH"
        },
        "priceRange": "$$"
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDesc} />
            <meta name="keywords" content={keywords?.join(', ') || 'branding, web design, packaging, seo, creative agency'} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDesc} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content="Branded By Winni" />

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
